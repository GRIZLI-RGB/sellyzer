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
