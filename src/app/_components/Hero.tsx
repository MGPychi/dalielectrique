"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence,motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import Hero1 from "../../../public/hero1.webp";
import Hero2 from "../../../public/hero2.png";
import Hero3 from "../../../public/hero3.png";
import Header from "@/components/layout/Header/Header";

const content = [
  {
    title: "Power For Seamless",
    title2: " Living",
    subtitle: "Electricity Solutions",
    description:
      "Whether you're a homeowner, business owner, or community leader, we're here to light up your life with sustainable energy solutions.",
    image: Hero1,
  },
  {
    title: "Reliable Energy",
    title2: "Solutions",
    subtitle: "For Your Needs",
    description:
      "Our team of experts ensures that you have reliable and efficient energy solutions tailored to your specific requirements.",
    image: Hero2,
  },
  {
    title: "Sustainable Power",
    title2: "Solutions",
    subtitle: "For a Better Future",
    description:
      "Join us in our mission to provide sustainable and eco-friendly energy solutions that benefit both you and the environment.",
    image: Hero3,
  },
];

export default function AnimatedHero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % content.length);
  };
  const goToPrevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + content.length) % content.length);
  };

  useEffect(() => {
    const ticker = setInterval(() => goToNextSlide(), 5000);
    return () => clearInterval(ticker);
  }, []);

  return (
    <div className="relative  h-[100vh]  flex flex-col justify-center     w-full overflow-hidden">
      <Header />
      {content.map((item, index) =>
        index == currentIndex ? (
          <AnimatePresence key={`hero_carousel_${index}`}>
            <motion.div
              className="relative h-full w-full flex items-center justify-center"
              initial={{
                opacity: 0.8,
                x: 10,
              }}
              animate={{
                opacity: 1,
                x: 0,
                transition: { duration: 0.8 },
              }}
              exit={{
                opacity: 0.7,
                x: -10,
                transition: { duration: 0.8 },
              }}
            >
              <Image
                blurDataURL=""
                placeholder="blur"
                src={item.image}
                alt="Electrician working"
                layout="fill"
                objectFit="cover"
                quality={50}
              />
              <div className="absolute inset-0 bg-black bg-opacity-50" />

              <div className="flex z-50 flex-col space-y-8 absolute    right-10 top-40 sm:top-1/2 sm:-translate-y-1/2">
                <Button
                  onClick={goToPrevSlide}
                  className="bg-transparent hover:bg-primary hover:text-white text-white outline-none py-6 "
                  variant="outline"
                >
                  <ChevronUp />
                </Button>
                <Button
                  onClick={goToNextSlide}
                  className="bg-transparent hover:bg-primary hover:text-white text-white outline-none py-6 "
                  variant="outline"
                >
                  <ChevronDown />
                </Button>
              </div>
              <div className="container mx-auto     ">
                <div className="flex  z-50 bg-lue-400 space-y-2   justify-start   items-center  ">
                  <motion.div
                    initial={{ scale: 1 }}
                    animate={{ scale: 1.05 }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                    className="absolute inset-0"
                  ></motion.div>
                  <div className="relative z-10 flex h-full flex-col justify-center px-4 sm:px-6 lg:px-8">
                    <motion.div
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      className="text-sm font-semibold uppercase tracking-wider text-gray-300"
                    >
                      {item.subtitle}
                    </motion.div>
                    <div className="py-2   " />
                    <motion.h1
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
                    >
                      {item.title}
                    </motion.h1>
                    <motion.h1
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
                    >
                      {item.title2}
                    </motion.h1>
                    <div className="py-2   " />
                    <motion.p
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                      className="mt-3 max-w-md text-base text-gray-300 sm:text-lg md:mt-5 md:max-w-3xl"
                    >
                      {item.description}
                    </motion.p>
                    <div className="py-2   " />
                    <motion.div
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.8 }}
                      className="mt-6 sm:flex sm:space-x-4"
                    >
                      <Button
                        size="lg"
                        className="px-14 w-full py-5  sm:w-auto"
                      >
                        Contact Us
                      </Button>
                      <Button
                        variant="outline"
                        size="lg"
                        className="mt-3 bg-transparent hover:bg-white hover:text-primary text-white px-10 w-full sm:mt-0 sm:w-auto"
                      >
                        Learn More
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        ) : null
      )}
    </div>
  );
}
