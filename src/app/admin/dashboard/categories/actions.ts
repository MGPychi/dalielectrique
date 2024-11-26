"use server";
import { productCategories, categoryImage } from "@/db/schema";
import { generateCloudinarySignature } from "@/lib/cloudinary";
import { actionClient, protectedActionClient } from "@/lib/safe-actions";
import { eq } from "drizzle-orm";
import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";
import { zfd } from "zod-form-data";
import slugify from "slugify";

export async function generateUploadSignature() {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature = generateCloudinarySignature(
    {
      timestamp: timestamp,
      folder: "product_categories", // Adjusted folder name
    },
    process.env.CLOUDINARY_API_SECRET!
  );

  return {
    timestamp,
    signature,
    apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!,
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
  };
}

const updateProductCategorySchema = zfd.formData({
  id: zfd.text(),
  name: zfd.text(),
  description: zfd.text(),
  isActive: zfd
    .text()
    .optional()
    .transform((val) => val === "true"),
  isFeatured: zfd
    .text()
    .optional()
    .transform((val) => val === "true"),
  imageUrls: zfd.text().transform((val) => JSON.parse(val)),
  cloudIds: zfd.text().transform((val) => JSON.parse(val)),
});

export const updateProductCategory = protectedActionClient
  .schema(updateProductCategorySchema)
  .action(async ({ ctx, parsedInput }) => {
    try {
      // Start a transaction to ensure data consistency
      const result = await ctx.db.transaction(async (tx) => {
        // Generate new slug if name changes
        const slug = slugify(parsedInput.name);

        // 1. Update product category details
        await tx
          .update(productCategories)
          .set({
            name: parsedInput.name,
            description: parsedInput.description,
            slug,
            ...(parsedInput.isActive !== undefined && {
              isActive: parsedInput.isActive,
            }),
            ...(parsedInput.isFeatured !== undefined && {
              isFeatured: parsedInput.isFeatured,
            }),
          })
          .where(eq(productCategories.id, parsedInput.id));

        // 2. Delete all existing category images from the database
        await tx
          .delete(categoryImage)
          .where(eq(categoryImage.categoryId, parsedInput.id));

        // 3. Insert new image records
        if (parsedInput.imageUrls.length > 0) {
          const imageRecords = parsedInput.imageUrls.map(
            (url: string, index: number) => ({
              categoryId: parsedInput.id,
              url: url,
              cloudId: parsedInput.cloudIds[index],
            })
          );

          await tx.insert(categoryImage).values(imageRecords);
        }

        return true;
      });

      if (!result) {
        throw new Error("Failed to update product category");
      }

      // Revalidate the path to reflect the updated data
      revalidatePath("/admin/dashboard/product-categories");
      revalidateTag("featured_product_categories");
      revalidatePath("/");
      return { success: true };
    } catch (err) {
      console.error("Error updating product category:", err);
      return {
        success: false,
        error: err instanceof Error ? err.message : "Unknown error",
      };
    }
  });

const createProductCategorySchema = zfd.formData({
  description: zfd.text(),
  name: zfd.text(),
  isActive: zfd.text().optional(),
  isFeatured: zfd.text().optional(),
  imageUrls: zfd.text().optional(), // For storing Cloudinary URLs
  cloudIds: zfd.text().optional(), // For storing Cloudinary IDs
});

export const createProductCategory = actionClient
  .schema(createProductCategorySchema)
  .action(async ({ ctx, parsedInput }) => {
    try {
      const slug = slugify(parsedInput.name);
      const [newProductCategory] = await ctx.db
        .insert(productCategories)
        .values({
          description: parsedInput.description,
          slug,
          name: parsedInput.name,
          isActive: parsedInput.isActive === "true",
          isFeatured: parsedInput.isFeatured === "true",
        })
        .returning({ id: productCategories.id });

      // Save Cloudinary URLs and IDs that were uploaded client-side
      const imageUrls = JSON.parse(parsedInput.imageUrls || "[]");
      const cloudIds = JSON.parse(parsedInput.cloudIds || "[]");

      await Promise.all(
        imageUrls.map((url: string, index: number) =>
          ctx.db.insert(categoryImage).values({
            categoryId: newProductCategory.id,
            cloudId: cloudIds[index],
            url: url,
          })
        )
      );

      revalidatePath("/admin/dashboard/product-categories");
      revalidateTag("featured_product_categories");
      revalidatePath("/");
      return { success: true };
    } catch (err) {
      console.error("Error creating product category:", err);
      return {
        success: false,
        error: err instanceof Error ? err.message : "Unknown error",
      };
    }
  });

export const deleteProductCategory = protectedActionClient
  .schema(z.object({ id: z.string() }))
  .action(async ({ ctx, parsedInput }) => {
    try {
      await ctx.db
        .delete(productCategories)
        .where(eq(productCategories.id, parsedInput.id));

      revalidatePath("/admin/dashboard/product-categories");
      return { success: true };
    } catch (err) {
      console.error("Error deleting product category:", err);
      return {
        success: false,
        error: err instanceof Error ? err.message : "Unknown error",
      };
    }
  });

export const toggleProductCategoryActivation = protectedActionClient
  .schema(z.object({ id: z.string(), value: z.boolean() }))
  .action(async ({ ctx, parsedInput }) => {
    try {
      await ctx.db
        .update(productCategories)
        .set({
          isActive: parsedInput.value,
        })
        .where(eq(productCategories.id, parsedInput.id));

      revalidatePath("/admin/dashboard/product-categories");
      return { success: true };
    } catch (err) {
      console.error("Error toggling product category activation:", err);
      return {
        success: false,
        error: err instanceof Error ? err.message : "Unknown error",
      };
    }
  });
