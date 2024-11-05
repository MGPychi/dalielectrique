"use server";
import { productImage, products } from "@/db/schema";
import { uploadImage } from "@/lib/cloudinary";
import { actionClient, protectedActionClient } from "@/lib/safe-actions";
import { eq, is } from "drizzle-orm";
import { p } from "framer-motion/m";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { zfd } from "zod-form-data";

const updateProductSchema = zfd.formData({
  id: z.string(),
  images: zfd.file().nullable().array().optional(),
  description: zfd.text().optional(),
  name: zfd.text().optional(),
  isActive: z.boolean().optional(),
});

// Define updateProduct action
export const updateProduct = protectedActionClient
  .schema(updateProductSchema)
  .action(async ({ ctx, parsedInput }) => {
    try {
      // Update product data in the database
      await ctx.db
        .update(products)
        .set({
          description: parsedInput.description,
          name: parsedInput.name,
          isActive: parsedInput.isActive,
        })
        .where(eq(products.id, parsedInput.id));

      // Log updated fields
      console.log("Updated fields:", parsedInput);
    } catch (err) {
      console.log(err);
      return { success: false };
    }

    // Revalidate the path to reflect the updated data
    revalidatePath("/admin/dashboard/products");
    return { success: true };
  });

const createProductSchema = zfd.formData({
  images: zfd.file().nullable().array(),
  description: zfd.text(),
  name: zfd.text(),
  isActive: zfd.text(),
  isFeatured: zfd.text(),
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
          isActive: parsedInput.isActive == "true",
          isFeatured: parsedInput.isFeatured == "true",
        })
        .returning({ id: products.id });
      parsedInput.images.forEach(async (image) => {
        if (image) {
          const response = await uploadImage(image);
          await ctx.db.insert(productImage).values({
            productId: newProduct.id,
            cloudId: response.cloudId,
            url: response.url,
          });
          console.log("upladed  ", image.name);
        }
      });
    } catch (err) {
      console.log(err);
      return { success: false };
    }

    revalidatePath("/admin/dashboard/products");
    return {
      success: true,
    };
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
