ALTER TABLE "product_reviews" ALTER COLUMN "rating" SET DATA TYPE numeric(2, 1);--> statement-breakpoint
ALTER TABLE "product_reviews" ALTER COLUMN "rating" DROP NOT NULL;