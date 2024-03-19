CREATE TABLE IF NOT EXISTS "youtube_widget" (
	"id" serial PRIMARY KEY NOT NULL,
	"youtube_widget" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"youtube_title" text NOT NULL,
	"youtube_id" text NOT NULL,
	"page_id" integer
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "youtube_widget" ADD CONSTRAINT "youtube_widget_page_id_page_id_fk" FOREIGN KEY ("page_id") REFERENCES "page"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
