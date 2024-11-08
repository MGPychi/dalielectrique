"use client";
import { selectReviewSchema } from "@/db/schema";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import React from "react";
import { m as motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { z } from "zod";
interface Props {
  reviews: z.infer<typeof selectReviewSchema>[];
}
const ReviewsCarousel = ({ reviews }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length
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
    <div className="relative    lg:w-1/2  flex flex-col md:flex-row">
      <div className="w-full">
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
            <Card className="bg-gray-800 w-full max-w-screen-sm  text-white shadow-lg rounded-lg p-2 md:p-8 border-none">
              <CardHeader className="px-0 pt-0"></CardHeader>
              <CardContent className="px-0 min-h-[300px]  md:min-h-[250px]  pb-0">
                <div className="md:text-lg min-h-40">
                  {reviews[currentIndex].body.split(" ").slice(0, 40).join(" ")}
                  ...
                </div>
                <div className="flex items-center mt-6">
                  <div className="space-2">
                    <h4 className="font-semibold">
                      {reviews[currentIndex].client}
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
  );
};

export default ReviewsCarousel;
