"use client";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const Hero = () => {
  return (
    <main className="container mx-auto px-4 py-8 md:py-16">
      <div className="flex  flex-col md:flex-row items-center">
        <motion.div
          className="md:w-1/2"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className="text-5xl md:text-7xl py-2 font-bold mb-4">
            <span className="text-black">DALI</span>
            <span className="text-red-500">ELECTRIC</span>
          </h1>
          <h2 className="text-2xl md:text-4xl font-medium mb-4">
            Trusted Local Electricians
            <br />
            Serving Kitchener-Waterloo
          </h2>
          <p className="text-gray-600 mb-6">
            Fast, expert electrical services for homes, businesses, and
            industries.
          </p>
          <div className="py-4"></div>
          <Button className="bg-red-500 rounded-sm h-[3.5rem]  px-12 hover:bg-red-600 text-white">
            Get a Consultation
          </Button>
        </motion.div>
        <motion.div
          className="md:w-1/2  mt-8 md:mt-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Image
            src="/hero.webp"
            alt="Electrician reviewing blueprints"
            width={800}
            height={600}
            className="rounded-lg  shadow-lg"
          />
        </motion.div>
      </div>
    </main>
  );
};

export default Hero;
