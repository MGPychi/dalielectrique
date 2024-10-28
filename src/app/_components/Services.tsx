"use client"; // Ensure to include this line

import { m as motion, useInView } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Home, Building2, Factory, HomeIcon } from "lucide-react";
import {   useRef } from "react";
import { Badge } from "@/components/ui/badge";
import Hero1 from "../../../public/hero1.webp";
import { StaticImageData } from "next/image";

const services = [
  {
    icon: Home,
    title: "Residential",
    description:
      "Your trusted electricians for all your home electrical needs...",
    items: [
      "House Wiring",
      "Installation",
      "Service",
      "Upgrades",
      "Smart Home",
      "Rough-Ins",
      "Emergency Lighting",
      "Panel Upgrades",
    ],
    image: Hero1,
  },
  {
    icon: Building2,
    title: "Commercial",
    description: "Running a business is challenging...",
    items: [
      "Lighting Upgrades",
      "Emergency Lighting",
      "Low Voltage Switchings",
      "120v/347 Volt Lighting",
      "Rough-Ins",
      "Panel Upgrades",
    ],
    image: Hero1,
  },
  {
    icon: Factory,
    title: "Industrial",
    description:
      "Count on our licensed electricians for on-site industrial electrical services...",

    items: [
      "Safety Devices",
      "Smoke Detectors",
      "Exit / Emergency Signs",
      "Exterior Lighting",
    ],
    image: Hero1,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

export default function ProfessionalServicesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, {
    once: false,
    margin: "-250px 0px -100px 0px",
  });

  return (
    <section
      id="services"
      className="py-24 px-4 bg-gradient-to-b from-background to-secondary/10"
      ref={ref}
    >
      <div className="container mx-auto">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants} className="">
            <Badge className="mb-6 px-4 py-2 font-bold bg-primary/10 text-primary rounded-md">
              Our Services
            </Badge>
          </motion.div>
          <motion.h2
            variants={itemVariants}
            className="text-4xl font-medium mb-6 bg-clip-text bg-gradient-to-r text-primary"
          >
            Delivering Excellent Services Through Our Expert Team
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-muted-foreground max-w-2xl mx-auto text-lg"
          >
            At our core, excellence defines us and our services. We are
            committed to providing the best electrical services to our clients.
            Our team of expert electricians is always ready to deliver excellent
            services to you.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={itemVariants}>
              <ServiceItem
                image={service.image}
                title={service.title}
                description={service.description}
                Icon={service.icon}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
interface ServiceItemProps {
  Icon: typeof HomeIcon;
  title: string;
  description: string;
  image: StaticImageData;
}
const ServiceItem = ({ description, Icon, image, title }: ServiceItemProps) => {
  console.log(image.src);
  return (
    <Card className="h-full group relative flex flex-col overflow-hidden group hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="relative flex items-center">
        {/* <div className="w-full h-[300px] relative ">
          <Image alt={title} src={image} fill  className="rounded-md" />
        </div> */}
        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-2xl mb-2 py-1">{title}</CardTitle>
        <CardDescription className="text-sm text-center py-1">
          {description}
        </CardDescription>
        <div className="absolute top-4 right-4 w-20 h-20 bg-primary/10 rounded-full -z-10 group-hover:scale-150 transition-transform duration-500"></div>
      </CardHeader>
      <CardFooter />
    </Card>
  );
};
