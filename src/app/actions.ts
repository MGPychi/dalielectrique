"use server";
import { contacts, insertContactSchema } from "@/db/schema";
import { actionClient, protectedActionClient } from "@/lib/safe-actions";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const createContact = actionClient
  .schema(insertContactSchema)
  .action(async ({ ctx, parsedInput }) => {
    try {
      await ctx.db.insert(contacts).values({
        ...parsedInput,
      });
    } catch (err) {
      console.error(err);
      return { success: false };
    }
    return {
      success: true,
    };
  });

export const deleteContact = protectedActionClient
  .schema(z.object({ id: z.string() }))
  .action(async ({ ctx, parsedInput }) => {
    try {
      await ctx.db.delete(contacts).where(eq(contacts.id, parsedInput.id));
    } catch (err) {
      console.error(err);
      return { success: false };
    }
    revalidatePath("/admin/dashboard/contacts");
    return { success: true };
  });
