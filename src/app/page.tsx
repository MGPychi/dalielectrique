"use client";
import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer";
import Hero from "./_components/Hero";
import Services from "./_components/Services";
import Introduction from "./_components/Introduction";
import MainProducts from "./_components/MainProducts";
import Location from "./_components/Location";
import WhyChooseUs from "./_components/WhyUs";

export default function Homepage() {
  return (
    <>
      <Header />
      <main className="flex-grow bg-white pt-16">
        <Hero />
        <Introduction />
        <Services />
        <MainProducts />
        <Location />
        <WhyChooseUs/>
      </main>
      <Footer />
    </>
  );
}
