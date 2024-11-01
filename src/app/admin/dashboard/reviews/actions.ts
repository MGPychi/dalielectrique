"use server";
import { insertReviewSchema, reviews } from "@/db/schema";
import { hashPassword } from "@/lib/passwords";
import { actionClient, protectedActionClient } from "@/lib/safe-actions";
import { and, ne, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const createReview = actionClient
  .schema(insertReviewSchema)
  .action(async ({ ctx, parsedInput }) => {
    try {
      await ctx.db.insert(reviews).values({
        ...parsedInput,
      });
    } catch (err) {
      console.log(err);
      return { success: false };
    }

    revalidatePath("/admin/dashboard/reviews");
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
      console.log(err);
      return { success: false };
    }
    revalidatePath("/admin/dashboard/reviews");
    return { success: true };
  });
