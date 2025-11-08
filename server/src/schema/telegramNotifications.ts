import {
	pgTable,
	serial,
	integer,
	boolean,
	timestamp,
	varchar,
} from "drizzle-orm/pg-core";

import { users } from "./users";

export const telegramNotifications = pgTable("telegram_notifications", {
	id: serial("id").primaryKey(),
	userId: integer("user_id")
		.references(() => users.id, { onDelete: "cascade" })
		.notNull(),
	chatId: varchar("chat_id", { length: 64 }),
	isConnected: boolean("is_connected").default(false).notNull(),
	triggerPositionDown: boolean("trigger_position_down")
		.default(false)
		.notNull(),
	triggerPositionUp: boolean("trigger_position_up").default(false).notNull(),
	triggerNewReview: boolean("trigger_new_review").default(false).notNull(),
	triggerRatingChange: boolean("trigger_rating_change")
		.default(false)
		.notNull(),
	triggerPriceChange: boolean("trigger_price_change")
		.default(false)
		.notNull(),
	triggerAvailabilityChange: boolean("trigger_availability_change")
		.default(false)
		.notNull(),
	createdAt: timestamp("created_at", { withTimezone: true })
		.defaultNow()
		.notNull(),
});
