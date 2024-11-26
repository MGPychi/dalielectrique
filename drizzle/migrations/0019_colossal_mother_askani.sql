DROP TABLE "category_image";--> statement-breakpoint
ALTER TABLE "product_categories" ADD COLUMN "image_url" text NOT NULL;--> statement-breakpoint
ALTER TABLE "product_categories" DROP COLUMN IF EXISTS "is_active";--> statement-breakpoint
ALTER TABLE "product_categories" DROP COLUMN IF EXISTS "is_featured";