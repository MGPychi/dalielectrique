"use client";
import Image from "next/image";
import React, { useRef } from "react";
import { m as motion, useInView } from "framer-motion";

const titleVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.4 } },
};

const Location = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false,margin:"-250px 0px -100px 0px" })

  return (
    <section
      ref={ref}
      className="flex flex-col items-center lg:items-start px-4 gap-4 lg:flex-row mx-auto container justify-between py-8"
    >
      <div className="w-full lg:w-1/2">
        <motion.h1
          variants={titleVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-4xl lg:text-5xl font-bold py-4 pb-6 lg:py-8 lg:pb-10"
        >
          Where to find us?
        </motion.h1>
        <motion.p
          variants={textVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-gray-800 text-base lg:text-xl"
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore illo
          eius ducimus eligendi vero maxime dignissimos iure error? Architecto
          quia voluptatibus quisquam beatae provident quam eaque, unde
          voluptatem voluptate dignissimos!
        </motion.p>
      </div>
      <motion.div
        variants={imageVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <Image
          src={"/location.png"}
          width={550}
          height={450}
          alt="location image"
        />
      </motion.div>
    </section>
  );
};

export default Location;
