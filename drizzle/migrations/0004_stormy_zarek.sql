CREATE TYPE "public"."roles" AS ENUM('admin', 'superAdmin');--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "role" "roles" DEFAULT 'admin';