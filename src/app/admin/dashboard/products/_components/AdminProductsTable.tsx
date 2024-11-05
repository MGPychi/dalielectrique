"use client";
import { getProducts } from "@/app/data/products-data";
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
import { useState } from "react";
import { deleteProduct, toggleProductActivation } from "../actions";
import CreateProductModal from "@/components/modals/CreateProductModal";
import { useRouter } from "next/navigation";
import UpdateProductModal from "@/components/modals/UpdateProductModal";

interface Props {
  data: Awaited<ReturnType<typeof getProducts>>["data"];
  count: number;
  currentPage: number;
  searchTerm: string;
}

export default function AdminProductsTable({
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

    // Clear previous timeout if product keeps typing
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    // Set a new timeout to wait for 500ms before executing search
    const timeout = setTimeout(() => {
      router.push(
        `/admin/dashboard/products?search=${value}&page=${currentPage}`
      );
    }, 500);

    setDebounceTimeout(timeout);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between space-x-6">
          <CardTitle>Products Dashboard</CardTitle>
          <CreateProductModal />
        </div>
      </CardHeader>
      <CardContent className="min-h-[calc(100vh-328px)]">
        <div className="mb-6 flex flex-col gap-4 md:flex-row">
          <Input
            placeholder="Search products..."
            value={searchInput}
            onChange={(e) => handleSearch(e.target.value)}
            className="md:w-1/3"
          />
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>is active</TableHead>
              <TableHead>Created at</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableItem key={item.id} product={item} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex w-full justify-center">
        <span className="text-sm text-muted-foreground">{count} products</span>
      </CardFooter>
    </Card>
  );
}
interface TableItemProps {
  product: Awaited<ReturnType<typeof getProducts>>["data"][0];
}
const TableItem = ({ product }: TableItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <UpdateProductModal
        closeModal={() => setIsOpen(false)}
        open={isOpen}
        product={product}
      />
      <TableRow onClick={() => setIsOpen(true)} key={product.id}>
        <TableCell>{product.name}</TableCell>
        <TableCell>
          {product.isActive ? (
            <span className="text-green-500">yes</span>
          ) : (
            <span className="text-red-500">no</span>
          )}
        </TableCell>
        <TableCell>{product.createdAt?.toLocaleDateString()}</TableCell>
        <TableCell onClick={(e) => e.stopPropagation()}>
          <ProductActionsMenu product={product} />
        </TableCell>
      </TableRow>
    </>
  );
};

interface ProductActionsMenuProps {
  product: Awaited<ReturnType<typeof getProducts>>["data"][0];
}

export const ProductActionsMenu = ({ product }: ProductActionsMenuProps) => {
  const { toast } = useToast();
  const deleteProductHandler = async () => {
    const result = await deleteProduct({
      id: product.id,
    });
    if (result?.data?.success) {
      toast({
        title: "Product deleted",
      });
    } else {
      toast({
        title: "Failed to delete product",
        variant: "destructive",
      });
    }
  };
  const toggleProductActivationHandler = async () => {
    const result = await toggleProductActivation({
      id: product.id,
      value: !product.isActive,
    });
    if (result?.data?.success) {
      toast({
        title: `Product ${product.isActive ? "deactivated" : "activated"}`,
      });
    } else {
      toast({
        title: `Failed to ${product.isActive ? "activate" : "deactivate"} product`,
        variant: "destructive",
      });
    }
  };

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
            variant="default"
            size="sm"
            onClick={toggleProductActivationHandler}
          >
            {product.isActive ? "Deactivate" : "Activate"}
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button
            className="w-full"
            variant="destructive"
            size="sm"
            onClick={deleteProductHandler}
          >
            Delete
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
