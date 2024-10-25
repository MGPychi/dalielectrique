"use client";
import Footer from "@/components/layout/Footer";
import Hero from "./_components/Hero";
import Services from "./_components/Services";
import Introduction from "./_components/Introduction";
import MainProducts from "./_components/MainProducts";
import Location from "./_components/Location";
import WhyChooseUs from "./_components/WhyUs";
import Reviews from "./_components/Reviews";

export default function Homepage() {
  return (
    <>
      <main className="flex-grow bg-white ">
        <Hero />
        <Introduction />
        <Services />
        <MainProducts />
        <Location />
        <WhyChooseUs/>
        <Reviews/>
      </main>
      <Footer />
    </>
  );
}
