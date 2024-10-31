import "next-auth";

declare module "next-auth" {
  interface User {
    role: "admin" | "superAdmin";
    email: string;
    id: string;
  }
}
