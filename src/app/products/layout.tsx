import MinimalHeader from "@/components/layout/Header/MinimalHeader";
import { ReactNode } from "react";

const layout = async ({ children }: { children: ReactNode }) => {
  return (
    <>
      <MinimalHeader />
      <main>{children}</main>
    </>
  );
};

export default layout;
