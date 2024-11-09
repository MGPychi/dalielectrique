"use client";

import React from "react";
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  ExternalLink,
  ChevronRight,
  Building2,
} from "lucide-react";
import { m as motion } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import LocationImage from "../../../public/location1.png";
import { infos } from "@/constants";
import SectionsBadge from "@/components/SectionsBadge";
import { Badge } from "@/components/ui/badge";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function Location() {
  const [isOpen, setIsOpen] = React.useState(true);
  const currentHour = new Date().getHours();

  React.useEffect(() => {
    setIsOpen(currentHour >= 9 && currentHour < 18 && new Date());
  }, [currentHour]);

  const locationInfos = [
    {
      icon: Building2,
      title: "Address",
      content: infos.address,
      action: "Get Directions",
    },
    {
      icon: Clock,
      title: "Business Hours",
      content: infos.openingHours,
      subContent: "Weekend: Closed",
    },
    {
      icon: Phone,
      title: "Contact Numbers",
      content: infos.phone,
    },
    {
      icon: Mail,
      title: "Email Addresses",
      content: infos.email,
    },
  ];

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-16 lg:py-24"
    >
      <motion.div
        className="absolute inset-0 opacity-10"
        whileInView={{
          backgroundPosition: ["0px 0px", "40px 40px"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          backgroundImage:
            "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative container mx-auto px-4">
        <motion.div className="text-center mb-16" variants={fadeInUp}>
          <SectionsBadge>Our Location</SectionsBadge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
            Where To find us <span className="text-blue-400">Happens</span>
          </h1>
          <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto">
            we would be happy to resive you an hour locaiton plese if you want
            anything give us a visit
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-start max-w-7xl mx-auto">
          <motion.div variants={fadeInUp} className="h-full">
            <Card className="bg-white/5 backdrop-blur-xl border-slate-700/50 shadow-2xl h-full">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-semibold text-white">
                    Contact Information
                  </h2>
                  <motion.div
                    whileInView={{
                      scale: isOpen ? [1, 1.1, 1] : 1,
                    }}
                    transition={{
                      duration: 0.5,
                      times: [0, 0.5, 1],
                    }}
                  >
                    <Badge
                      variant="outline"
                      className={`${
                        isOpen
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-400/30"
                          : "bg-rose-500/10 text-rose-400 border-rose-400/30"
                      }`}
                    >
                      {isOpen ? "Open Now" : "Closed"}
                    </Badge>
                  </motion.div>
                </div>

                <motion.div className="space-y-8" variants={staggerContainer}>
                  {locationInfos.map((item, index) => (
                    <motion.div
                      key={index}
                      variants={fadeInUp}
                      className="flex items-start space-x-4 text-slate-300 group"
                    >
                      <div className="p-3 rounded-xl bg-white/5">
                        <item.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-medium text-white mb-1">
                          {item.title}
                        </p>
                        <p className="leading-relaxed">{item.content}</p>
                        {item.subContent && (
                          <p className="text-slate-400 text-sm mt-1">
                            {item.subContent}
                          </p>
                        )}
                        {item.action && (
                          <motion.div className="mt-2">
                            <Button
                              variant="link"
                              className="bg-primary/5 font-medium"
                              onClick={() =>
                                window.open(
                                  `https://www.google.com/maps/place/${encodeURIComponent(
                                    infos.googleAddress
                                  )}`,
                                  "_blank"
                                )
                              }
                            >
                              {item.action}
                              <ExternalLink className="w-4 h-4 ml-1" />
                            </Button>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={fadeInUp} className="h-full">
            <Card className="bg-white/5  flex flex-col  backdrop-blur-xl border-slate-700/50 overflow-hidden shadow-2xl h-full">
              <CardContent className="p-0  !flex-grow">
                <div className="relative bg-white h-full w-full ">
                  <Image
                    src={LocationImage}
                    alt="Office location map"
                    className="w-full h-full object-cover"
                    width={800}
                    height={600}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
                  <motion.div
                    className="absolute bottom-6 left-6 right-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/10">
                      <div className="flex items-center space-x-3 text-white">
                        <MapPin className="w-5 h-5 text-blue-400" />
                        <p className="text-sm">{infos.address}</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </CardContent>
              <CardFooter className="p-6 ">
                <motion.div className="w-full ">
                  <Button
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-300"
                    onClick={() =>
                      window.open(
                        `https://www.google.com/maps/place/${encodeURIComponent(
                          infos.googleAddress
                        )}`,
                        "_blank"
                      )
                    }
                  >
                    Open in Google Maps
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </motion.div>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
