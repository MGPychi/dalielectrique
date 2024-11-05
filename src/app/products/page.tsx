import React from "react";
import { getProducts } from "../data/products-data";
import ProductCard from "@/components/cards/ProductCard";
import { PagePaginator } from "@/components/PagePaginator";
import ProductSearchBar from "./_components/ProductSearchBar";

const ProductsPage = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] };
}) => {
  const page = (searchParams?.page as string) || "1";
  const q = searchParams?.search as string;
  const { data, hasNext, hasPrev, pageCount } = await getProducts({
    page: parseInt(page),
    isActive: true,
    q,
  });
  return (
    <section className="container space-y-4 mt-10 mx-auto">
      <ProductSearchBar
        basePath="/products"
        currentPage={parseInt(page)}
        searchTerm={q}
      />
      <div className=" gap-4 min-h-[70vh]  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
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
