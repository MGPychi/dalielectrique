"use client";
import { AnimatePresence } from "framer-motion";
import React from "react";
import MobileMenu from "./MobileMenu";
interface Props {
  links: {
    title: string;
    href: string;
  }[];
}
const MobileNav = ({ links }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  return (
    <AnimatePresence>
      {isMenuOpen && (
        <MobileMenu links={links} close={() => setIsMenuOpen(false)} />
      )}
    </AnimatePresence>
  );
};

export default MobileNav;
