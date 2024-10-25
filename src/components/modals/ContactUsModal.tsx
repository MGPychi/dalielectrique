import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import ContactUsForm from "@/app/_components/Contact/ContactUsForm";
import { useState } from "react";
import { Button } from "../ui/button";


const ContactUsModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button className="  rounded-sm hidden lg:block hover:ring-2 hover:ring-primary">
        Contact Us
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle> Contact Us </DialogTitle>
            <DialogDescription>
              Please provide your information to get a detailed review of your
              professional profile.
            </DialogDescription>
          </DialogHeader>
          <ContactUsForm />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ContactUsModal;