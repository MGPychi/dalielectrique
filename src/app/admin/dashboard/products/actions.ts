"use server";
import { products } from "@/db/schema";
import { actionClient, protectedActionClient } from "@/lib/safe-actions";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { zfd } from "zod-form-data";

const createProductSchema = zfd.formData({
  images: zfd.file().nullable().array(),
  description: zfd.text(),
  name: zfd.text(),
});
export const createProduct = actionClient
  .schema(createProductSchema)
  .action(async ({ ctx, parsedInput }) => {
    try {
      console.log(parsedInput.images);
      await ctx.db.insert(products).values({
        description: parsedInput.description,
        name: parsedInput.name,
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
