import { TRPCError } from "@trpc/server";
import { and, count, desc, eq, like } from "drizzle-orm";

import { protectedProcedure, publicProcedure, router } from "./procedures";
import { products } from "./../../schema/products";
import { productReviews } from "./../../schema/productReviews";
import {
	createPaymentInput,
	createProductInput,
	getSingleItemInput,
	paginationInput,
	toggleArchiveProductInput,
	toggleCurrentUserTelegramTriggerInput,
} from "./inputs";
import { parseOzonProduct } from "../helpers";
import { users } from "./../../schema/users";
import { settings } from "./../../schema/settings";
import { payments } from "./../../schema/payments";
import { telegramNotifications } from "./../../schema/telegramNotifications";

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

	getCurrentUserTelegramNotifications: protectedProcedure.query(
		async ({ ctx }) => {
			const userId = ctx.user.id;

			const [record] = await ctx.db
				.select()
				.from(telegramNotifications)
				.where(eq(telegramNotifications.userId, userId));

			if (!record) {
				const [created] = await ctx.db
					.insert(telegramNotifications)
					.values({
						userId,
					})
					.returning();

				return created;
			}

			return record;
		}
	),

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

	getCurrentUserProductById: protectedProcedure
		.input(getSingleItemInput)
		.query(async ({ ctx, input }) => {
			const { db, user } = ctx;
			const { id } = input;

			const [result] = await db
				.select({
					product: products,
					review: productReviews,
				})
				.from(products)
				.leftJoin(
					productReviews,
					eq(productReviews.productId, products.id)
				)
				.where(and(eq(products.id, id), eq(products.userId, user.id)))
				.limit(1);

			if (!result?.product) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message:
						"Продукт не найден или не принадлежит пользователю",
				});
			}

			return {
				...result.product,
				review: result.review || null,
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
				starsCount: { [key: string]: number };
			} = {
				title: "",
				price: 0,
				url: url || "",
				rating: 0.0,
				totalCountReviews: 0,
				article: "",
				images: [],
				starsCount: {
					countStars1: 0,
					countStars2: 0,
					countStars3: 0,
					countStars4: 0,
					countStars5: 0,
				},
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
					await ctx.db.insert(productReviews).values({
						productId: product.id,
						totalCount: productData.totalCountReviews,
						rating: String(productData.rating),
						countStars1: productData.starsCount[`countStars1`],
						countStars2: productData.starsCount[`countStars2`],
						countStars3: productData.starsCount[`countStars3`],
						countStars4: productData.starsCount[`countStars4`],
						countStars5: productData.starsCount[`countStars5`],
					});
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

	toggleArchiveProduct: protectedProcedure
		.input(toggleArchiveProductInput)
		.mutation(async ({ ctx, input }) => {
			const { user, db } = ctx;
			const { id, archive } = input;

			const [product] = await db
				.select()
				.from(products)
				.where(eq(products.id, id))
				.limit(1);

			if (!product || product.userId !== user.id) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Продукт не найден или доступ запрещен",
				});
			}

			const [updatedProduct] = await db
				.update(products)
				.set({ isArchived: archive })
				.where(eq(products.id, id))
				.returning();

			return updatedProduct;
		}),

	disableCurrentUserTelegramNotifications: protectedProcedure.mutation(
		async ({ ctx }) => {
			const userId = ctx.user.id;

			await ctx.db
				.update(telegramNotifications)
				.set({
					isConnected: false,
					chatId: null,
				})
				.where(eq(telegramNotifications.userId, userId));

			return { success: true };
		}
	),

	toggleCurrentUserTelegramTrigger: protectedProcedure
		.input(toggleCurrentUserTelegramTriggerInput)
		.mutation(async ({ ctx, input }) => {
			const userId = ctx.user.id;

			await ctx.db
				.update(telegramNotifications)
				.set({ [input.key]: input.value })
				.where(eq(telegramNotifications.userId, userId));

			return true;
		}),

	createPayment: protectedProcedure
		.input(createPaymentInput)
		.mutation(async ({ ctx, input }) => {
			const { amount } = input;
			const { db, user } = ctx;

			const apiUrl = process.env.YOOKASSA_API_URL;
			const shopId = process.env.YOOKASSA_SHOP_ID;
			const apiKey = process.env.YOOKASSA_API_KEY;

			if (!apiUrl || !shopId || !apiKey) {
				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: "YooKassa env variables missing",
				});
			}

			const [payment] = await db
				.insert(payments)
				.values({
					userId: user.id,
					amount: amount,
					status: "created",
				})
				.returning();

			const authHeader =
				"Basic " +
				Buffer.from(`${shopId}:${apiKey}`).toString("base64");

			const payload = {
				amount: {
					value: amount.toFixed(2),
					currency: "RUB",
				},
				capture: true,
				description: `Пополнение баланса. Платёжный документ №${payment.id}.`,
				confirmation: {
					type: "redirect",
					return_url: `https://sellyzer.ru/dashboard/billing?payment_id=${payment.id}`,
				},
				metadata: {
					userId: user.id,
					localPaymentId: payment.id,
				},
			};

			const res = await fetch(`${apiUrl}/payments`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Idempotence-Key": crypto.randomUUID(),
					Authorization: authHeader,
				},
				body: JSON.stringify(payload),
			});

			const json = await res.json();

			if (!res.ok) {
				await db
					.update(payments)
					.set({ status: "canceled" })
					.where(eq(payments.id, payment.id));

				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: `YooKassa error: ${JSON.stringify(json)}`,
				});
			}

			await db
				.update(payments)
				.set({
					yookassaPaymentId: json.id,
					status: json.status,
					updatedAt: new Date(),
				})
				.where(eq(payments.id, payment.id));

			return {
				yookassaPaymentId: json.id,
				status: json.status,
				confirmationUrl: json.confirmation?.confirmation_url ?? null,
			};
		}),

	getPaymentById: protectedProcedure
		.input(getSingleItemInput)
		.query(async ({ ctx, input }) => {
			const { id } = input;
			const { db, user } = ctx;

			const [payment] = await db
				.select()
				.from(payments)
				.where(eq(payments.id, id));

			if (!payment || payment.userId !== user.id) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Платеж не найден или доступ запрещен",
				});
			}

			return payment;
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
