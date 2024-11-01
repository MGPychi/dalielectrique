import { PAGE_SIZE } from "@/constants";
import { db } from "@/db";
import { reviews } from "@/db/schema";
import { and, count, gte, or, sql } from "drizzle-orm";
import { cache } from "react";

export const getAllReviews = cache(async () => {
  const result = await db.select().from(reviews);
  return result;
});
// Fetch paginated reviews with optional search query
export const getReviews = cache(
  async ({ page, q }: { page: number; q?: string }) => {
    const filteredReviews = db.$with("filtered_reviews").as(
      db
        .select()
        .from(reviews)
        .where(
          and(
            q
              ? or(
                  sql`${reviews.body} LIKE ${`%${q}%`}`,
                  sql`${reviews.client} LIKE ${`%${q}%`}`
                )
              : undefined
          )
        )
    );

    const result = await db
      .with(filteredReviews)
      .select()
      .from(filteredReviews)
      .limit(PAGE_SIZE)
      .offset((page - 1) * PAGE_SIZE);

    // Get total review count after filters
    const totalCount = await getReviewsCount({ q });
    const pageCount = Math.ceil(totalCount / PAGE_SIZE);
    const hasNext = page < pageCount;
    const hasPrev = page > 1;

    return { data: result, hasNext, hasPrev, count: totalCount, pageCount };
  }
);

// Get total count of filtered reviews
export const getReviewsCount = cache(async ({ q }: { q?: string }) => {
  const filteredReviews = db.$with("filtered_reviews").as(
    db
      .select()
      .from(reviews)
      .where(
        and(
          q
            ? or(
                sql`${reviews.body} LIKE ${`%${q}%`}`,
                sql`${reviews.client} LIKE ${`%${q}%`}`
              )
            : undefined
        )
      )
  );

  const [result] = await db
    .with(filteredReviews)
    .select({ count: count() })
    .from(filteredReviews);

  return result.count;
});

// Get count of reviews created today
export const getReviewCountToday = cache(async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [result] = await db
    .select({ count: count() })
    .from(reviews)
    .where(gte(reviews.createdAt, today));

  return result.count;
});

// Get total count of all reviews
export const getTotalReviewsCount = cache(async () => {
  const result = await db.select({ count: count() }).from(reviews);
  return result[0].count;
});

// Get count of reviews created specifically today
export const getTotalReviewsCountToday = cache(async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const result = await db
    .select({ count: count() })
    .from(reviews)
    .where(sql`DATE(created_at) = ${today.toISOString().split("T")[0]}`);

  return result[0].count;
});
