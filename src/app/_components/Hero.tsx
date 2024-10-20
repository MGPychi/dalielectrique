"use client";
import React from 'react'
import {m as motion} from "framer-motion"
import { Button } from '@/components/ui/button'
import Image from 'next/image'

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
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="text-black">ZAK</span>
              <span className="text-red-500">ELECTRIC</span>
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              Trusted Local Electricians<br />Serving Kitchener-Waterloo
            </h2>
            <p className="text-gray-600 mb-6">
              Fast, expert electrical services for homes, businesses, and industries.
            </p>
            <Button size="lg" className="bg-red-500 hover:bg-red-600 text-white">
              Get a Consultation
            </Button>
          </motion.div>
          <motion.div
            className="md:w-1/2 mt-8 md:mt-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Image
              src="/hero.webp"
              alt="Electrician reviewing blueprints"
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </motion.div>
        </div>
      </main>
  )
}

export default Hero