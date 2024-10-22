"use client"
import { motion, useInView } from "framer-motion"
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Home, Building2, Factory } from "lucide-react"
import { useRef } from "react"

const services = [
  {
    icon: Home,
    title: "Residential",
    description: "Your trusted electricians for all your home electrical needs. From installations to repairs, We've got you covered. Our team is dedicated to providing top-quality services that stand out.",
    items: ["House Wiring", "Installation", "Service", "Upgrades", "Smart Home", "Rough-Ins", "Emergency Lighting", "Panel Upgrades"],
  },
  {
    icon: Building2,
    title: "Commercial",
    description: "Running a business is challenging. Leave your electrical concerns to our experienced professionals so you can focus on what truly matters – your success and growth. We provide top-quality services that stand out.",
    items: ["Lighting Upgrades", "Emergency Lighting", "Low Voltage Switchings", "120v/347 Volt Lighting", "Rough-Ins", "Panel Upgrades"],
  },
  {
    icon: Factory,
    title: "Industrial",
    description: "Count on our licensed electricians for on-site industrial electrical services prioritizing safety and efficiency. We bring knowledge and experience to your facility, ensuring smooth operations.",
    items: ["Safety Devices", "Smoke Detectors", "Exit / Emergency Signs", "Exterior Lighting"],
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

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
}

export default function ProfessionalServicesSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-100px" }) // Trigger animation when in view

  return (
    <section id="services" className="py-24 px-4 bg-gradient-to-b from-background to-secondary/10" ref={ref}>
      <div className="container mx-auto">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants}>
          <motion.h2 variants={itemVariants} className="text-5xl font-bold mb-6 bg-clip-text  bg-gradient-to-r text-primary">
              OUR SERVICES
              </motion.h2>
          </motion.div>
          <motion.h2 variants={itemVariants} className="text-4xl font-medium mb-6 bg-clip-text  bg-gradient-to-r text-primary">
            Delivering Excellent Services Through Our Expert Team
          </motion.h2>
          <motion.p variants={itemVariants} className="text-muted-foreground max-w-2xl mx-auto text-lg">
            At our core, excellence defines us. Our exceptionally skilled and professional team is dedicated to providing top-quality services that stand out. Each team member brings a wealth of expertise to every project, ensuring your complete satisfaction.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full flex flex-col overflow-hidden group hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="relative flex items-center">
                  <div className="w-16 h-16 bg-primary  rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl mb-2 py-1">{service.title}</CardTitle>
                  <CardDescription className="text-sm text-center py-1">{service.description}</CardDescription>
                  <div className="absolute top-4 right-4 w-20 h-20 bg-primary/10 rounded-full -z-10 group-hover:scale-150 transition-transform duration-500"></div>
                </CardHeader>
                <CardFooter />
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
