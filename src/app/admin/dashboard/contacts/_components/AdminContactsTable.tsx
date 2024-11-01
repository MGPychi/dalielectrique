"use client";

import { deleteContact } from "@/app/actions";
import { getContacts } from "@/app/data/contacts-data";
import { ContactUsDataModal } from "@/components/modals/ContactUsDataModal";
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
import { selectContactSchema } from "@/db/schema";
import { useToast } from "@/hooks/use-toast";
// import { useToast } from "@/hooks/use-toast";
import { MoreHorizontalIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";

// import { deleteEmailAction } from "../actions";

interface Props {
  data: Awaited<ReturnType<typeof getContacts>>["data"];
  count: number;
  currentPage: number;
  searchTerm: string;
}

export default function UsersListTable({
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
        `/admin/dashboard/contacts?search=${value}&page=${currentPage}`
      );
    }, 500);

    setDebounceTimeout(timeout);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Contacts Dashboard</CardTitle>
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
              <TableHead>Phone</TableHead>
              <TableHead>Registred at</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <ContactItem key={`contact_item_${item.id}`} contact={item} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex w-full justify-center">
        <span className="text-sm text-muted-foreground">{count} contacts</span>
      </CardFooter>
    </Card>
  );
}
export const ContactItem = ({
  contact,
}: {
  contact: z.infer<typeof selectContactSchema>;
}) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <ContactUsDataModal
        open={showModal}
        contact={contact}
        onClose={() => setShowModal(false)}
      />
      <TableRow className="cursor-pointer" onClick={() => setShowModal(true)}>
        <TableCell>{contact.email}</TableCell>
        <TableCell>{contact.phone}</TableCell>
        <TableCell>{contact.createdAt?.toLocaleDateString()}</TableCell>
        <TableCell onClick={(e) => e.stopPropagation()}>
          <UserActionsMenu contactId={contact.id} />
        </TableCell>
      </TableRow>
    </>
  );
};

interface UserActionsMenuProps {
  contactId: string;
}

export const UserActionsMenu = ({ contactId }: UserActionsMenuProps) => {
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
              const result = await deleteContact({
                id: contactId,
              });
              if (result?.data?.success) {
                toast({
                  title: "Contact deleted",
                });
              } else {
                toast({
                  title: "Failed to delete contact",
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
