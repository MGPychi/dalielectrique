"use client";
import { ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { m as motion } from "framer-motion";

import { useScroll, useSpring } from "framer-motion";
const ScrollUp = () => {
  const [visible, setVisible] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    restSpeed: 100,
  });
  const goUp = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };
  const handleScroll = () => {
    if (window.scrollY > 200) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      <motion.div
        className="h-1  fixed top-0 left-0 right-0 z-50 bg-primary origin-left"
        style={{ scaleX: scaleX }}
      />
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0 }}
            exit={{ opacity: 0, y: 60, scale: [1.2, 0.5] }}
            animate={{ opacity: 1, y: 0, scale: [1.9, 1] }}
            onClick={goUp}
            className="rounded-full ring-2 hover:ring-primary ring-white w-14 h-14  flex justify-center items-center  bg-primary fixed bottom-10 right-10 text-white cursor-pointer"
          >
            <ChevronUp className="w-8 h-8" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
export default ScrollUp;
