ALTER TABLE "telegram_notifications" ALTER COLUMN "chat_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "telegram_notifications" DROP COLUMN "updated_at";