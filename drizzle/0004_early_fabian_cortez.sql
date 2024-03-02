ALTER TABLE "user" ADD COLUMN "dateOfBirth" text NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "phoneNumber" text NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "agreement" boolean NOT NULL;--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "image";