ALTER TABLE "role" RENAME TO "tokens";--> statement-breakpoint
ALTER TABLE "tokens" DROP CONSTRAINT "role_userId_user_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tokens" ADD CONSTRAINT "tokens_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
