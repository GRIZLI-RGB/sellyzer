CREATE TYPE "public"."marketplace" AS ENUM('OZON', 'WILDBERRIES', 'AVITO', 'YANDEX_MARKET');--> statement-breakpoint
CREATE TYPE "public"."auth_provider" AS ENUM('GOOGLE', 'TELEGRAM');--> statement-breakpoint
CREATE TABLE "products" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(256) NOT NULL,
	"url" text NOT NULL,
	"price" integer NOT NULL,
	"marketplace" "marketplace" NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"user_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"auth_provider" "auth_provider" NOT NULL,
	"email" varchar(256),
	"telegram_id" varchar(64),
	"balance" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_telegram_id_unique" UNIQUE("telegram_id")
);
--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;