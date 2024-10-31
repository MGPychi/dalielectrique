import { pgTable, pgEnum, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
export const rolesEnum = pgEnum("roles", ["admin", "superAdmin"]);

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  role: rolesEnum().default("admin"),
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

// export type InsertUser = typeof users.$inferInsert;
export const insertUserSchema = createInsertSchema(users);
export const selectUserSchema = createSelectSchema(users);
// export type SelectUser = typeof users.$inferSelect;
// export type InsertContact = typeof contacts.$inferInsert;
// export type SelectContact = typeof contacts.$inferSelect;
export const insertContactSchema = createInsertSchema(contacts);
export const selectContactSchema = createSelectSchema(contacts);
