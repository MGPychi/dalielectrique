"use client"

import {m as  motion, useInView } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, DollarSign, Heart } from "lucide-react"
import { useRef } from "react"

const features = [
  {
    icon: Award,
    title: "Licensed Electricians",
    description: "Our team consists of highly skilled, certified engineers and technicians, excelling in a wide range of electrical services. We prioritize continuous safety training to stay updated on the latest technologies and ensure exceptional attention to detail. When we take on a project, it's completed with the highest level of professionalism.",
  },
  {
    icon: DollarSign,
    title: "Upfront Pricing",
    description: "Transparency is key. We provide clear, upfront pricing for every job, so there are no surprises. You'll know the cost before we begin, and with our money-back guarantee, we ensure your complete satisfaction.",
  },
  {
    icon: Heart,
    title: "Friendly and Knowledgeable",
    description: "We’re a family-owned business, and we treat every customer with care and respect. Our team is approachable, knowledgeable, and committed to offering the best service. We continuously train our staff to ensure they deliver outstanding results every time.",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 ,scale:0.95},
  visible: {
    y: 0,
    opacity: 1,
    scale:1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
}

export default function WhyChooseUs() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: false,margin:"-250px 0px -100px 0px" })

  return (
    <section ref={ref} className="py-2  px-4 ">
      <div className="container mx-auto ">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants}>
            <Badge variant="secondary" className="mb-4 text-sm font-semibold">
              WHY CHOOSE US
            </Badge>
          </motion.div>
          <motion.h2 variants={itemVariants} className="text-4xl font-bold mb-6 text-gray-800">
            What Makes Us Stand Out
          </motion.h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full flex items-center text-center flex-col overflow-hidden group hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="relative flex flex-col items-center justify-center">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl mb-2">{feature.title}</CardTitle>
                  <div className="absolute top-4 right-4 w-20 h-20 bg-red-100 rounded-full -z-10 group-hover:scale-150 transition-transform duration-500"></div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mt-16 text-center"
        >
        </motion.div>
      </div>
    </section>
  )
}
