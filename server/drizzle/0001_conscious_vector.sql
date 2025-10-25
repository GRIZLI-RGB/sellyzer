CREATE TABLE "product_reviews" (
	"id" serial PRIMARY KEY NOT NULL,
	"product_id" integer NOT NULL,
	"total_count" integer NOT NULL,
	"rating" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "settings" (
	"id" serial PRIMARY KEY NOT NULL,
	"pro_daily_rate" integer DEFAULT 30 NOT NULL,
	"min_deposit" integer DEFAULT 100 NOT NULL
);
--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "marketplace" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "auth_provider" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "email" SET DATA TYPE varchar(64);--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "article" varchar(128) NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "images" text[] DEFAULT ARRAY[]::text[] NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "rating" numeric(2, 1);--> statement-breakpoint
ALTER TABLE "product_reviews" ADD CONSTRAINT "product_reviews_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
DROP TYPE "public"."marketplace";--> statement-breakpoint
DROP TYPE "public"."auth_provider";