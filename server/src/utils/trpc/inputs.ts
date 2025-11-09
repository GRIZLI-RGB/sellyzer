import { z } from "zod";
import { ProductMarketplaceType } from "@sellyzer/shared";

export const createProductInput = z
	.object({
		marketplace: z.custom<ProductMarketplaceType>(),
		article: z.string().optional(),
		url: z.url().optional(),
	})
	.refine((data) => data.article || data.url, {
		message: "Укажите артикул или ссылку на товар",
	});

export const paginationInput = z.object({
	page: z.number().min(1).default(1),
	limit: z.number().min(5).max(100).default(10),
	search: z.string().optional(),
});

export const getSingleItemInput = z.object({
	id: z.number(),
});

export const toggleArchiveProductInput = z.object({
	id: z.number(),
	archive: z.boolean(), // true — архивировать, false — вернуть из архива
});

export const toggleCurrentUserTelegramTriggerInput = z.object({
	key: z.string(),
	value: z.boolean(),
});

export const botConnectBody = z.object({
	userId: z.number(),
	chatId: z.string(),
	username: z.string().nullable(),
});

export const createPaymentInput = z.object({
	amount: z.number().positive(),
});
