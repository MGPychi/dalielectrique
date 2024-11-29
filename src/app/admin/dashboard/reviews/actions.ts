"use server";
import { insertReviewSchema, reviews } from "@/db/schema";
import { actionClient, protectedActionClient } from "@/lib/safe-actions";
import { eq } from "drizzle-orm";
import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";

export const createReview = actionClient
  .schema(insertReviewSchema)
  .action(async ({ ctx, parsedInput }) => {
    try {
      await ctx.db.insert(reviews).values({
        ...parsedInput,
      });
    } catch (err) {
      console.error(err);
      return { success: false };
    }

    revalidatePath("/admin/dashboard/reviews");
    revalidatePath("/");
    return {
      success: true,
    };
  });

export const deleteReview = protectedActionClient
  .schema(z.object({ id: z.string() }))
  .action(async ({ ctx, parsedInput }) => {
    try {
      await ctx.db.delete(reviews).where(eq(reviews.id, parsedInput.id));
    } catch (err) {
      console.error(err);
      return { success: false };
    }
    revalidatePath("/admin/dashboard/reviews");
    revalidateTag("reviews");
    revalidatePath("/");
    return { success: true };
  });
