ALTER TABLE "users" ALTER COLUMN "email" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "avatar_url" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "auth_provider" varchar(32) NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "telegram_id" varchar(64);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "avatarUrl";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "authProvider";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "telegramId";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "createdAt";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "updatedAt";