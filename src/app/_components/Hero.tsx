"use client";
import React, { useEffect, useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const [runAnimation, setRunAnimation] = useState(false);
  useEffect(() => {
    if (!runAnimation) setRunAnimation(true);
  }, []);
  const heroAnimation = useSpring({
    from: {
      opacity: 1,
      transform: "translateY(50px)",
    },
    to: {
      opacity: 1,
      transform: "translateY(0)",
    },
  });

  return (
    <div className="container mx-auto flex items-center py-16">
      <animated.div style={{ ...heroAnimation }} className="w-1/2 pr-8">
        <h1 className="text-5xl font-bold mb-4">
          YOUR<span className="text-red-600">ELECTRIC</span>
        </h1>
        <h2 className="text-3xl font-semibold mb-4">
          Trusted Local Electricians
          <br />
          Serving Your Area
        </h2>
        <p className="text-gray-600 mb-8">
          Fast, expert electrical services for homes, businesses, and
          industries.
        </p>
        <Button className="bg-red-600 hover:bg-red-700 text-white text-lg px-8 py-3">
          Get a Consultation
        </Button>
      </animated.div>
      <animated.div style={{ ...heroAnimation }} className="w-1/2">
        <img
          src="/placeholder.svg?height=400&width=600"
          alt="Electrician working"
          className="rounded-lg shadow-xl"
        />
      </animated.div>
    </div>
  );
};

export default Hero;
