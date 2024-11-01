"use server";

import { insertQandASchema, QandA } from "@/db/schema";
import { actionClient, protectedActionClient } from "@/lib/safe-actions";
import { eq } from "drizzle-orm";
import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";

// Create a new Q&A entry
export const createQandA = actionClient
  .schema(insertQandASchema)
  .action(async ({ ctx, parsedInput }) => {
    try {
      await ctx.db.insert(QandA).values({
        ...parsedInput,
      });
    } catch (err) {
      console.log(err);
      return { success: false };
    }

    revalidatePath("/admin/dashboard/q_and_a");
    revalidatePath("/");
    return {
      success: true,
    };
  });

// Delete a Q&A entry by ID
export const deleteQandA = protectedActionClient
  .schema(z.object({ id: z.string() }))
  .action(async ({ ctx, parsedInput }) => {
    try {
      await ctx.db.delete(QandA).where(eq(QandA.id, parsedInput.id));
    } catch (err) {
      console.log(err);
      return { success: false };
    }

    revalidatePath("/admin/dashboard/q_and_a");
    revalidateTag("q_and_a");
    revalidatePath("/");
    return { success: true };
  });
