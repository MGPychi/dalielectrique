"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

export default function AnimatedHero() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // or a loading placeholder
  }

  return (
    <div className="relative  h-[85vh] py-10    w-full overflow-hidden">
      <Image
        src="/hero.jpg"
        alt="Electrician working"
        layout="fill"
        objectFit="cover"
        quality={100}
      />
      <div className="container mx-auto  ">
        <div className="flex   gap-8 justify-start lg:pt-20  items-center  ">
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
          <div className="absolute inset-0 bg-black bg-opacity-50" />
          <div className="relative z-10 flex h-full flex-col justify-center px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-sm font-semibold uppercase tracking-wider text-gray-300"
            >
              Current Electricity Services
            </motion.div>
              <div className="py-2   "/>
            <motion.h1
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              Power For Seamless
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              Electricity Solutions
            </motion.h1>
              <div className="py-2   "/>
            <motion.p
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-3 max-w-md text-base text-gray-300 sm:text-lg md:mt-5 md:max-w-3xl"
            >
              Whether you&apos;re a homeowner, business owner, or community
              leader, we&apos;re here to light up your life with sustainable
              energy solutions.
            </motion.p>
              <div className="py-2   "/>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mt-6 sm:flex sm:space-x-4"
            >
              <Button
                size="lg"
                className="px-14 py-5  sm:w-auto"
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
    </div>
  );
}
