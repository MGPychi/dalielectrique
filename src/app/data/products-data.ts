import { PAGE_SIZE } from "@/constants";
import { db } from "@/db";
import { products } from "@/db/schema";
import { and, count, eq, gte, or, sql } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import { cache } from "react";

export const getAllFeaturedActiveProducts = unstable_cache(
  async () => {
    // const result = await db
    //   .select()
    //   .from(products)
    //   .where(and(eq(products.isActive, true), eq(products.featured, true)));
    return db.query.products.findMany({
      where: and(eq(products.isActive, true), eq(products.featured, true)),
      with: {
        images: true,
      },
    });
  },
  ["featured_products"],
  {
    tags: ["featured_products"],
  }
);
export const getAllProducts = unstable_cache(
  async () => {
    const result = await db.select().from(products);
    return result;
  },
  ["products"],
  {
    tags: ["products"],
  }
);
// Fetch paginated products with optional search query
export const getProducts = cache(
  async ({ page, q }: { page: number; q?: string }) => {
    const filteredProducts = db.$with("filtered_products").as(
      db
        .select()
        .from(products)
        .where(
          and(
            q
              ? or(
                  sql`${products.name} LIKE ${`%${q}%`}`,
                  sql`${products.description} LIKE ${`%${q}%`}`
                )
              : undefined
          )
        )
    );

    const result = await db
      .with(filteredProducts)
      .select()
      .from(filteredProducts)
      .limit(PAGE_SIZE)
      .offset((page - 1) * PAGE_SIZE);

    // Get total review count after filters
    const totalCount = await getProductsCount({ q });
    const pageCount = Math.ceil(totalCount / PAGE_SIZE);
    const hasNext = page < pageCount;
    const hasPrev = page > 1;

    return { data: result, hasNext, hasPrev, count: totalCount, pageCount };
  }
);

// Get total count of filtered products
export const getProductsCount = cache(async ({ q }: { q?: string }) => {
  const filteredProducts = db.$with("filtered_products").as(
    db
      .select()
      .from(products)
      .where(
        and(
          q
            ? or(
                sql`${products.name} LIKE ${`%${q}%`}`,
                sql`${products.description} LIKE ${`%${q}%`}`
              )
            : undefined
        )
      )
  );

  const [result] = await db
    .with(filteredProducts)
    .select({ count: count() })
    .from(filteredProducts);

  return result.count;
});

// Get count of products created today
export const getReviewCountToday = cache(async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [result] = await db
    .select({ count: count() })
    .from(products)
    .where(gte(products.createdAt, today));

  return result.count;
});

// Get total count of all products
export const getTotalProductsCount = cache(async () => {
  const result = await db.select({ count: count() }).from(products);
  return result[0].count;
});

// Get count of products created specifically today
export const getTotalProductsCountToday = cache(async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const result = await db
    .select({ count: count() })
    .from(products)
    .where(sql`DATE(created_at) = ${today.toISOString().split("T")[0]}`);

  return result[0].count;
});
