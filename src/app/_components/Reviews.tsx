"use client";

import { useState } from "react";
import { m as motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    name: "Shanavas MA",
    service: "OUTLET AND SWITCH INSTALLATION",
    rating: 5,
    review:
      "I recently hired Zak as an electrician, and I couldn't be happier with his service. He completed the electrical work for our entire basement and placed pot lights surrounding the exterior of our house. Zak is highly skilled and completed the job efficiently and effectively. He was punctual, professional, and his attention to detail was impressive. I felt confident in his expertise, and he went above and beyond to ensure customer satisfaction. I highly recommend Zak for any electrical needs.",
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

export default function SingleTestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (idx:number) => {
    if (idx >= 0 && idx < testimonials.length) {
      setDirection(idx > currentIndex ? 1 : -1);
      setCurrentIndex(idx);
    }
  };

  const sliderVariants = {
    enter: (direction:number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.95,
    }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (direction:number) => ({
      x: direction > 0 ? "-100%" : "100%",
      opacity: 0,
      scale: 0.95,
    }),
  };

  const sliderTransition = { duration: 0.35 };

  return (
    <section className="py-6 px-4 text-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-6 text-white">
            {"What Our Clients Say".split(" ").map((word, idx) => (
              <motion.span
                key={`testimonial_word_${idx}`}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx }}
                className="inline-block mr-1"
              >
                {word}
              </motion.span>
            ))}
          </h2>
        </motion.div>

        <div className="relative">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={sliderVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={sliderTransition}
              // drag="x"
              // dragConstraints={{ left: 0, right: 0 }}
              // dragElastic={0.5}
              // onDragEnd={(_, dragInfo) => {
              //   if (dragInfo.offset.x < -50) nextTestimonial();
              //   if (dragInfo.offset.x > 50) prevTestimonial();
              // }}
            >
              <Card className="bg-white text-black shadow-lg rounded-lg h-80 lg:h-72 p-4">
                <CardHeader className="px-6 pt-6">
                  <CardTitle className="flex justify-between items-center text-lg font-semibold">
                    <span>{testimonials[currentIndex].name}</span>
                    <div className="flex space-x-1">
                      {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </CardTitle>
                  <Badge variant="destructive" className="mt-2 max-w-64 cursor-pointer text-white">
                    {testimonials[currentIndex].service}
                  </Badge>
                </CardHeader>
                <CardContent className="px-6 pb-6">
                  <p className="text-gray-700 text-sm">
                    {testimonials[currentIndex].review.slice(0, 800)}...
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          <div className="space-x-2 flex w-full justify-center mt-5">
            {testimonials.map((_, idx) => (
              <div
                key={`testimonial_button_${idx}`}
                onClick={() => goToTestimonial(idx)}
                className={`${idx === currentIndex ? "bg-white" : "bg-gray-300"} ring-1 cursor-pointer ring-white w-2 h-2 rounded-full`}
              />
            ))}
          </div>

          <div className="flex justify-center mt-6 space-x-4">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="bg-transparent text-gray-600 hover:bg-primary hover:text-white transition-colors duration-300"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="bg-transparent text-gray-600 hover:bg-primary hover:text-white transition-colors duration-300"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
