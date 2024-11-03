import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getAllQandA } from "@/app/data/qna-data";
import Link from "next/link";

async function QandA() {
  const data = await getAllQandA();

  return (
    <div className="container mx-auto min-h-[70vh] px-4 py-16">
      <div className="grid lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div>
            <Badge className="mb-6 px-4 py-2 font-bold bg-primary/10 text-primary rounded-md">
              FAQ&apos;S
            </Badge>
          </div>

          <h2 className="text-4xl font-bold">
            Frequently Best Asked Question?
          </h2>

          <p className="text-gray-600 text-lg">
            That&apos;s why we&apos;ve compiled a list of frequently asked
            questions to help make the process as smooth as possible for you.
          </p>

          <div>
            <Link href={"#contact"}>
              <Button
                className="bg-primary/90 hover:bg-primary text-white rounded-full px-6"
                size="lg"
              >
                Have Any Questions
                <span className="ml-2">→</span>
              </Button>
            </Link>
          </div>
        </div>

        <div className="space-y-4">
          <Accordion type="single" collapsible className="w-full">
            {data.map((item, index) => (
              <AccordionItem
                key={index}
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
                <AccordionContent className="px-6 pb-4 data-[state=open]:text-white/90">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}

export default QandA;
