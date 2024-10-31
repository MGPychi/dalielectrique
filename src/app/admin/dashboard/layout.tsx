import SideBar from "@/components/SideBar";
import Header from "@/components/layout/AdminHeader/AdminHeader";
import { auth } from "@/lib/auth";
import { Contact, Home, Settings, Users } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { ComponentProps, ReactNode } from "react";

interface IPath {
  name: string;
  icon: ReactNode;
  href: ComponentProps<typeof Link>["href"];
}
const paths: IPath[] = [
  {
    name: "Home",
    icon: <Home className="h-5 w-5" />,
    href: "/admin/dashboard",
  },
  {
    name: "Contact",
    icon: <Contact className="h-5 w-5" />,
    href: "/admin/dashboard/contacts",
  },
  {
    name: "users",
    icon: <Users className="h-5 w-5" />,
    href: "/admin/dashboard/users",
  },
  {
    name: "Q an A",
    icon: <Settings className="h-5 w-5" />,
    href: "/dashboard",
  },
];
const checkIfAdmin = (role: string) => {
  return role == "admin" || role == "superAdmin";
};
const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();

  if (!session || !session.user || !checkIfAdmin(session.user.role))
    redirect("/admin/auth/signin");
  return (
    <div className="flex">
      <SideBar paths={paths} />
      <div className="container mx-auto">
        <Header paths={paths} />
        {children}
      </div>
    </div>
  );
};

export default Layout;
