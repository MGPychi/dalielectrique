"use client";

import { m as motion, useInView } from "framer-motion";
// import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Hero1 from "../../../public/hero1.webp";
import Hero2 from "../../../public/hero2.png";
import Image from "next/image";
import Link from "next/link";
import SectionsBadge from "@/components/SectionsBadge";
import { useEffect, useRef, useState } from "react";

const data = [
  {
    text: "Mettez en avant les caractéristiques uniques ou les avantages",
  },
  {
    text: "Notre engagement pour une énergie durable",
  },
  {
    text: "Présentez vos principales solutions/services",
  },
];
const YEARS = new Date().getFullYear() - 1960;

export default function Composant() {
  const [count, setCount] = useState(0);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const timer = setInterval(() => {
        setCount((prev) => {
          if (prev === YEARS) {
            clearInterval(timer);
            return prev;
          }
          if (prev + 2 < YEARS) return prev + 2;
          return prev + 1;
        });
      }, 100);
      return () => clearInterval(timer);
    } else {
      setCount(0);
    }
  }, [isInView]);

  return (
    <section
      id="about"
      className="container  mx-auto px-4 py-16"
      ref={containerRef}
    >
      <div className="py-4" />
      <div className="grid  lg:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <motion.div
            className="relative"
            initial={{ scale: 1.5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Image
              src={Hero1}
              alt="Réunion d'équipe"
              placeholder="blur"
              height={550}
              width={550}
              quality={70}
              loading="lazy"
              className="rounded-lg w-full object-cover"
            />
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div
              initial={{ scale: 1.5, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
              className="bg-primary flex justify-center items-center text-white p-6 rounded-lg"
            >
              <div className="flex text-center flex-col gap-2">
                {/* <div className="text-5xl font-bold mb-2">{count}+</div> */}
                <div className="text-2xl font-bold mb-2">Depuis</div>
                <div className="text-5xl font-bold mb-2">1960</div>
                <div className="">
                  <span className="font-semibold px-1">{count}</span>
                  Années d&apos;expérience
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ scale: 1.5, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
            >
              <Image
                src={Hero2}
                height={500}
                width={500}
                quality={70}
                loading="lazy"
                alt="Consultation d'affaires"
                className="rounded-lg w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>

        <motion.div className="space-y-6 py-4">
          <SectionsBadge>À Propos de Nous</SectionsBadge>

          <h2 className="text-4xl font-bold leading-tight">
            Investis d&apos;une Mission pour Façonner l&apos;Avenir de
            l&apos;Énergie
          </h2>

          <motion.p
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-gray-600"
          >
            Nous sommes plus qu&apos;un simple fournisseur de services
            d&apos;électricité - nous sommes des pionniers de l&apos;industrie
            de l&apos;énergie, dédiés à construire un avenir plus lumineux et
            durable pour tous.
          </motion.p>

          <ul className="space-y-4">
            {data.map((item, index) => (
              <motion.li
                key={index} // Added key prop
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
                En savoir plus
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
