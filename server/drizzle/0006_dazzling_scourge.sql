ALTER TABLE "products" RENAME COLUMN "createdAt" TO "created_at";--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;