import { drizzle } from "drizzle-orm/node-postgres";
const dbUrl = process.env.DATABASE_URL;
import * as schema from "./schema";
if (!dbUrl) throw new Error("invalid database url");
export const db = drizzle(dbUrl, {
  schema,
});
