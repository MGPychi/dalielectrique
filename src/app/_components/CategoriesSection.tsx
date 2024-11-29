import Link from "next/link";
import * as motion from "framer-motion/m";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getAllCategories } from "../data/categories-data";
import CategoryCard from "@/components/cards/CategoryCard";

export default async function CategoriesSection() {
  const categories = await getAllCategories();

  return (
    <section className="py-16  bg-gradient-to-b from-background to-background/50 overflow-hidden">
      <div className="container  mx-auto px-4 md:px-6">
        <div className="space-y-6 text-center">
          <Badge variant="outline" className="px-3 py-1 text-sm">
            Catégories Sélectionnées
          </Badge>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Explorez Nos Catégories
          </h2>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Découvrez nos différentes catégories de produits soigneusement
            sélectionnées. Chaque catégorie offre une gamme unique pour répondre
            à tous vos besoins.
          </p>
        </div>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </motion.div>
        <div className="flex justify-center mt-12">
          <Link href="/categories" passHref>
            <Button size="lg" className="font-semibold">
              Voir Toutes les Product
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};
