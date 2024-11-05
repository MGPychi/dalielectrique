"use client";
import { useRouter } from "next/navigation";
import React, { useState, useTransition } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  searchTerm: string;
  basePath: string;
  currentPage: number;
  placeholder?: string;
  className?: string;
  count: number;
}

const ProductSearchBar = ({
  searchTerm,
  currentPage,
  basePath,
  count,
  placeholder = "Search products...",
  className = "",
}: Props) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [searchInput, setSearchInput] = useState(searchTerm || "");
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  // Handle search with debounce
  const handleSearch = (value: string) => {
    setSearchInput(value);

    // Clear previous timeout if user keeps typing
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    // Set a new timeout to wait for 500ms before executing search
    const timeout = setTimeout(() => {
      startTransition(() => {
        router.push(`${basePath}?search=${value}&page=${currentPage}`);
      });
    }, 500);

    setDebounceTimeout(timeout);
  };

  // Clear search
  const handleClear = () => {
    setSearchInput("");
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    startTransition(() => {
      router.push(`${basePath}?page=${currentPage}`);
    });
  };

  // Cleanup timeout on unmount
  React.useEffect(() => {
    return () => {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }
    };
  }, [debounceTimeout]);

  return (
    <Card className={`w-full py-4 ${className}`}>
      <CardContent>
        <div className="flex flex-col gap-4 md:flex-row items-center">
          <div className="relative w-full md:w-1/3">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={placeholder}
              value={searchInput}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 pr-10"
              disabled={isPending}
            />
            {searchInput && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                {isPending && (
                  <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 hover:bg-muted"
                  onClick={handleClear}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Clear search</span>
                </Button>
              </div>
            )}
          </div>

          <div className="flex items-center text-sm text-muted-foreground">
            {isPending ? (
              <p className="flex items-center gap-2">
                <Loader2 className="h-3 w-3 animate-spin" />
                Updating results...
              </p>
            ) : searchInput ? (
              <div>
                <p>Showing results for &quot;{searchInput}&quot;</p>
                <p>{count} results</p>
              </div>
            ) : null}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductSearchBar;
