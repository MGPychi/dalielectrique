import { hashPassword } from "@/lib/passwords";
import { db } from ".";
import { productImage, products, users } from "./schema";
import * as dotenv from "dotenv";
import slugify from "slugify";
dotenv.config({
  path: ".env",
});

const registerAdminUser = async () => {
  const email = process.env.SUPERUSER_EMAIL;
  const password = process.env.SUPERUSER_PASSWORD;
  const name = process.env.SUPERUSER_NAME;
  console.log(email, password, name);
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
const productsData = [
  {
    name: " DEWALT 20V Max Cordless Drill/Driver Kit, 2 Batteries and Charger Included (DCD771C2) ",
    description:
      "    Compact, lightweight design fits into tight areas    High performance motor delivers 300 unit watts out (UWO) of power ability completing a wide range of applications    High speed transmission delivers two speeds (0-450 & 1,500 rpm) for a range of fastening and drilling applications    1/2 single sleeve ratcheting chuck provides tight bit gripping strength    Ergonomic handle delivers comfort and control    NEW 18V XR Li-Ion compact drill driver featuring XR 1.3Ah Li-Ion battery technology› See more product details ",
    isActive: true,
    isFeatured: true,
    images: [
      {
        cloudId: "08da3132-29ac-45b8-9972-c6eeb38149c2",
        url: "https://res.cloudinary.com/daoqriocx/image/upload/v1730795445/products/i1oezsf0teth7rrfhwga.png",
      },
    ],
  },
];
const seedProducts = async () => {
  productsData.forEach(async (p) => {
    const result = await db
      .insert(products)
      .values({
        description: p.description,
        name: p.name,
        slug: slugify(p.name),
        isActive: p.isActive,
        isFeatured: p.isFeatured,
      })
      .returning({ productId: products.id });
    const product = result[0];
    p.images.forEach(async (img) => {
      await db.insert(productImage).values({
        cloudId: img.cloudId,
        url: img.url,
        productId: product.productId,
      });
    });
    console.log("seeded product ", p.name);
  });
};

const seed = async () => {
  console.log("starting seeding the database");
  await registerAdminUser();
  await seedProducts();
};

seed().catch((e) => {
  console.error(e);
  process.exit();
});
