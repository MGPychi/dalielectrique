"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Search, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  searchTerm: string;
  basePath: string;
  currentPage: number;
  placeholder?: string;
  className?: string;
  count?: number;
}

const SearchComponent = ({
  searchTerm,
  currentPage,
  basePath,
  // count,
  placeholder = "Search products...",
  // className = "",
}: Props) => {
  const currentQuery = useSearchParams().get("search");
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [searchInput, setSearchInput] = useState(
    searchTerm || currentQuery || ""
  );
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
  useEffect(() => {
    return () => {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }
    };
  }, [debounceTimeout]);
  useEffect(() => {
    if (currentQuery && currentQuery.trim().length > 0)
      setSearchInput(currentQuery);
  }, [currentQuery]);

  return (
    <div className="flex    w-full  flex-col gap-4 md:flex-row items-center">
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder={placeholder}
          value={searchInput}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-10 h-12 w-full pr-10"
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
    </div>
  );
};
export default function ProductSearchBar({
  basePath,
  currentPage,
  searchTerm,
  className,
  count,
  placeholder,
}: Props) {
  return (
    <Suspense>
      <SearchComponent
        basePath={basePath}
        currentPage={currentPage}
        searchTerm={searchTerm}
        className={className}
        count={count}
        placeholder={placeholder}
      />
    </Suspense>
  );
}
