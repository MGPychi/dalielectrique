import Image from "next/image";
import React from "react";
// import { m as motion } from "framer-motion";
import * as motion from "framer-motion/m";
import { MapPin, Clock, Phone } from "lucide-react";
import LocationImage from "../../../public/location1.png";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, staggerChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Location = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center  px-4 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src={LocationImage}
          layout="fill"
          objectFit="cover"
          alt="Location map background"
          loading="lazy"
          placeholder="blur"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView={"visible"}
        className="relative z-10 w-full max-w-7xl mx-auto bg-white/10 backdrop-blur-md rounded-2xl  p-8 lg:p-12 shadow-2xl"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.h1
              variants={itemVariants}
              className="text-4xl lg:text-5xl font-bold mb-6 text-white"
            >
              Where to find us?
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-gray-200 text-lg mb-8"
            >
              Located in the heart of innovation, our office is where ideas come
              to life. We are easily accessible and always ready to welcome you
              for a visit or collaboration.
            </motion.p>
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="flex items-center space-x-4 text-white">
                <MapPin className="w-6 h-6 text-primary" />
                <p>123 Tech Avenue, Innovation City, IC 54321</p>
              </div>
              <div className="flex items-center space-x-4 text-white">
                <Clock className="w-6 h-6 text-primary" />
                <p>Monday - Friday, 9:00 AM - 6:00 PM</p>
              </div>
              <div className="flex items-center space-x-4 text-white">
                <Phone className="w-6 h-6 text-primary" />
                <p>+1 (555) 123-4567</p>
              </div>
            </motion.div>
          </div>
          <motion.div variants={itemVariants} className="relative ">
            <Image
              src={LocationImage}
              width={800}
              height={350}
              alt="Our office"
              className="rounded-lg shadow-lg w-[800px] h-[350px]"
              loading="lazy"
              placeholder="blur"
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Location;
