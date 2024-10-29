"use client";

// import { getNewsLetterEmails } from "@/data/newsletter";
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
  // TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// import { useToast } from "@/hooks/use-toast";
import { MoreHorizontalIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

// import { deleteEmailAction } from "../actions";

interface Props {
  // emails: Awaited<ReturnType<typeof getNewsLetterEmails>>["emails"];
  totalEmails: number;
  currentPage: number;
  searchTerm: string;
}

export default function UsersListTable({
  // emails,
  totalEmails,
  currentPage,
  searchTerm,
}: Props) {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState(searchTerm || "");
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(
    null,
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
      router.push(`/dashboard/users?search=${value}&page=${currentPage}`);
    }, 500);

    setDebounceTimeout(timeout);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>NewsLetter Dashboard</CardTitle>
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
              <TableHead>Email</TableHead>
              <TableHead>Registred at</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* {emails.map((email) => (
              <TableRow key={email.id}>
                <TableCell>{email.email}</TableCell>
                <TableCell>{email.createdAt?.toLocaleDateString()}</TableCell>
                <TableCell>
                  <UserActionsMenu email={email.email} />
                </TableCell>
              </TableRow>
            ))} */}
            
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex w-full justify-center">
        <span className="text-sm text-muted-foreground">
          {totalEmails} Emails
        </span>
      </CardFooter>
    </Card>
  );
}

// interface UserActionsMenuProps {
//   email: string;
// }

export const UserActionsMenu = () => {//{ email }: UserActionsMenuProps
  // const { toast } = useToast();

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
              // const result = await deleteEmailAction({
              //   email: email,
              // });
              // if (result?.data?.status == "success") {
              //   toast({
              //     title: "Email deleted",
              //     variant: "success",
              //   });
              // } else {
              //   toast({
              //     title: "Failed to delete email",
              //     variant: "destructive",
              //   });
              // }
            }}
          >
            Delete
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
