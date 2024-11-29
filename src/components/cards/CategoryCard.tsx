import * as motion from "framer-motion/m";
import { Card, CardContent } from "@/components/ui/card";
import DefaultImage from "../../../public/hero1.webp";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { getCategories } from "@/app/data/categories-data";
import { Button } from "../ui/button";
interface Props {
  category: Awaited<ReturnType<typeof getCategories>>["data"][0];
}

const CategoryCard = ({ category }: Props) => {
  return (
    <Card className="overflow-hidden h-full flex flex-col group">
      <CardContent className="p-6 flex flex-col h-full">
        <div className="relative h-80 mb-4 rounded-md overflow-hidden">
          <Image
            src={category.imageUrl ?? DefaultImage}
            alt={category.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <motion.div
            className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          >
            {/* <Badge className="bg-primary text-primary-foreground text-lg py-2 px-4">
                        {category.category}
                      </Badge> */}
          </motion.div>
        </div>
        <h3 className="font-semibold text-2xl mb-3 text-gray-800 group-hover:text-primary transition-colors duration-300">
          <Link href={`products?category=${category.slug}`}>
            {category.name.split(" ").slice(0, 10).join(" ")}
          </Link>
        </h3>
        <p className="text-gray-600 leading-relaxed flex-grow">
          {category.description.slice(0, 100)}...
        </p>
        <div className="py-2" />
        <Link className="w-full" href={`/products?category=${category.slug}`}>
          <Button className="w-full">Visit</Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
