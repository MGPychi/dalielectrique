import SideBar from "@/components/SideBar";
import Header from "@/components/layout/AdminHeader/AdminHeader";
import { auth } from "@/lib/auth";
import { Contact, Home} from "lucide-react";
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
    href: "/admin/dashboard/contact",
  },
  // {
  //   name: "newsletter",
  //   icon: <Mail className="h-5 w-5" />,
  //   href: "/dashboard/newsletter",
  // },
  // {
  //   name: "Settings",
  //   icon: <Settings className="h-5 w-5" />,
  //   href: "/dashboard",
  // },
];

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();

  if (!session || !session.user || session.user.role !== "admin") redirect("/admin/auth/signin");
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
