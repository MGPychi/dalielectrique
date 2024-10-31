import { PAGE_SIZE } from "@/constants";
import { db } from "@/db";
import { contacts } from "@/db/schema";
import { and, or, sql } from "drizzle-orm";
import { cache } from "react";

export const getContacts = cache(
  async ({ page, q }: { page: number; q?: string }) => {
    const filteredContacts = db.$with("filteredContacts").as(
      db
        .select()
        .from(contacts)
        .where(and(q ? or(sql`${contacts.email} LIKE ${`%${q}%`}`) : undefined))
    );

    const result = await db
      .with(filteredContacts)
      .select()
      .from(contacts)
      .limit(PAGE_SIZE)
      .offset((page - 1) * PAGE_SIZE);

    // Get total user count after filters
    const totalEmails = result.length;
    const pageCount = Math.ceil(totalEmails / PAGE_SIZE);
    const hasNext = page < pageCount;
    const hasPrev = page > 1;

    return { data: result, hasNext, hasPrev, totalEmails, pageCount };
  }
);
export const getTotalContactsCount = cache(async () => {
  return 13;
});
export const getTotalContactsCountToDay = cache(async () => {
  return 0;
});
