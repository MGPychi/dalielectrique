import { hashPassword } from "@/lib/passwords";
import { db } from ".";
import { users } from "./schema";
import * as dotenv from "dotenv";
dotenv.config({
  path: ".env",
});

const registerAdminUser = async () => {
  const email = process.env.SUPERUSER_EMAIL;
  const password = process.env.SUPERUSER_PASSWORD;
  const name = process.env.SUPERUSER_NAME;
  if (!email || !password || !name) {
    throw new Error(" SUPERUSER CREDENTIALS ARE REQUIRED");
  }
  const hashed = await hashPassword(password);
  try {
    await db.insert(users).values({
      email,
      name,
      password: hashed,
      role: "superAdmin",
    });
    console.log(`${name} ${email} has been registered `);
  } catch (err) {
    console.error(err);
    console.log(`${email} already registered`);
  }
};

const seed = async () => {
  console.log("starting seeding the database");
  await registerAdminUser();
};

seed().catch((e) => {
  console.error(e);
  process.exit();
});
