import React from "react";
import { getProducts } from "../data/products-data";
import ProductCard from "@/components/cards/ProductCard";
import { PagePaginator } from "@/components/PagePaginator";
// import { Button } from "@/components/ui/button";
// import { ChevronLeft } from "lucide-react";
// import Link from "next/link";
import ProductSearchBar from "./_components/ProductSearchBar";

const ProductsPage = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] };
}) => {
  const page = (searchParams?.page as string) || "1";
  const q = searchParams?.search as string;
  const { data, count, hasNext, hasPrev, pageCount } = await getProducts({
    page: parseInt(page),
    isActive: true,
    q,
  });
  return (
    <section className="container space-y-4 pt-10 mt-10 px-4 md:px-0 mx-auto">
      {/* <Link href="/">
        <Button variant={"link"}>
          <ChevronLeft className="w-6 h-6" />
          <span>Home</span>
        </Button>
      </Link> */}
      <div className="w-full block md:hidden max-w-screen-sm py-4">
        <ProductSearchBar
          basePath="/products"
          currentPage={parseInt(page)}
          count={count}
          searchTerm={q}
        />
      </div>
      <div className=" gap-4 min-h-[70vh]  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="py-4" />
      <PagePaginator
        baseHref="/products"
        hasNext={hasNext}
        hasPrev={hasPrev}
        page={parseInt(page)}
        pageCount={pageCount}
      />
    </section>
  );
};

export default ProductsPage;
