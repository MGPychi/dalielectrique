import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useState } from "react";
import { Button } from "../ui/button";
import { PlusIcon } from "lucide-react";
import AddNewReviewForm from "@/app/admin/dashboard/reviews/_components/AddNewReviewForm";

const CreateReviewModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);

  return (
    <>
      <Button onClick={openModal} className="  rounded-sm hidden lg:block ">
        <PlusIcon />
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl    outline-none ring-none ">
          <DialogHeader>
            <DialogTitle> Create a new admin user </DialogTitle>
            {/* <DialogDescription>
              this admin user will be able to manage the admin page
            </DialogDescription> */}
            <AddNewReviewForm />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateReviewModal;
