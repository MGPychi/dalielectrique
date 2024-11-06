"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect } from "react";
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="w-full flex-col gap-2 min-h-screen flex justify-center items-center">
      <h2>Something went wrong!</h2>
      <Link href={"/"}>
        <Button>home</Button>
      </Link>
    </main>
  );
}
