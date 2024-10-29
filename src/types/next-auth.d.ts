import "next-auth";
declare module "next-auth" {
  interface User {
    role: string;
    email: string;
    id: string;
  }
}
