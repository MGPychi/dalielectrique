import { PAGE_SIZE } from "@/constants";
import { db } from "@/db";
import { contacts } from "@/db/schema";
import { and, count, gte, or, sql } from "drizzle-orm";
import { cache } from "react";

export const getContacts = cache(
  async ({ page, q }: { page: number; q?: string }) => {
    const filteredContacts = db.$with("filtered_contacts").as(
      db
        .select()
        .from(contacts)
        .where(
          and(
            q
              ? or(
                  sql`${contacts.email} LIKE ${`%${q}%`}`,
                  sql`${contacts.name} LIKE ${`%${q}%`}`,
                  sql`${contacts.phone} LIKE ${`%${q}%`}`
                )
              : undefined
          )
        )
    );

    const result = await db
      .with(filteredContacts)
      .select()
      .from(filteredContacts)
      .limit(PAGE_SIZE)
      .offset((page - 1) * PAGE_SIZE);

    // Get total user count after filters
    const total = await getContactsCount({ q });
    const pageCount = Math.ceil(total / PAGE_SIZE);
    const hasNext = page < pageCount;
    const hasPrev = page > 1;

    return { data: result, hasNext, hasPrev, count: total, pageCount };
  }
);

export const getContactsCount = cache(async ({ q }: { q?: string }) => {
  const filteredContacts = db.$with("filteredContacts").as(
    db
      .select()
      .from(contacts)
      .where(
        and(
          q
            ? or(
                sql`${contacts.name} LIKE ${`%${q}%`}`,
                sql`${contacts.email} LIKE ${`%${q}%`}`,
                sql`${contacts.phone} LIKE ${`%${q}%`}`
              )
            : undefined
        )
      )
  );

  const [result] = await db
    .with(filteredContacts)
    .select({ count: count() })
    .from(filteredContacts);

  return result.count;
});

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
    .where(gte(contacts.createdAt, new Date()));
  const c = result[0];
  return c.count;
});
