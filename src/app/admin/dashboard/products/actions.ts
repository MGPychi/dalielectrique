"use server";
import { productImage, products } from "@/db/schema";
import { generateCloudinarySignature, uploadImage } from "@/lib/cloudinary";
import { actionClient, protectedActionClient } from "@/lib/safe-actions";
import { eq, is } from "drizzle-orm";
import { p } from "framer-motion/m";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { zfd } from "zod-form-data";

export async function generateUploadSignature() {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature = generateCloudinarySignature(
    {
      timestamp: timestamp,
      folder: "products", // Optional: specify upload folder
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

const updateProductSchema = zfd.formData({
  id: zfd.text(),
  name: zfd.text(),
  description: zfd.text(),
  isActive: zfd.text().transform((val) => val === "true"),
  isFeatured: zfd.text().transform((val) => val === "true"),
  imageUrls: zfd.text().transform((val) => JSON.parse(val)),
  cloudIds: zfd.text().transform((val) => JSON.parse(val)),
});

export const updateProduct = protectedActionClient
  .schema(updateProductSchema)
  .action(async ({ ctx, parsedInput }) => {
    try {
      // Start a transaction to ensure data consistency
      const result = await ctx.db.transaction(async (tx) => {
        // 1. Update product details
        await tx
          .update(products)
          .set({
            name: parsedInput.name,
            description: parsedInput.description,
            isActive: parsedInput.isActive,
            isFeatured: parsedInput.isFeatured,
          })
          .where(eq(products.id, parsedInput.id));

        // 2. Delete all existing product images from the database
        await tx
          .delete(productImage)
          .where(eq(productImage.productId, parsedInput.id));

        // 3. Insert new image records
        if (parsedInput.imageUrls.length > 0) {
          const imageRecords = parsedInput.imageUrls.map(
            (url: string, index: number) => ({
              productId: parsedInput.id,
              url: url,
              cloudId: parsedInput.cloudIds[index],
            })
          );

          await tx.insert(productImage).values(imageRecords);
        }

        return true;
      });

      if (!result) {
        throw new Error("Failed to update product");
      }

      // Revalidate the path to reflect the updated data
      revalidatePath("/admin/dashboard/products");
      return { success: true };
    } catch (err) {
      console.error("Error updating product:", err);
      return { success: false };
    }
  });

const createProductSchema = zfd.formData({
  description: zfd.text(),
  name: zfd.text(),
  isActive: zfd.text(),
  isFeatured: zfd.text(),
  imageUrls: zfd.text().optional(), // For storing Cloudinary URLs
  cloudIds: zfd.text().optional(), // For storing Cloudinary IDs
});
export const createProduct = actionClient
  .schema(createProductSchema)
  .action(async ({ ctx, parsedInput }) => {
    try {
      const [newProduct] = await ctx.db
        .insert(products)
        .values({
          description: parsedInput.description,
          name: parsedInput.name,
          isActive: parsedInput.isActive === "true",
          isFeatured: parsedInput.isFeatured === "true",
        })
        .returning({ id: products.id });

      // Now we just save the Cloudinary URLs and IDs that were uploaded client-side
      const imageUrls = JSON.parse(parsedInput.imageUrls || "[]");
      const cloudIds = JSON.parse(parsedInput.cloudIds || "[]");
      await Promise.all(
        imageUrls.map((url: string, index: number) =>
          ctx.db.insert(productImage).values({
            productId: newProduct.id,
            cloudId: cloudIds[index],
            url: url,
          })
        )
      );

      return { success: true };
    } catch (err) {
      console.log(err);
      return { success: false };
    }
  });

export const deleteProduct = protectedActionClient
  .schema(z.object({ id: z.string() }))
  .action(async ({ ctx, parsedInput }) => {
    try {
      await ctx.db.delete(products).where(eq(products.id, parsedInput.id));
    } catch (err) {
      console.log(err);
      return { success: false };
    }
    revalidatePath("/admin/dashboard/products");
    return { success: true };
  });

export const toggleProductActivation = protectedActionClient
  .schema(z.object({ id: z.string(), value: z.boolean() }))
  .action(async ({ ctx, parsedInput }) => {
    try {
      await ctx.db
        .update(products)
        .set({
          isActive: parsedInput.value,
        })
        .where(eq(products.id, parsedInput.id));
    } catch (err) {
      console.log(err);
      return { success: false };
    }
    revalidatePath("/admin/dashboard/products");
    return { success: true };
  });
