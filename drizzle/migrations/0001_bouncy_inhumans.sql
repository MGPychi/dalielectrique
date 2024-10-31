ALTER TABLE "contact" ADD PRIMARY KEY ("id");--> statement-breakpoint
ALTER TABLE "contact" ALTER COLUMN "id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD PRIMARY KEY ("id");--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "id" SET NOT NULL;