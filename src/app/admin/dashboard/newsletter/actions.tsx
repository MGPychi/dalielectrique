// "use server";

// import { authActionsClient } from "@/lib/safe-actions";
// import { newsLetter } from "@/components/database/src/db/schema";
// import { eq } from "drizzle-orm";
// import { revalidatePath } from "next/cache";
// import { z } from "zod";

// export const deleteEmailAction = authActionsClient
//   .schema(
//     z.object({
//       email: z.string(),
//     }),
//   )
//   .action(async ({ ctx, parsedInput }) => {
//     await ctx.db
//       .delete(newsLetter)
//       .where(eq(newsLetter.email, parsedInput.email));
//     revalidatePath("/dashboard/newsletter");
//     return { status: "sucess" };
//   });
