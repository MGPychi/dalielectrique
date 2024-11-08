import Footer from "@/components/layout/Footer";
import Hero from "./_components/Hero";
import Services from "./_components/Services";
import AboutUs from "./_components/AboutUs";
import MainProducts from "./_components/MainProducts";
import Location from "./_components/Location";
import WhyChooseUs from "./_components/WhyUs";
import Reviews from "./_components/Reviews/Reviews";
import ContactusSection from "./_components/Contact/ContactUsSection";
import ScrollUp from "./_components/ScrollUp";
import AandQ from "./_components/QandA/QandA";

export default function Homepage() {
  return (
    <>
      <main className="flex-grow bg-white ">
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
