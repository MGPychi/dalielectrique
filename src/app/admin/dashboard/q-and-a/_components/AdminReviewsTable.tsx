"use client";

import { deleteQandA } from "../actions";
import { getQandA } from "@/app/data/qna-data";
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
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { MoreHorizontalIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { selectQandASchema } from "@/db/schema";
import { z } from "zod";
import CreateQandAModal from "@/components/modals/CreateQandAModal";
import { QandADataModal } from "@/components/modals/QandADataModal";

interface Props {
  data: Awaited<ReturnType<typeof getQandA>>["data"];
  count: number;
  currentPage: number;
  searchTerm: string;
}

export default function AdminQandATable({
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

  const handleSearch = (value: string) => {
    setSearchInput(value);

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const timeout = setTimeout(() => {
      router.push(
        `/admin/dashboard/q_and_a?search=${value}&page=${currentPage}`
      );
    }, 500);

    setDebounceTimeout(timeout);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between space-x-6">
          <CardTitle>Q&A Dashboard</CardTitle>
          <CreateQandAModal />
        </div>
      </CardHeader>
      <CardContent className="min-h-[calc(100vh-328px)]">
        <div className="mb-6 flex flex-col gap-4 md:flex-row">
          <Input
            placeholder="Search Q&A..."
            value={searchInput}
            onChange={(e) => handleSearch(e.target.value)}
            className="md:w-1/3"
          />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Question</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <QandATableItem key={item.id} qanda={item} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex w-full justify-center">
        <span className="text-sm text-muted-foreground">
          {count} Q&A entries
        </span>
      </CardFooter>
    </Card>
  );
}

const QandATableItem = ({
  qanda,
}: {
  qanda: z.infer<typeof selectQandASchema>;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <QandADataModal
        onClose={() => setIsOpen(false)}
        open={isOpen}
        qanda={qanda}
      />
      <TableRow onClick={() => setIsOpen(true)} key={qanda.id}>
        <TableCell>{qanda.question}</TableCell>
        <TableCell>{qanda.createdAt?.toLocaleDateString()}</TableCell>
        <TableCell onClick={(e) => e.stopPropagation()}>
          <UserActionsMenu qandaId={qanda.id} />
        </TableCell>
      </TableRow>
    </>
  );
};

interface UserActionsMenuProps {
  qandaId: string;
}

export const UserActionsMenu = ({ qandaId }: UserActionsMenuProps) => {
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
              const result = await deleteQandA({
                id: qandaId,
              });
              if (result?.data?.success) {
                toast({
                  title: "Q&A deleted",
                });
              } else {
                toast({
                  title: "Failed to delete Q&A",
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
