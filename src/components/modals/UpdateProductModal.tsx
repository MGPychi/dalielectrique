import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import UpdateProductForm from "@/app/admin/dashboard/products/_components/UpdateProductForm";
import { getProducts } from "@/app/data/products-data";

interface Props {
  product: Awaited<ReturnType<typeof getProducts>>["data"][0];
  open: boolean;
  closeModal: () => void;
}

const UpdateProductModal = ({ product, closeModal, open }: Props) => {
  return (
    <>
      <Dialog open={open} onOpenChange={closeModal}>
        <DialogContent className="max-w-2xl h-[95vh] overflow-y-scroll">
          <DialogHeader>
            <DialogTitle>Update Product</DialogTitle>
          </DialogHeader>
          <UpdateProductForm initialData={product} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UpdateProductModal;
