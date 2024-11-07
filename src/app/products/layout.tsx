import MinimalHeader from "@/components/layout/Header/MinimalHeader";
import { ReactNode } from "react";
import { getAllFeaturedActiveProducts } from "../data/products-data";
import Footer from "@/components/layout/Footer";

const layout = async ({ children }: { children: ReactNode }) => {
  const featuredProducts = await getAllFeaturedActiveProducts(6);
  return (
    <>
      <MinimalHeader featuredProducts={featuredProducts} />
      <main>
        {children}
        <Footer />
      </main>
    </>
  );
};

export default layout;
