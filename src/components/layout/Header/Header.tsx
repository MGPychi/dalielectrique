"use client";
import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  Phone,
  Mail,
  Facebook,
  Youtube,
  Twitter,
  Linkedin,
} from "lucide-react";
import { useSpring, animated, config } from "@react-spring/web";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Header = () => {
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [scrollY, setScrollY] = useState(0);
  const headerAnimation = useSpring({
    opacity: scrollY > 50 ? 1 : 0, // Ensure opacity transitions correctly
    transform: `translateY(${scrollY > 50 ? 0 : -100}%)`,
    config: config.slow,
  });

  const fadeIn = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: config.molasses,
  });

  return (
    <>
      <animated.header
        style={headerAnimation}
        className="bg-black text-white py-2 fixed w-full z-50"
      >
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Mail className="h-4 w-4" />
            <span>admin@yourelectric.com</span>
          </div>
          <div className="flex items-center space-x-4">
            <Facebook className="h-4 w-4" />
            <Youtube className="h-4 w-4" />
            <Twitter className="h-4 w-4" />
            <Linkedin className="h-4 w-4" />
            <Phone className="h-4 w-4" />
          </div>
        </div>
      </animated.header>
      <div className="min-h-screen flex flex-col">
        <nav className="bg-white shadow-md sticky top-0 z-40">
          <div className="container mx-auto flex justify-between items-center py-4">
            <animated.div style={fadeIn} className="text-2xl font-bold">
              YOUR<span className="text-red-600">ELECTRIC</span>
            </animated.div>
            <div className="flex items-center space-x-6">
              <animated.div style={fadeIn}>
                <Link href="/" className="text-red-600 font-semibold">
                  Home
                </Link>
              </animated.div>
              <animated.div style={fadeIn}>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-red-600"
                >
                  About
                </Link>
              </animated.div>
              <animated.div style={fadeIn} className="relative group">
                <button className="text-gray-600 hover:text-red-600 flex items-center">
                  Services
                  <ChevronDown className="h-4 w-4 ml-1" />
                </button>
                {/* Dropdown menu would go here */}
              </animated.div>
              <animated.div style={fadeIn} className="relative group">
                <button className="text-gray-600 hover:text-red-600 flex items-center">
                  Our Projects
                  <ChevronDown className="h-4 w-4 ml-1" />
                </button>
                {/* Dropdown menu would go here */}
              </animated.div>
              <animated.div style={fadeIn}>
                <Link
                  href="/contact"
                  className="text-gray-600 hover:text-red-600"
                >
                  Contact Us
                </Link>
              </animated.div>
            </div>
            <animated.div style={fadeIn}>
              <Button className="bg-red-600 hover:bg-red-700 text-white">
                Get a consultant
              </Button>
            </animated.div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
