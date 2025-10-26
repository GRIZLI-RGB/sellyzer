import { TRPCError } from "@trpc/server";
import { and, count, desc, eq, like } from "drizzle-orm";

import { protectedProcedure, publicProcedure, router } from "./procedures";
import { products } from "./../../schema/products";
import { productReviews } from "./../../schema/productReviews";
import { createProductInput, paginationInput } from "./inputs";
import { parseOzonProduct } from "../helpers";
import { users } from "./../../schema/users";
import { settings } from "./../../schema/settings";

export const appRouter = router({
	getCurrentUser: protectedProcedure.query(async ({ ctx }) => {
		const { user, db } = ctx;

		const [currentUser] = await db
			.select()
			.from(users)
			.where(eq(users.id, user.id))
			.limit(1);

		if (!currentUser) {
			throw new TRPCError({
				code: "NOT_FOUND",
				message: "Пользователь не найден",
			});
		}

		return currentUser;
	}),

	getGlobalSettings: publicProcedure.query(async ({ ctx }) => {
		const [settingsDb] = await ctx.db.select().from(settings).limit(1);

		if (!settingsDb) {
			throw new TRPCError({
				code: "NOT_FOUND",
				message: "Не удалось найти глобальные настройки",
			});
		}

		return settingsDb;
	}),

	getCurrentUserProducts: protectedProcedure
		.input(paginationInput)
		.query(async ({ ctx, input }) => {
			const { user, db } = ctx;
			const { page, limit, search } = input;

			const userProducts = await db
				.select({
					product: products,
					review: productReviews,
				})
				.from(products)
				.leftJoin(
					productReviews,
					eq(productReviews.productId, products.id)
				)
				.where(
					search
						? and(
								eq(products.userId, user.id),
								like(products.title, `%${search}%`)
						  )
						: eq(products.userId, user.id)
				)
				.orderBy(desc(products.createdAt))
				.limit(limit)
				.offset((page - 1) * limit);

			const userProductsWithReviewData = userProducts.map(
				(userProduct) => ({
					...userProduct.product,
					review: userProduct.review || null,
				})
			);

			const totalCount = await db
				.select({ count: count(products.id) })
				.from(products)
				.where(eq(products.userId, user.id))
				.then((res) => res[0]?.count ?? 0);

			return {
				products: userProductsWithReviewData,
				pagination: {
					page,
					limit,
					totalItems: Number(totalCount),
					totalPages: Math.ceil(Number(totalCount) / limit),
				},
			};
		}),

	createProduct: protectedProcedure
		.input(createProductInput)
		.mutation(async ({ ctx, input }) => {
			const { marketplace, article, url } = input;

			let productData: {
				title: string;
				price: number;
				url: string;
				rating: number;
				totalCountReviews: number;
				article: string;
				images: string[];
			} = {
				title: "",
				price: 0,
				url: url || "",
				rating: 0.0,
				totalCountReviews: 0,
				article: "",
				images: [],
			};

			try {
				if (marketplace === "OZON") {
					productData = await parseOzonProduct(article, url);
				} else {
					throw new TRPCError({
						code: "BAD_REQUEST",
						message: "Неизвестный маркетплейс",
					});
				}
			} catch (error) {
				if (error instanceof TRPCError) throw error;
				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: "Не удалось получить данные товара",
				});
			}

			try {
				const [product] = await ctx.db
					.insert(products)
					.values({
						title: productData.title,
						price: productData.price,
						url: productData.url,
						marketplace,
						userId: ctx.user.id,
						article: article || productData.article,
						images: productData.images || [],
					})
					.returning();

				try {
					const review = await ctx.db.insert(productReviews).values({
						productId: product.id,
						totalCount: productData.totalCountReviews,
						rating: String(productData.rating),
					});
					console.log("Inserted review:", review);
				} catch (e) {
					console.error("Ошибка при вставке productReviews:", e);
				}

				return product;
			} catch (e) {
				console.error("Ошибка при вставке продукта:", e);
				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: "Ошибка сохранения товара в базу",
				});
			}
		}),

	// ! Публичные ендпоинты для тестов !
	testParseProduct: publicProcedure
		.input(createProductInput)
		.mutation(async ({ input }) => {
			const { marketplace, article, url } = input;

			try {
				if (marketplace === "OZON") {
					const productData = await parseOzonProduct(article, url);
					return { ...productData, marketplace };
				} else {
					throw new TRPCError({
						code: "BAD_REQUEST",
						message: "Неизвестный маркетплейс",
					});
				}
			} catch (error) {
				if (error instanceof TRPCError) throw error;
				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: "Не удалось получить данные товара",
				});
			}
		}),
});

export type AppRouter = typeof appRouter;
