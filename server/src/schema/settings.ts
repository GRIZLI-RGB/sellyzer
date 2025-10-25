import { integer, pgTable, serial } from "drizzle-orm/pg-core";

export const settings = pgTable("settings", {
	id: serial("id").primaryKey(),
	proDailyRate: integer("pro_daily_rate").notNull().default(30),
	minDeposit: integer("min_deposit").notNull().default(100),
});
