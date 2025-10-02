import {
	integer,
	pgEnum,
	pgTable,
	serial,
	text,
	timestamp,
	varchar,
} from "drizzle-orm/pg-core";

import { users } from "./users";

export const marketplaceEnum = [
	"OZON",
	"WILDBERRIES",
	"AVITO",
	"YANDEX_MARKET",
] as const;

export const marketplace = pgEnum("marketplace", marketplaceEnum);

export const products = pgTable("products", {
	id: serial().primaryKey(),
	title: varchar("title", { length: 256 }).notNull(),
	url: text("url").notNull(),
	price: integer("price").notNull(),
	marketplace: marketplace("marketplace").notNull(),
	createdAt: timestamp().defaultNow().notNull(),
	userId: integer("user_id")
		.references(() => users.id)
		.notNull(),
});
