"use client";
import Footer from "@/components/layout/Footer";
import Hero from "./_components/Hero";
import Services from "./_components/Services";
import Introduction from "./_components/Introduction";
import MainProducts from "./_components/MainProducts";
import Location from "./_components/Location";
import WhyChooseUs from "./_components/WhyUs";
import Reviews from "./_components/Reviews";
import ContactusSection from "./_components/ContactUsSection";
import { ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import {motion} from "framer-motion";

export default function Homepage() {
  return (
    <>
      <main className="flex-grow bg-white ">
        <Hero />
        <Introduction />
        <Services />
        <MainProducts />
        <Location />
        <WhyChooseUs />
        <Reviews />
        <ContactusSection />
        <GoUpButton />
      </main>
      <Footer />
    </>
  );
}
const GoUpButton = () => {
  const [visible, setVisible] = useState(false);
  const goUp = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };
  const handleScroll = () => {
    if (window.scrollY > 200) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return visible ? (
    <AnimatePresence>
      <motion.div
      initial={{ opacity: 0,y:100, scale: 0 }}
        exit={{ opacity: 0 ,y:100, scale: 0}}
        animate={{ opacity: 1,y:0,scale:1 }}
        onClick={goUp}
        className="rounded-full ring-2 hover:ring-primary ring-white w-14 h-14  flex justify-center items-center  bg-primary fixed bottom-10 right-10 text-white cursor-pointer"
      >
        <ChevronUp className="w-8 h-8" />
      </motion.div>
    </AnimatePresence>
  ) : null;
};
