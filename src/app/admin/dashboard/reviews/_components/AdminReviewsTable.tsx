"use client";
import CreateReviewModal from "@/components/modals/CreateReviewModal";
import { deleteReview } from "../actions";
import { getReviews } from "@/app/data/reviews-data";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  // TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
// import { useToast } from "@/hooks/use-toast";
import { MoreHorizontalIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { selectReviewSchema } from "@/db/schema";
import { z } from "zod";
import { ReviewDataModal } from "@/components/modals/ReviewDataModal";

interface Props {
  data: Awaited<ReturnType<typeof getReviews>>["data"];
  count: number;
  currentPage: number;
  searchTerm: string;
}

export default function AdminReviewsTable({
  data,
  count,
  currentPage,
  searchTerm,
}: Props) {
  const router = useRouter();
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
      router.push(
        `/admin/dashboard/reviews?search=${value}&page=${currentPage}`
      );
    }, 500);

    setDebounceTimeout(timeout);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between space-x-6">
          <CardTitle>Reviews Dashboard</CardTitle>
          <CreateReviewModal />
        </div>
      </CardHeader>
      <CardContent className="min-h-[calc(100vh-328px)]">
        <div className="mb-6 flex flex-col gap-4 md:flex-row">
          <Input
            placeholder="Search users..."
            value={searchInput}
            onChange={(e) => handleSearch(e.target.value)}
            className="md:w-1/3"
          />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client</TableHead>
              <TableHead>created at</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <ReviewTableItem key={item.id} review={item} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex w-full justify-center">
        <span className="text-sm text-muted-foreground">{count} reviews</span>
      </CardFooter>
    </Card>
  );
}
const ReviewTableItem = ({
  review,
}: {
  review: z.infer<typeof selectReviewSchema>;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ReviewDataModal
        onClose={() => setIsOpen(false)}
        open={isOpen}
        review={review}
      />
      <TableRow onClick={() => setIsOpen(true)} key={review.id}>
        <TableCell>{review.client}</TableCell>
        <TableCell>{review.createdAt?.toLocaleDateString()}</TableCell>
        <TableCell onClick={(e) => e.stopPropagation()}>
          <UserActionsMenu reviewId={review.id} />
        </TableCell>
      </TableRow>
    </>
  );
};

interface UserActionsMenuProps {
  reviewId: string;
}

export const UserActionsMenu = ({ reviewId }: UserActionsMenuProps) => {
  const { toast } = useToast();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="size-8 p-0">
          <MoreHorizontalIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-32">
        <DropdownMenuItem>
          <Button
            className="w-full"
            variant="destructive"
            size="sm"
            onClick={async () => {
              const result = await deleteReview({
                id: reviewId,
              });
              if (result?.data?.success) {
                toast({
                  title: "review deleted",
                });
              } else {
                toast({
                  title: "Failed to delete review",
                  variant: "destructive",
                });
              }
            }}
          >
            Delete
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
