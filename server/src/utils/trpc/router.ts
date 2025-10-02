import { TRPCError } from "@trpc/server";

import { protectedProcedure, publicProcedure, router } from "./procedures";
import { products } from "./../../schema/products";
import { productReviews } from "./../../schema/productReviews";
import { createProductInput } from "./inputs";
import { parseOzonProduct } from "../helpers";

export const appRouter = router({
	createProduct: protectedProcedure
		.input(createProductInput)
		.mutation(async ({ ctx, input }) => {
			const { marketplace, article, url } = input;

			let productData = {
				title: "",
				price: 0,
				url: url || "",
				rating: 0.0,
				totalCountReviews: 0,
				article: "",
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
					})
					.returning();

				await ctx.db.insert(productReviews).values({
					productId: product.id,
					totalCount: productData.totalCountReviews,
					rating: productData.rating,
				});

				return product;
			} catch {
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
