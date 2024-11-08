"use client";

import { m as motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Hero1 from "../../../public/hero1.webp";
import Hero2 from "../../../public/hero2.png";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
const data = [
  {
    text: "Highlight the unique features or benefits",
  },

  {
    text: "Our Commitment to Sustainable Energy",
  },
  {
    text: "Present your main solutions/services",
  },
];
export default function Component() {
  const [count, setCount] = useState(0);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  // Counter animation
  useEffect(() => {
    if (isInView) {
      const timer = setInterval(() => {
        setCount((prev) => {
          if (prev === 12) {
            clearInterval(timer);
            return prev;
          }
          return prev + 1;
        });
      }, 100);
      return () => clearInterval(timer);
    } else {
      setCount(0);
    }
  }, [isInView]);

  return (
    <div className="container mx-auto  px-4 py-16" ref={containerRef}>
      <div className="grid lg:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <motion.div
            initial={{ scale: 1.5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative"
          >
            <Image
              src={Hero1}
              alt="Team meeting"
              className="rounded-lg w-full object-cover"
            />
          </motion.div>
          <div className="grid grid-cols-2 gap-4">
            <motion.div
              initial={{ scale: 1.5, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
              className="bg-primary flex justify-center items-center text-white p-6 rounded-lg"
            >
              <div className="flex text-center flex-col gap-2">
                <div className="text-5xl font-bold mb-2">{count}+</div>
                <div className="">Years of Experience</div>
              </div>
            </motion.div>
            <motion.div
              initial={{ scale: 1.5, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
            >
              <Image
                src={Hero2}
                alt="Business consultation"
                className="rounded-lg w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>

        <motion.div className="space-y-6 py-4">
          <Badge className="py-2">About Us</Badge>

          <h2 className="text-4xl font-bold leading-tight">
            Charged with Purpose to Shaping Future of Energy
          </h2>

          <motion.p
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-gray-600"
          >
            We're more than just a provider of electricity services - we're
            pioneers in the energy industry, dedicated to shaping a brighter,
            more sustainable future for all.
          </motion.p>

          <ul className="space-y-4">
            {data.map((item, index) => (
              <motion.li
                initial={{ x: 100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{
                  duration: 0.5,
                  delay: 0.2 * index,
                  ease: "easeOut",
                }}
                className="flex items-center gap-3"
              >
                <div className="bg-primary rounded-full p-1">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                {item.text}
              </motion.li>
            ))}
          </ul>

          <motion.div
            className="pt-8"
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
            }}
          >
            <Link href="/#services">
              <Button
                size={"lg"}
                className="bg-primary:90 h-12 hover:bg-primary"
              >
                Learn more
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
