"use client";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";

interface Props {
  searchTerm: string;
  basePath: string;
  currentPage: number;
}
const ProductSearchBar = ({ searchTerm, currentPage, basePath }: Props) => {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState(searchTerm || "");
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  // Handle search with debounce
  const handleSearch = (value: string) => {
    setSearchInput(value);

    // Clear previous timeout if product keeps typing
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    // Set a new timeout to wait for 500ms before executing search
    const timeout = setTimeout(() => {
      router.push(`${basePath}?search=${value}&page=${currentPage}`);
    }, 500);

    setDebounceTimeout(timeout);
  };
  return (
    <Card className="w-full py-4 ">
      <CardContent className="  ">
        <div className="mb-6 flex flex-col gap-4 md:flex-row">
          <Input
            placeholder="Search products..."
            value={searchInput}
            onChange={(e) => handleSearch(e.target.value)}
            className="md:w-1/3"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductSearchBar;
