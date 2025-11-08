CREATE TABLE "telegram_notifications" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"chat_id" varchar(64) NOT NULL,
	"is_connected" boolean DEFAULT false NOT NULL,
	"trigger_position_down" boolean DEFAULT false NOT NULL,
	"trigger_position_up" boolean DEFAULT false NOT NULL,
	"trigger_new_review" boolean DEFAULT false NOT NULL,
	"trigger_rating_change" boolean DEFAULT false NOT NULL,
	"trigger_price_change" boolean DEFAULT false NOT NULL,
	"trigger_availability_change" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "telegram_notifications" ADD CONSTRAINT "telegram_notifications_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;