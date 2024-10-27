"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Hero1 from "../../../public/hero1.webp";
import Hero2 from "../../../public/hero2.png";
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
  enter: (direction: string) => ({
    x: direction === "right" ? 1000 : direction === "left" ? -1000 : 0,
    y: direction === "up" ? 1000 : direction === "down" ? -1000 : 0,
    opacity: 0,
  }),
  center: {
    x: 0,
    y: 0,
    opacity: 1,
  },
  exit: (direction: string) => ({
    x: direction === "right" ? -1000 : direction === "left" ? 1000 : 0,
    y: direction === "up" ? -1000 : direction === "down" ? 1000 : 0,
    opacity: 0,
  }),
};

const contentVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: delay * 0.2,
      duration: 0.8,
      ease: "easeOut",
    },
  }),
};

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState("right");

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: string) => {
    setDirection(newDirection);
    if (newDirection === "right" || newDirection === "down") {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % content.length);
    } else {
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + content.length) % content.length
      );
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden    bg-black">
      <div className="absolute top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/70 to-transparent pt-4 pb-16">
        <Header />
      </div>
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        {content.map((item, index) =>
          index == currentIndex ? (
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 100, damping: 30 },
                y: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.4 },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.5}
              onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) {
                paginate("right");
              } else if (swipe > swipeConfidenceThreshold) {
                paginate("left");
              }
              }}
              className="absolute inset-0"
            >
              <div className="relative h-full w-full">
                <div className="absolute inset-0 bg-black/60 z-10" />
                <Image
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover"
                  priority
                />
                <div className="absolute inset-0 z-20 flex flex-col justify-center items-start p-8 md:p-16 lg:p-24">
                  <motion.h1
                    custom={1}
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 max-w-3xl"
                  >
                    {item.title}
                  </motion.h1>
                  <motion.p
                    custom={2}
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-lg md:text-xl text-white mb-8 max-w-2xl"
                  >
                    {item.subtitle}
                  </motion.p>
                  <motion.div
                    custom={3}
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex space-x-4"
                  >
                    <Button size="lg">Get A Free Estimate</Button>
                    <Button variant="outline" size="lg">
                      Discover More
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ) : null
        )}
      </AnimatePresence>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30">
        {content.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3    rounded-full transition-colors duration-300 ${
              index === currentIndex ? "bg-white scale-125" : "bg-white/50"
            }`}
            onClick={() => {
              setDirection(index > currentIndex ? "right" : "left");
              setCurrentIndex(index);
            }}
          />
        ))}
      </div>
      <button
        onClick={() => paginate("left")}
        className="absolute left-4 bottom-10 transform -translate-y-1/2 z-30 text-white hover:text-gray-300 transition-colors"
      >
        <ChevronLeft size={48} />
      </button>
      <button
        onClick={() => paginate("right")}
        className="absolute right-4 bottom-10 transform -translate-y-1/2 z-30 text-white hover:text-gray-300 transition-colors"
      >
        <ChevronRight size={48} />
      </button>
    </div>
  );
}
