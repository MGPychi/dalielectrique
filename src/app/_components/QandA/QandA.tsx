import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getAllQandA } from "@/app/data/qna-data";
import Link from "next/link";
import SectionsBadge from "@/components/SectionsBadge";
import * as motion from "framer-motion/m";

const anearingAnimation = {
  hidden: { opacity: 0, x: -100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
    },
  },
};

async function QandA() {
  const data = await getAllQandA();

  return (
    <section
      id="q-and-a"
      className="container  mx-auto min-h-[70vh] px-4 py-16"
    >
      <div className="grid lg:grid-cols-2 gap-12">
        <div className="space-y-9">
          <motion.div
            variants={anearingAnimation}
            initial={"hidden"}
            viewport={{ once: true, margin: "-100px" }}
            whileInView={"visible"}
          >
            <SectionsBadge>FAQ</SectionsBadge>
          </motion.div>

          <motion.h2
            variants={anearingAnimation}
            whileInView={"visible"}
            viewport={{ once: true, margin: "-100px" }}
            initial={"hidden"}
            className="text-4xl font-bold"
          >
            Questions Fréquemment Posées
          </motion.h2>

          <motion.p
            variants={anearingAnimation}
            whileInView={"visible"}
            initial={"hidden"}
            viewport={{ once: true, margin: "-100px" }}
            className="text-gray-600 text-lg"
          >
            C&pos;est pourquoi nous avons compilé une liste de questions
            fréquemment posées pour vous aider à rendre le processus aussi
            fluide que possible.
          </motion.p>

          <motion.div
            className=""
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 50 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <Link href={"#contact"}>
              <Button
                className="bg-primary/90 hover:bg-primary text-white rounded-full px-6"
                size="lg"
              >
                Vous avez des questions ?<span className="ml-2">→</span>
              </Button>
            </Link>
          </motion.div>
        </div>

        <div className="space-y-4">
          <Accordion type="single" collapsible className="w-full">
            {data.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="border rounded-2xl mb-4 data-[state=open]:bg-primary data-[state=open]:text-white"
                >
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <div className="flex items-center justify-between w-full">
                      <h3 className="font-semibold text-left pr-8">
                        {item.question}
                      </h3>
                    </div>
                  </AccordionTrigger>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  >
                    <AccordionContent className="px-6 pb-4 data-[state=open]:text-white/90">
                      {item.answer}
                    </AccordionContent>
                  </motion.div>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
export default QandA;
