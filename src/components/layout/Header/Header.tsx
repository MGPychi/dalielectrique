"use client";
import React, { useState } from "react";
import {m as  motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Facebook, Menu, Phone } from "lucide-react";
import ContactUsModal from "@/components/modals/ContactUsModal";
const links = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Introduction",
    href: "/introduction",
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Services",
    href: "#services",
  },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header
      className="absolute w-full max-w-screen-xl rounded-xl py-2.5 px-2 backdrop-blur-2xl top-0 lg:top-0 xl:top-6 z-10 left-1/2 -translate-x-1/2"
    >
      <div className="container mx-auto px-4 ">
        <div className="flex justify-between items-center py-2.5 text-sm border-b border-gray-700">
          <motion.a
            href="mailto:admin@dalielictrique.com"
            className="hover:bg-primary text-white transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
          >
            admin@dalielictrique.ca
          </motion.a>
          <div className="flex text-white items-center space-x-4">
            <motion.div className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>0781810656</span>
            </motion.div>
            <motion.a
              href="#"
              className="hover:bg-primary transition-colors duration-200"
              whileHover={{ scale: 1.2, rotate: 5 }}
            >
              <Facebook size={18} />
            </motion.a>
          </div>
        </div>
        <div className="flex justify-between items-center py-4">
          <motion.div className="text-2xl md:text-3xl font-bold">
            <span className="text-white">DALI</span>
            <span className="text-primary">ELICTRIQUE</span>
          </motion.div>
          <nav className="hidden  lg:flex font-bold text-lg sm:-ml-10 items-center space-x-4">
            {links.map((item, index) => (
              <div key={index} className="relative group">
                <Link
                  href={item.href}
                  className={` px-4 py-2.5 rounded-sm     font-medium  hover:text-primary  text-gray-100  transition-colors duration-200 ${
                    index === 0 ? "text-primary" : ""
                  }`}
                >
                  {item.title}
                </Link>
              </div>
            ))}
          </nav>
          <div className="flex items-center space-x-4">
            <ContactUsModal />
            <Button
              variant="ghost"
              className="lg:hidden text-white hover:text-white hover:bg-primary"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu size={24} />
            </Button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="lg:hidden     py-4"
        >
          <nav className="container mx-auto px-4 flex flex-col space-y-4">
            {links.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={`text-sm text-white font-medium hover:text-primary transition-colors duration-200 ${
                  index === 0 ? "text-primary" : ""
                }`}
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </motion.div>
      )}
    </header>
  );
};

export default Header;
