"use client";

import { useState } from "react";
import { m as motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

const testimonials = [
  {
    name: "Shanavas MA",
    service: "OUTLET AND SWITCH INSTALLATION",
    rating: 5,
    review:
      "I recently hired Zak as an electrician, and I couldnt be happier with his service. He completed the electrical work for our entire basement and placed pot lights surrounding the exterior of our house. Zak is highly skilled and completed the job efficiently and effectively. He was punctual, professional, and his attention to detail was impressive. I felt confident in his expertise, and he went above and beyond to ensure customer satisfaction. I highly recommend Zak for any electrical needs.",
  },
  {
    name: "Dipali Sharma",
    service: "POT LIGHT INSTALLATION",
    rating: 5,
    review:
      "We recently hired ZAK electrical for pot light installation in our living room. They did an exceptional job. Arrived on time, were very professional, and completed the work efficiently. The end result looks fantastic! Highly recommend their services for any electrical work you may need.",
  },
  {
    name: "John Doe",
    service: "ELECTRICAL PANEL UPGRADE",
    rating: 5,
    review:
      "I had my electrical panel upgraded by this company and I'm thoroughly impressed. The technicians were knowledgeable, courteous, and explained every step of the process. They completed the job in a timely manner and left the work area spotless. I feel much safer knowing my home's electrical system is up to date. Excellent service!",
  },
  // Add more testimonials as needed
];

export default function Component() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  const sliderVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 130 : -130,
      opacity: 0,
      scale: 0.95,
    }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (direction: number) => ({
      x: direction > 0 ? -130 : 130,
      opacity: 0,
      scale: 0.95,
    }),
  };

  const sliderTransition = { duration: 0.35 };

  return (
    <section className=" py-32 items-center flex   px-4 bg-gray-800    text-white">
      <div className="container flex flex-col lg:flex-row justify-between  w-full   mx-auto">
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView={"visible"}
          transition={{ duration: 0.5 }}
          className="text-left mb-16"
        >
          <Badge className="mb-6 px-4 py-2 font-bold bg-white text-primary rounded-md">
            Testimonials
          </Badge>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            {"Powerful Praise".split(" ").map((word, idx) => (
              <motion.span
                key={`testimonial_word_${idx}`}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx }}
                className="inline-block mr-2"
              >
                {word}
              </motion.span>
            ))}
            <br />
            {"Hear from Our Customers".split(" ").map((word, idx) => (
              <motion.span
                key={`testimonial_word_2_${idx}`}
                variants={itemVariants}
                initial={"hidden"}
                whileInView={"visible"}
                transition={{ delay: 0.1 * (idx + 2) }}
                className="inline-block mr-2"
              >
                {word}
              </motion.span>
            ))}
          </h2>
          <motion.p
            initial={"hidden"}
            whileInView={"visible"}
            className="text-gray-400 max-w-2xl"
          >
            We take pride in providing top-notch electricity services that
            exceed our customers expectations.
          </motion.p>
        </motion.div>

        <div className="relative   lg:w-1/2  flex flex-col md:flex-row">
          <div className="">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={sliderVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={sliderTransition}
              >
                <Card className="bg-gray-800  text-white shadow-lg rounded-lg p-8 border-none">
                  <CardHeader className="px-0 pt-0"></CardHeader>
                  <CardContent className="px-0  md:min-h-[250px]  pb-0">
                    <div className="text-lg">
                      {testimonials[currentIndex].review
                        .split(" ")
                        .slice(0, 45)
                        .join(" ")}
                    </div>
                    <div className="flex items-center mt-6">
                      <div className="space-2">
                        <h4 className="font-semibold">
                          {testimonials[currentIndex].name}
                        </h4>
                        <p className="text-gray-400">Happy Client</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-end lg:justify-start  mt-6 space-x-4">
              <Button
                variant="outline"
                size="icon"
                onClick={prevTestimonial}
                className="bg-transparent text-white border-white hover:bg-white hover:text-gray-900 transition-colors duration-300"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={nextTestimonial}
                className="bg-transparent text-white border-white hover:bg-white hover:text-gray-900 transition-colors duration-300"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
