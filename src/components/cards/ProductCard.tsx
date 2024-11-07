import * as motion from "framer-motion/m";
import { Card, CardContent } from "@/components/ui/card";
import { getProducts } from "@/app/data/products-data";
import DefaultImage from "../../../public/hero1.webp";
import Image from "next/image";
import React from "react";
import Link from "next/link";
interface Props {
  product: Awaited<ReturnType<typeof getProducts>>["data"][0];
}

const ProductCard = ({ product }: Props) => {
  return (
    <Card className="overflow-hidden h-full flex flex-col group">
      <CardContent className="p-6 flex flex-col h-full">
        <div className="relative h-80 mb-4 rounded-md overflow-hidden">
          <Image
            src={product.images[0]?.url ?? DefaultImage}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <motion.div
            className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          >
            {/* <Badge className="bg-primary text-primary-foreground text-lg py-2 px-4">
                        {product.category}
                      </Badge> */}
          </motion.div>
        </div>
        <h3 className="font-semibold text-2xl mb-3 text-gray-800 group-hover:text-primary transition-colors duration-300">
          <Link href={`products/${product.slug}`}>
            {product.name.split(" ").slice(0, 10).join(" ")}
          </Link>
        </h3>
        <p className="text-gray-600 leading-relaxed flex-grow">
          {product.description.slice(0, 100)}...
        </p>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
