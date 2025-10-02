import { pgTable, serial, integer, timestamp } from "drizzle-orm/pg-core";

import { products } from "./products";

export const productReviews = pgTable("product_reviews", {
	id: serial("id").primaryKey(),
	productId: integer("product_id")
		.references(() => products.id, { onDelete: "cascade" })
		.notNull(),
	totalCount: integer("total_count").notNull(),
	rating: integer("rating").notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
});
