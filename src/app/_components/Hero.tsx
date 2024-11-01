"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  m as motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Hero2 from "../../../public/hero1.webp";
import Hero1 from "../../../public/hero2.png";
import Hero3 from "../../../public/hero3.png";
import Image from "next/image";
import Header from "@/components/layout/Header/Header";

const content = [
  {
    title: "Power For Seamless Electricity Solutions",
    subtitle:
      "Whether you're a homeowner, business owner, or community leader, we're here to light up your life with sustainable energy solutions that.",
    image: Hero1,
  },
  {
    title: "Innovative Electrical Services",
    subtitle:
      "Our team of expert electricians brings cutting-edge technology to your doorstep, ensuring efficient and safe electrical installations.",
    image: Hero2,
  },
  {
    title: "Powering Your Future",
    subtitle:
      "From residential to commercial projects, we're committed to delivering reliable and sustainable electrical solutions for a brighter tomorrow.",
    image: Hero3,
  },
];

const slideVariants = {
  enter: () => ({
    opacity: 0.9,
    scale: 1,
  }),
  center: {
    opacity: 1,
    scale: 1.02,
  },
  exit: () => ({
    opacity: 0.9,
    scale: 1,
  }),
};

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const interval = useRef<NodeJS.Timeout>();
  const [direction, setDirection] = useState("right");
  const [doneAnimating, setDoneAnimating] = useState(true);

  const paginate = useCallback(
    (newDirection: string) => {
      if (!doneAnimating) return;
      setDirection(newDirection);
      setCurrentIndex((prevIndex) => {
        return newDirection === "right"
          ? (prevIndex + 1) % content.length
          : (prevIndex - 1 + content.length) % content.length;
      });
      setDoneAnimating(false);
      clearInterval(interval.current);
    },
    [doneAnimating]
  );
  useEffect(() => {
    interval.current = setInterval(() => {
      paginate("right");
    }, 5000);
    return () => clearInterval(interval?.current);
  }, [paginate]);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black/40 backdrop-blur  ">
      <div className="absolute top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/70 to-transparent pt-4 pb-16">
        <Header />
      </div>
      <div className="hidden">
        {content.map(
          (item, idx) =>
            idx != 0 && (
              <Image
                key={`hero_hidden_ig_${idx}`}
                src={item.image}
                alt={item.title}
                className="hidden"
                blurDataURL=""
                quality={1}
                priority
              />
            )
        )}
      </div>
      <AnimatePresence
        initial={true}
        mode="wait"
        onExitComplete={() => setDoneAnimating(true)}
        // onExitComplete={() => (doneAnimating.current = true)}
      >
        {content.map((item, index) =>
          index === currentIndex ? (
            <motion.div
              key={`hero_item_${index}`}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, delay: 0.6 }}
              custom={direction}
              className="absolute inset-0"
            >
              <div className="relative h-full w-full">
                <div className="absolute inset-0 bg-black/50 backdrop-blur z-10" />

                <Image
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover"
                  blurDataURL=""
                  placeholder="blur"
                  quality={1}
                  priority
                />
                <div className="absolute inset-0 z-20 flex flex-col justify-center items-start p-8 md:p-16 lg:p-24">
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.2 }}
                    className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 max-w-3xl"
                  >
                    {item.title}
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-lg md:text-xl text-white mb-8 max-w-2xl"
                  >
                    {item.subtitle}
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex space-x-4"
                  >
                    <Link href="#contact">
                      <Button size="lg">Contact</Button>
                    </Link>
                    <Link href="#about">
                      <Button variant="outline" size="lg">
                        About Us
                      </Button>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ) : null
        )}
      </AnimatePresence>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30">
        {content.map((_, index) => (
          <motion.button
            initial={{ scale: 1 }}
            animate={{ scale: index === currentIndex ? 1.3 : 1 }}
            key={index}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              index === currentIndex ? "bg-white scale-125" : "bg-white/50"
            }`}
            onClick={() => {
              setDirection(index > currentIndex ? "right" : "left");
              paginate(index > currentIndex ? "right" : "left");
            }}
          />
        ))}
      </div>
      <button
        onClick={() => paginate("left")}
        disabled={!doneAnimating}
        className={`
         absolute left-4 bottom-10 transform -translate-y-1/2 z-30 text-white hover:text-gray-300 transition-colors`}
      >
        <ChevronLeft size={48} />
      </button>
      <button
        onClick={() => paginate("right")}
        disabled={!doneAnimating}
        className={`
          
          absolute right-4 bottom-10 transform -translate-y-1/2 z-30 text-white hover:text-gray-300 transition-colors`}
      >
        <ChevronRight size={48} />
      </button>
    </div>
  );
}
