"use client";
import { AnimatePresence } from "framer-motion";
import MobileMenu from "./MobileMenu";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
interface Props {
  links: {
    title: string;
    href: string;
  }[];
}
const MobileNav = ({ links }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <AnimatePresence>
      <Button
        className="  hover:ring-primary  "
        onClick={() => setIsMenuOpen((p) => !p)}
      >
        <MenuIcon className="  text-white" />
      </Button>
      {isMenuOpen && (
        <MobileMenu links={links} close={() => setIsMenuOpen(false)} />
      )}
    </AnimatePresence>
  );
};

export default MobileNav;
