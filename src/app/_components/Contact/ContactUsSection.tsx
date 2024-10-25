"use client";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import { MapPinIcon, PhoneIcon, MailIcon, LinkedinIcon } from "lucide-react";
import ContactUsForm from "./ContactUsForm";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const contactInfos = [
  {
    icon: <MapPinIcon className="h-5 w-5 mr-4 text-primary" />,
    title: "Address",
    info: "London Eye, London",
  },
  {
    icon: <PhoneIcon className="h-5 w-5 mr-4 text-primary" />,
    title: "Phone",
    info: "+44 20 7946 0958",
  },
  {
    icon: <MailIcon className="h-5 w-5 mr-4 text-primary" />,
    title: "Email",
    info: "info@fleexstudio.com",
  },
  {
    icon: <LinkedinIcon className="h-5 w-5 mr-4 text-primary" />,
    title: "LinkedIn",
    info: "Fleexstudio",
  },
];
const letterAnimation = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
    },
  }),
};

const ContactUsSection = () => {
  const title1 = "Illuminate Your Message";
  const title2 = "Get in Contact";

  return (
    <div className="container mx-auto py-16">
      <div className="lg:flex gap-4  lg:space-x-10">
        <div className="lg:w-1/2 space-y-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={letterAnimation}
          >
            <Badge className="mb-6 px-4 py-2 font-bold bg-primary/10 text-primary rounded-md">
              Contact Us
            </Badge>
          </motion.div>
          <h1 className="text-5xl font-bold mb-4">
            {title1.split("").map((letter, index) => (
              <motion.span
                key={index}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={letterAnimation}
                className="inline-block"
              >
                {letter}
              </motion.span>
            ))}
          </h1>
          <motion.h2 className="text-4xl font-semibold mb-6">
            {title2.split("").map((letter, index) => (
              <motion.span
                key={index}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={letterAnimation}
                className="inline-block"
              >
                {letter}
              </motion.span>
            ))}
          </motion.h2>
          <motion.p
            className="mb-8 text-muted-foreground"
            initial="hidden"
            animate="visible"
            variants={letterAnimation}
          >
            Have questions or ready to get started with our electricity
            services? Our team is here to help! Whether you are seeking...
          </motion.p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {contactInfos.map((contact, index) => (
              <motion.div
                key={index}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={letterAnimation}
              >
                <ContactUsInfo
                  icon={contact.icon}
                  title={contact.title}
                  info={contact.info}
                />
              </motion.div>
            ))}
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:w-1/2 flex bg-gray-50  shadow  px-4 flex-col justify-end py-14 rounded-md "
        >
          <ContactUsForm />
        </motion.div>
      </div>
    </div>
  );
};

export default ContactUsSection;

interface ContactUsInfoProps {
  icon: React.ReactNode;
  title: string;
  info: string;
}

const ContactUsInfo: React.FC<ContactUsInfoProps> = ({ icon, title, info }) => {
  return (
    <Card>
      <CardContent className="flex items-center p-4">
        {icon}
        <div>
          <h3 className="font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground">{info}</p>
        </div>
      </CardContent>
    </Card>
  );
};
