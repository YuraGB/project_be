CREATE TABLE IF NOT EXISTS "image_widget" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text DEFAULT '' NOT NULL,
	"image_widget" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"image_link" text NOT NULL,
	"group" text DEFAULT '' NOT NULL,
	"image_title" text NOT NULL,
	"image_src" text NOT NULL,
	"page_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "link_widget" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text DEFAULT '' NOT NULL,
	"link_widget" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"link_url" text NOT NULL,
	"group" text DEFAULT '' NOT NULL,
	"link_title" text NOT NULL,
	"page_id" integer
);
--> statement-breakpoint
ALTER TABLE "youtube_widget" ADD COLUMN "group" text DEFAULT '' NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "image_widget" ADD CONSTRAINT "image_widget_page_id_page_id_fk" FOREIGN KEY ("page_id") REFERENCES "page"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "link_widget" ADD CONSTRAINT "link_widget_page_id_page_id_fk" FOREIGN KEY ("page_id") REFERENCES "page"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
