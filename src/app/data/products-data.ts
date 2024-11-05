import { PAGE_SIZE } from "@/constants";
import { db } from "@/db";
import { products, selectProductsSchema } from "@/db/schema";
import { and, eq, sql } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import { cache } from "react";
import { z } from "zod";

interface ProductsResponse {
  data: Array<
    z.infer<typeof selectProductsSchema> & {
      images: { url: string; cloudId: string }[];
    }
  >;
  hasNext: boolean;
  hasPrev: boolean;
  count: number;
  pageCount: number;
}

interface GetProductsParams {
  page: number;
  q?: string;
  isActive?: boolean;
}

// Get all featured and active products with their images
export const getAllFeaturedActiveProducts = unstable_cache(
  async () => {
    return await db.query.products.findMany({
      where: and(eq(products.isActive, true), eq(products.isFeatured, true)),
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
export const getAllActiveProducts = unstable_cache(
  async () => {
    return await db.query.products.findMany({
      where: eq(products.isActive, true),
      with: {
        images: true,
      },
    });
  },
  ["active_products"],
  {
    tags: ["active_products"],
  }
);

// Get all products
export const getAllProducts = unstable_cache(
  async () => {
    return await db.query.products.findMany({
      with: {
        images: true,
      },
    });
  },
  ["products"],
  {
    tags: ["products"],
  }
);

// Get paginated products with optional search
export const getProducts = cache(
  async ({
    page,
    q,
    isActive,
  }: GetProductsParams): Promise<ProductsResponse> => {
    const productsQuery = db.query.products.findMany({
      where: and(
        q
          ? sql`${products.name} LIKE ${`%${q}%`} OR ${products.description} LIKE ${`%${q}%`}`
          : undefined,
        isActive != undefined
          ? sql`${products.isActive}=${`${isActive}`}`
          : undefined
      ),
      limit: PAGE_SIZE,
      offset: (page - 1) * PAGE_SIZE,
      with: {
        images: true,
      },
    });

    // const [result, totalCount] = await Promise.all([
    //   productsQuery,
    //   getProductsCount({ q }),
    // ]);
    const result = await productsQuery;
    const totalCount = result.length;

    const pageCount = Math.ceil(totalCount / PAGE_SIZE);

    return {
      data: result,
      hasNext: page < pageCount,
      hasPrev: page > 1,
      count: totalCount,
      pageCount,
    };
  }
);

// Get count of products created today
export const getReviewCountToday = cache(async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const result = await db.query.products.findMany({
    where: sql`${products.createdAt} >= ${today}`,
    columns: {
      id: true,
    },
  });

  return result.length;
});

// Get total count of all products
export const getTotalProductsCount = cache(async () => {
  const result = await db.query.products.findMany({
    columns: {
      id: true,
    },
  });

  return result.length;
});

// Get count of products created today
export const getTotalProductsCountToday = cache(async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const result = await db.query.products.findMany({
    where: sql`DATE(${products.createdAt}) = ${today.toISOString().split("T")[0]}`,
    columns: {
      id: true,
    },
  });

  return result.length;
});
