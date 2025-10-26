import { pgTable, serial, integer, timestamp, numeric } from "drizzle-orm/pg-core";

import { products } from "./products";

export const productReviews = pgTable("product_reviews", {
	id: serial("id").primaryKey(),
	productId: integer("product_id")
		.references(() => products.id, { onDelete: "cascade" })
		.notNull(),
	totalCount: integer("total_count").notNull(),
	rating: numeric("rating", { precision: 2, scale: 1 }),
	createdAt: timestamp("created_at").defaultNow().notNull(),
});
