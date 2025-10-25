import {
	integer,
	numeric,
	pgTable,
	serial,
	text,
	timestamp,
	varchar,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

import { users } from "./users";

export type ProductMarketplaceType =
	| "OZON"
	| "WILDBERRIES"
	| "AVITO"
	| "YANDEX_MARKET";

export const products = pgTable("products", {
	id: serial().primaryKey(),
	title: varchar("title", { length: 256 }).notNull(),
	article: varchar("article", { length: 128 }).notNull(),
	url: text("url").notNull(),
	price: integer("price").notNull(),
	marketplace: text("marketplace").$type<ProductMarketplaceType>().notNull(),
	images: text("images")
		.array()
		.$type<string[]>()
		.notNull()
		.default(sql`ARRAY[]::text[]`),
	rating: numeric("rating", { precision: 2, scale: 1 }),
	createdAt: timestamp().defaultNow().notNull(),
	userId: integer("user_id")
		.references(() => users.id)
		.notNull(),
});
