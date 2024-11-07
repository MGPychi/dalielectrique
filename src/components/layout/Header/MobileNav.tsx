"use client";
import { AnimatePresence, m as motion } from "framer-motion";
import MobileMenu from "./MobileMenu";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, MenuIcon, X } from "lucide-react";
interface Props {
  links: {
    title: string;
    href: string;
  }[];
}

const MobileNav = ({ links }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div>
      <Button
        variant="ghost"
        className="p-2 hover:primary group rounded-md"
        onClick={() => setIsMenuOpen(true)}
      >
        <Menu className="!w-5 text-white group-hover:text-primary !h-5" />
      </Button>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-50 "
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <MobileMenu onClose={() => setIsMenuOpen(false)} links={links} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileNav;
