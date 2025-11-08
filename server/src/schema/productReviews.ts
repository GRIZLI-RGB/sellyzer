import {
	pgTable,
	serial,
	integer,
	timestamp,
	numeric,
} from "drizzle-orm/pg-core";

import { products } from "./products";

export const productReviews = pgTable("product_reviews", {
	id: serial("id").primaryKey(),
	productId: integer("product_id")
		.references(() => products.id, { onDelete: "cascade" })
		.notNull(),
	countStars1: integer("count_stars_1").notNull(),
	countStars2: integer("count_stars_2").notNull(),
	countStars3: integer("count_stars_3").notNull(),
	countStars4: integer("count_stars_4").notNull(),
	countStars5: integer("count_stars_5").notNull(),
	totalCount: integer("total_count").notNull(),
	rating: numeric("rating", { precision: 2, scale: 1 }),
	createdAt: timestamp("created_at", { withTimezone: true })
		.defaultNow()
		.notNull(),
});
