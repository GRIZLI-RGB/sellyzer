import { z } from "zod";

import { ProductMarketplaceType } from "./../../schema/products";

export const createProductInput = z
	.object({
		marketplace: z.custom<ProductMarketplaceType>(),
		article: z.string().optional(),
		url: z.url().optional(),
	})
	.refine((data) => data.article || data.url, {
		message: "Укажите артикул или ссылку на товар",
	});
