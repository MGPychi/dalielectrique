import { getAllFeaturedActiveProducts } from "../data/products-data";
import Link from "next/link";
import * as motion from "framer-motion/m";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/cards/ProductCard";
import SectionsBadge from "@/components/SectionsBadge";

export default async function VitrineProduitsAnimée() {
  const products = await getAllFeaturedActiveProducts();
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SectionsBadge>Produits Sélectionnés</SectionsBadge>
        </motion.div>
        <motion.h2
          className="text-4xl font-bold text-center mb-6 text-gray-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Produits Vedettes
        </motion.h2>
        <motion.p
          className="text-lg text-center text-gray-600 mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Découvrez notre sélection de produits vedettes soigneusement choisis
          pour répondre à vos besoins avec qualité et efficacité. Ces produits
          incarnent le meilleur de notre offre, alliant innovation et
          performance.
        </motion.p>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
        >
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              transition={{ delay: 0.1 * index }}
            >
              <ProductCard key={product.id} product={product} />
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          className="flex justify-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Link href="/products" passHref>
            <Button className="flex items-center text-lg" size="lg">
              Voir Tous les Produits <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0, scale: 0.95 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};
