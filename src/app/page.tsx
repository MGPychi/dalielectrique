"use client";
import { useScroll, useSpring } from "framer-motion";
import Footer from "@/components/layout/Footer";
import Hero from "./_components/Hero";
import Services from "./_components/Services";
import AboutUs from "./_components/AboutUs";
import MainProducts from "./_components/MainProducts";
import Location from "./_components/Location";
import WhyChooseUs from "./_components/WhyUs";
import Reviews from "./_components/Reviews";
import ContactusSection from "./_components/ContactUsSection";
import ScrollUp from "./_components/ScrollUp";
import { m as motion } from "framer-motion";
import AandQ from "./_components/AndQ";

export default function Homepage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {});
  return (
    <>
      <main className="flex-grow bg-white ">
        <motion.div
          className="h-2 fixed top-0 left-0 right-0 z-50 bg-primary origin-left"
          style={{ scaleX: scaleX }}
        />
        <Hero />
        <AboutUs />
        <Services />
        <MainProducts />
        <Reviews />
        <WhyChooseUs />
        <AandQ />
        <Location />
        <ContactusSection />
        <ScrollUp />
      </main>
      <Footer />
    </>
  );
}
