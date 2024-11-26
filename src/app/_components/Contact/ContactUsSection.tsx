"use client";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import { MapPinIcon, PhoneIcon, MailIcon, Facebook } from "lucide-react";
import { m as motion } from "framer-motion";
import { infos } from "@/constants";
import ContactUsForm from "./ContactUsForm";
import SectionsBadge from "@/components/SectionsBadge";

const contactInfos = [
  {
    icon: <MapPinIcon className="h-5 w-5 mr-4 text-primary" />,
    title: "Adresse",
    info: infos.address,
  },
  {
    icon: <PhoneIcon className="h-5 w-5 mr-4 text-primary" />,
    title: "Téléphone",
    info: infos.phone,
  },
  {
    icon: <MailIcon className="h-5 w-5 mr-4 text-primary" />,
    title: "Email",
    info: infos.email,
  },
  {
    icon: <Facebook className="h-5 w-5 mr-4 text-primary" />,
    title: "Facebook",
    info: infos.facebookName,
  },
];

const letterAnimation = {
  hidden: { opacity: 0, scale: 1.05, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.4,
      delay: i * 0.1,
    },
  }),
};

const ContactUsSection = () => {
  const title1 = "Illuminez Votre Message";
  const title2 = "Entrez en Contact";

  return (
    <section id="contact" className="container mx-auto py-16 px-4 sm:px-0">
      <div className="lg:flex gap-4 lg:space-x-10">
        <div className="lg:w-1/2 space-y-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={letterAnimation}
          >
            <SectionsBadge>Contactez-Nous</SectionsBadge>
          </motion.div>
          <motion.h1
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={letterAnimation}
            className="text-5xl font-bold mb-4"
          >
            {title1}
          </motion.h1>
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={letterAnimation}
            className="text-4xl font-semibold mb-6"
          >
            {title2}
          </motion.h2>
          <motion.p
            className="mb-8 text-muted-foreground"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={letterAnimation}
          >
            Vous avez des questions ou êtes prêt à commencer avec nos services
            d&pos;électricité ? Notre équipe est là pour vous aider ! Que vous
            recherchiez...
          </motion.p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {contactInfos.map((contact, index) => (
              <motion.div
                key={index}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
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
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true, margin: "-100px" }}
          className="lg:w-1/2 flex bg-gray-50 shadow px-4 flex-col justify-end py-14 rounded-md"
        >
          <ContactUsForm />
        </motion.div>
      </div>
    </section>
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
