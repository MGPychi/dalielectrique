"use server";
import { PAGE_SIZE } from "@/constants";
import { db } from "@/db";
import { QandA } from "@/db/schema";
import { and, count, gte, or, sql } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import { cache } from "react";

// Fetch all Q&A entries
export const getAllQandA = unstable_cache(
  async () => {
    const result = await db.select().from(QandA);
    return result;
  },
  ["q_and_a"],
  {
    tags: ["q_and_a"],
  }
);

// Fetch paginated Q&A entries with optional search query
export const getQandA = cache(
  async ({ page, q }: { page: number; q?: string }) => {
    const filteredQandA = db.$with("filtered_q_and_a").as(
      db
        .select()
        .from(QandA)
        .where(
          and(
            q
              ? or(
                  sql`${QandA.question} LIKE ${`%${q}%`}`,
                  sql`${QandA.answer} LIKE ${`%${q}%`}`
                )
              : undefined
          )
        )
    );

    const result = await db
      .with(filteredQandA)
      .select()
      .from(filteredQandA)
      .limit(PAGE_SIZE)
      .offset((page - 1) * PAGE_SIZE);

    const totalCount = await getQandACount({ q });
    const pageCount = Math.ceil(totalCount / PAGE_SIZE);
    const hasNext = page < pageCount;
    const hasPrev = page > 1;

    return { data: result, hasNext, hasPrev, count: totalCount, pageCount };
  }
);

// Get total count of filtered Q&A entries
export const getQandACount = cache(async ({ q }: { q?: string }) => {
  const filteredQandA = db.$with("filtered_q_and_a").as(
    db
      .select()
      .from(QandA)
      .where(
        and(
          q
            ? or(
                sql`${QandA.question} LIKE ${`%${q}%`}`,
                sql`${QandA.answer} LIKE ${`%${q}%`}`
              )
            : undefined
        )
      )
  );

  const [result] = await db
    .with(filteredQandA)
    .select({ count: count() })
    .from(filteredQandA);

  return result.count;
});

// Get count of Q&A entries created today
export const getQandACountToday = cache(async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [result] = await db
    .select({ count: count() })
    .from(QandA)
    .where(gte(QandA.createdAt, today));

  return result.count;
});

// Get total count of all Q&A entries
export const getTotalQandACount = cache(async () => {
  const result = await db.select({ count: count() }).from(QandA);
  return result[0].count;
});

// Get count of Q&A entries created specifically today
export const getTotalQandACountToday = cache(async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const result = await db
    .select({ count: count() })
    .from(QandA)
    .where(sql`DATE(created_at) = ${today.toISOString().split("T")[0]}`);

  return result[0].count;
});
