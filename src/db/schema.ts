import { pgTable, pgEnum, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
export const rolesEnum = pgEnum("roles", ["admin", "superAdmin"]);

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
export const reviews = pgTable("review", {
  id: uuid("id").defaultRandom().primaryKey(),
  body: text("body").notNull(),
  client: text("client").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});
export const QandA = pgTable("q_and_a", {
  id: uuid("id").defaultRandom().primaryKey(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

export const insertUserSchema = createInsertSchema(users);
export const selectUserSchema = createSelectSchema(users);
export const insertContactSchema = createInsertSchema(contacts, {
  body: z.string().min(10).max(1500),
  name: z.string().min(3),
  email: z.string().email(),
});
export const selectContactSchema = createSelectSchema(contacts);
export const insertReviewSchema = createInsertSchema(reviews, {
  body: z.string().min(10),
  client: z.string().min(3),
});
export const selectReviewSchema = createSelectSchema(reviews);
export const insertQandASchema = createInsertSchema(QandA, {
  question: z.string().min(10),
  answer: z.string().min(10),
});
export const selectQandASchema = createSelectSchema(QandA);
