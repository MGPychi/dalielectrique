"use client";

import { m as motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Hero1 from "../../../public/hero1.webp";
import Hero2 from "../../../public/hero2.png";
import Hero3 from "../../../public/hero3.png";
import SectionsBadge from "@/components/SectionsBadge";

const services = [
  {
    title: "Services Étincelles Lumineuses",
    description:
      "Découvrez notre gamme de services et dynamisez votre quotidien avec des solutions adaptées à vos besoins énergétiques.",
    image: Hero1,
  },
  {
    title: "Forfaits Énergie Facile",
    description:
      "Avec des technologies de pointe, nous vous offrons des solutions énergétiques pour optimiser l’efficacité de votre entreprise.",
    image: Hero2,
  },
  {
    title: "Forfaits Soin Électra",
    description:
      "Notre équipe d'experts assure des services de haute qualité pour la maintenance et l’optimisation de vos installations.",
    image: Hero3,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      duration: 0.8,
    },
  },
};

const badgeVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 20,
      duration: 0.6,
    },
  },
};

const cardVariants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 15,
      duration: 0.5,
    },
  },
};

export default function Component() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container px-4 mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          className="text-center mb-20"
        >
          <motion.div variants={badgeVariants}>
            <SectionsBadge>Nos Services</SectionsBadge>
          </motion.div>
          <motion.h2
            variants={badgeVariants}
            className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl"
          >
            Offres de Services Électriques
          </motion.h2>
          <motion.p
            variants={badgeVariants}
            className="mt-6 text-lg text-muted-foreground max-w-3xl mx-auto"
          >
            Des foyers résidentiels aux entreprises commerciales, nous
            fournissons des solutions énergétiques fiables, efficaces et
            durables.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-2  xl:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={cardVariants}>
              <Card className="group overflow-hidden border-0  bg-white shadow-lg transition-all duration-300 hover:shadow-xl lg:min-h-[600px]   flex flex-col">
                <div className="relative">
                  <div className="relative h-[300px] overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 transition-colors duration-300 group-hover:bg-primary/40" />
                  </div>
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 h-14 w-14 rounded-full bg-black text-white flex items-center justify-center text-xl font-bold shadow-lg">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                </div>
                <CardContent className="p-8 pt-10 items-center flex flex-col text-center flex-grow">
                  <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <Link
                    href="#learn-more"
                    className="inline-flex items-center text-sm font-semibold text-black hover:text-primary transition-colors group/link"
                  >
                    En savoir plus
                    <ChevronRight className="w-4 h-4 ml-1 transition-transform duration-200 group-hover/link:translate-x-1" />
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
