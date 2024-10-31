"use server";
import { users, insertUserSchema } from "@/db/schema";
import { actionClient, protectedActionClient } from "@/lib/safe-actions";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const createUser = actionClient
  .schema(insertUserSchema)
  .action(async ({ ctx, parsedInput }) => {
    try {
      console.log(parsedInput);
      await ctx.db.insert(users).values({
        ...parsedInput,
      });
    } catch (err) {
      console.log(err);
      return { success: false };
    }
    return {
      success: true,
    };
  });

export const deleteUser = protectedActionClient
  .schema(z.object({ id: z.string() }))
  .action(async ({ ctx, parsedInput }) => {
    try {
      if (ctx.user.id == parsedInput.id || ctx.user.role == "admin")
        return { success: false };
      await ctx.db.delete(users).where(eq(users.id, parsedInput.id));
    } catch (err) {
      console.log(err);
      return { success: false };
    }
    revalidatePath("/admin/dashboard/users");
    return { success: true };
  });
