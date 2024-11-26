import {
  pgTable,
  pgEnum,
  boolean,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";
import { z } from "zod";

// Roles Enum
export const rolesEnum = pgEnum("roles", ["admin", "superAdmin"]);

// Users Table
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  role: rolesEnum().default("admin").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

// Contacts Table
export const contacts = pgTable("contact", {
  id: uuid("id").defaultRandom().primaryKey(),
  body: text("body").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

// Reviews Table
export const reviews = pgTable("review", {
  id: uuid("id").defaultRandom().primaryKey(),
  body: text("body").notNull(),
  client: text("client").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

// Q&A Table
export const QandA = pgTable("q_and_a", {
  id: uuid("id").defaultRandom().primaryKey(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

// Product Categories Table
export const productCategories = pgTable("product_categories", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  slug: text("slug").unique().notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

// Products Table
export const products = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").unique().notNull(),
  description: text("description").notNull(),
  categoryId: uuid("category_id").references(() => productCategories.id),
  isFeatured: boolean("is_featured").default(false).notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

// Product Image Table
export const productImage = pgTable("product_image", {
  id: uuid("id").defaultRandom().primaryKey(),
  productId: uuid("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  cloudId: text("cloud_id").notNull(),
  url: text("url").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

// Relations
export const productCategoriesRelations = relations(
  productCategories,
  ({ many }) => ({
    products: many(products),
  })
);

export const productsRelations = relations(products, ({ one, many }) => ({
  category: one(productCategories, {
    fields: [products.categoryId],
    references: [productCategories.id],
  }),
  images: many(productImage),
}));

export const productImageRelations = relations(productImage, ({ one }) => ({
  product: one(products, {
    fields: [productImage.productId],
    references: [products.id],
  }),
}));

// Zod Schemas for Validation
export const insertUserSchema = createInsertSchema(users);
export const selectUserSchema = createSelectSchema(users);

export const insertContactSchema = createInsertSchema(contacts, {
  body: z.string().min(10).max(1500),
  name: z.string().min(3),
  email: z.string().email(),
});
export const selectContactSchema = createSelectSchema(contacts);

export const insertReviewSchema = createInsertSchema(reviews, {
  body: z.string().min(10).max(700),
  client: z.string().min(3),
});
export const selectReviewSchema = createSelectSchema(reviews);

export const insertQandASchema = createInsertSchema(QandA, {
  question: z.string().min(10),
  answer: z.string().min(10),
});
export const selectQandASchema = createSelectSchema(QandA);

export const insertProductCategorySchema = createInsertSchema(
  productCategories,
  {
    name: z.string().min(3, "Category name must be at least 3 characters"),
    description: z
      .string()
      .min(10, "Description must be at least 10 characters"),
  }
);
export const selectProductCategorySchema =
  createSelectSchema(productCategories);

export const insertProductSchema = createInsertSchema(products, {
  name: z.string().min(3, "Product name must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
});
export const selectProductSchema = createSelectSchema(products);
