import React from "react";
import { Phone } from "lucide-react";
import * as motion from "framer-motion/m";
import ContactUsModal from "@/components/modals/ContactUsModal";
import clsx from "clsx";
import MobileNav from "./MobileNav";

const MinimalHeader = ({
  className,
  containerClassName,
}: {
  className?: string;
  containerClassName?: string;
}) => {
  const links = [
    { title: "Home", href: "/" },
    { title: "About", href: "/about" },
    { title: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={clsx(
        "sticky top-0 w-full bg-white/90 my-4 backdrop-blur-md shadow-sm z-50",
        className
      )}
    >
      <div className={clsx("container mx-auto px-4", containerClassName)}>
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.a href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">
              <span className="text-gray-900">DALI</span>
              <span className="text-primary">ELICTRIQUE</span>
            </span>
          </motion.a>

          {/* Contact Section */}
          <div className="flex items-center space-x-6">
            <motion.div className="hidden lg:flex items-center space-x-2 text-gray-600">
              <Phone className="w-4 h-4" />
              <span className="text-sm">0781810656</span>
            </motion.div>
            <ContactUsModal />
          </div>
        </nav>
      </div>
      <div className=" lg:hidden">
        <MobileNav links={links} />
      </div>
    </header>
  );
};

export default MinimalHeader;
