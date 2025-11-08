ALTER TABLE "users" ADD COLUMN "telegram_username" varchar(64);--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_telegram_username_unique" UNIQUE("telegram_username");