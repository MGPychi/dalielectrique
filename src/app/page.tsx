import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer";
import Hero from "./_components/Hero";

export default function Homepage() {
  return (
    <>
      <Header />
      <main className="flex-grow bg-white pt-16">
        <Hero />
      </main>
      <Footer />
    </>
  );
}
