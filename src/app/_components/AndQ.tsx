"use client";

import { useState } from "react";
import { m as motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const content = [
  {
    question: "How Do I Sign Up For Your Electricity Services?",
    answer:
      "Whether you're wondering about our pricing plans, process installation, or sustainability initiatives.",
  },
  {
    question: "What Types Of Electricity Plans Do You Offer?",
    answer:
      "We offer a variety of plans including fixed-rate, variable-rate, and renewable energy options to suit your needs.",
  },
  {
    question: "What Are Your Billing And Payment Options?",
    answer:
      "We provide flexible payment options including automatic payments, online billing, and various payment methods.",
  },
  {
    question: "How Can I Track My Energy Usage With Your Services?",
    answer:
      "Our smart metering system allows you to monitor your usage in real-time through our mobile app and web portal.",
  },
];

export default function AandQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <div className="container mx-auto min-h-[70vh] px-4 py-16 max-w-7xl">
      <div className="grid lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="inline-block px-4 py-1 bg-red-50 rounded-full">
            <span className="bg-primary font-medium">FAQ'S</span>
          </div>
          <h2 className="text-4xl font-bold">
            Frequently Best Asked Question?
          </h2>
          <p className="text-gray-600 text-lg">
            That's why we've compiled a list of frequently asked questions to
            help make the process as smooth as possible for you.
          </p>
          <Button
            className="bg-primary/90 hover:bg-primary  text-white rounded-full px-6"
            size="lg"
          >
            Have Any Questions
            <span className="ml-2">→</span>
          </Button>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <AnimatePresence>
            {content.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <button
                  onClick={() =>
                    setActiveIndex(activeIndex === index ? null : index)
                  }
                  className={`w-full text-left p-6 rounded-2xl transition-colors duration-200 ${
                    activeIndex === index
                      ? "bg-primary text-white"
                      : "bg-gray-50 hover:bg-gray-100"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold pr-8">{item.question}</h3>
                    <motion.div
                      animate={{ rotate: activeIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown
                        className={`w-5 h-5 ${
                          activeIndex === index ? "text-white" : "text-gray-500"
                        }`}
                      />
                    </motion.div>
                  </div>
                  <AnimatePresence mode="sync">
                    {activeIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "backIn" }}
                      >
                        <p
                          className={`mt-4 ${
                            activeIndex === index
                              ? "text-white/90"
                              : "text-gray-600"
                          }`}
                        >
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
