import { PAGE_SIZE } from "@/constants";
import { db } from "@/db";
import { contacts } from "@/db/schema";
import { and, count, or, sql } from "drizzle-orm";
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
  const result = await db.select({ count: count() }).from(contacts);
  const c = result[0];
  return c.count;
});
export const getTotalContactsCountToDay = cache(async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); //
  const result = await db
    .select({ count: count() })
    .from(contacts)
    .where(sql`DATE(created_at) = ${today.toISOString().split("T")[0]}`);
  const c = result[0];
  return c.count;
});
