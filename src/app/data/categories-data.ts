import { PAGE_SIZE } from "@/constants";
import { db } from "@/db";
import { productCategories, selectProductCategorySchema } from "@/db/schema";
import { and, eq, sql } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import { cache } from "react";
import { z } from "zod";

interface CategoriesResponse {
  data: Array<
    z.infer<typeof selectProductCategorySchema> & {
      images: { url: string; cloudId: string }[];
    }
  >;
  hasNext: boolean;
  hasPrev: boolean;
  count: number;
  pageCount: number;
}

interface GetCategoriesParams {
  page: number;
  q?: string;
  isActive?: boolean;
}

// Get all featured and active categories with their images
export const getAllFeaturedActiveCategories = unstable_cache(
  async (limit?: number) => {
    return await db.query.productCategories.findMany({
      where: and(
        eq(productCategories.isActive, true),
        eq(productCategories.isFeatured, true)
      ),
      with: {
        images: true,
      },
      limit,
    });
  },
  ["featured_product_categories"],
  {
    tags: ["featured_product_categories"],
  }
);

// Get all active categories
export const getAllActiveCategories = unstable_cache(
  async () => {
    return await db.query.productCategories.findMany({
      where: eq(productCategories.isActive, true),
      with: {
        images: true,
      },
    });
  },
  ["active_product_categories"],
  {
    tags: ["active_product_categories"],
  }
);

// Get all categories
export const getAllCategories = unstable_cache(
  async () => {
    return await db.query.productCategories.findMany({
      with: {
        images: true,
      },
    });
  },
  ["product_categories"],
  {
    tags: ["product_categories"],
  }
);

// Get category detail with slug
export const getCategoryDetailWithSlug = unstable_cache(
  async (slug: string) => {
    const decodedSlug = decodeURIComponent(slug);
    return await db.query.productCategories.findFirst({
      where: eq(productCategories.slug, decodedSlug),
      with: {
        images: true,
        products: {
          where: eq(productCategories.isActive, true),
        },
      },
    });
  },
  ["product_category_details"],
  { tags: ["product_category_details"] }
);

// Get paginated categories with optional search
export const getCategories = cache(
  async ({
    page,
    q,
    isActive,
  }: GetCategoriesParams): Promise<CategoriesResponse> => {
    const categoriesQuery = db.query.productCategories.findMany({
      where: and(
        q
          ? sql`${productCategories.name} LIKE ${`%${q}%`} OR ${productCategories.description} LIKE ${`%${q}%`}`
          : undefined,
        isActive != undefined
          ? sql`${productCategories.isActive}=${`${isActive}`}`
          : undefined
      ),
      limit: PAGE_SIZE,
      offset: (page - 1) * PAGE_SIZE,
      with: {
        images: true,
      },
    });

    const result = await categoriesQuery;
    const totalCount = await getTotalCategoriesCount({ q, isActive });
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

// Get count of categories created today
export const getCategoriesCountToday = cache(async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const result = await db.query.productCategories.findMany({
    where: sql`${productCategories.createdAt} >= ${today}`,
    columns: {
      id: true,
    },
  });
  return result.length;
});

// Get total count of all categories
export const getTotalCategoriesCount = cache(
  async (params?: { q?: string; isActive?: boolean }) => {
    const { q, isActive } = params || {};

    const result = await db
      .select({ count: sql`count(*)` })
      .from(productCategories)
      .where(
        and(
          q
            ? sql`${productCategories.name} LIKE ${`%${q}%`} OR ${productCategories.description} LIKE ${`%${q}%`}`
            : undefined,
          isActive != undefined
            ? sql`${productCategories.isActive}=${`${isActive}`}`
            : undefined
        )
      );

    return Number(result[0]?.count ?? 0);
  }
);

// Get count of categories created today
export const getTotalCategoriesCountToday = cache(async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const result = await db.query.productCategories.findMany({
    where: sql`DATE(${productCategories.createdAt}) = ${today.toISOString().split("T")[0]}`,
    columns: {
      id: true,
    },
  });
  return result.length;
});
