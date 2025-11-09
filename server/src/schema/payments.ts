import {
	integer,
	pgTable,
	serial,
	timestamp,
	varchar,
} from "drizzle-orm/pg-core";

import { users } from "./users";

export const payments = pgTable("payments", {
	id: serial("id").primaryKey(),
	yookassaPaymentId: varchar("yookassa_payment_id", { length: 128 })
		.unique(),
	amount: integer("amount").notNull(),
	status: varchar("status", { length: 32 })
		.$type<"created" | "pending" | "waiting_for_capture" | "succeeded" | "canceled">()
		.notNull(),
	userId: integer("user_id")
		.notNull()
		.references(() => users.id),
	createdAt: timestamp("created_at", { withTimezone: true })
		.defaultNow()
		.notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true })
		.defaultNow()
		.notNull(),
});
