import * as motion from "framer-motion/m";
import { Badge } from "@/components/ui/badge";
import ReviewsCarousel from "./ReviewsCarousel";
import { getAllReviews } from "@/app/data/reviews-data";

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
};

export default async function Avis() {
  const reviews = await getAllReviews();
  return (
    <section className="py-32 items-center flex px-4 bg-gray-800 text-white">
      <div className="container flex flex-col lg:flex-row justify-between w-full mx-auto">
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView={"visible"}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-left mb-16"
        >
          <Badge className="mb-6  px-4 py-2 font-bold bg-white text-primary rounded-full">
            Témoignages
          </Badge>
          <div className="py-4" />

          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            {"Éloges Puissants".split(" ").map((word, idx) => (
              <motion.span
                key={`testimonial_word_${idx}`}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx }}
                className="inline-block mr-2"
              >
                {word}
              </motion.span>
            ))}
            <br />
            {"Écoutez Nos Clients".split(" ").map((word, idx) => (
              <motion.span
                key={`testimonial_word_2_${idx}`}
                variants={itemVariants}
                initial={"hidden"}
                whileInView={"visible"}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: 0.1 * (idx + 2) }}
                className="inline-block mr-2"
              >
                {word}
              </motion.span>
            ))}
          </h2>
          <motion.p
            initial={"hidden"}
            whileInView={"visible"}
            viewport={{ once: true, margin: "-100px" }}
            className="text-gray-400 max-w-2xl"
          >
            Nous sommes fiers de fournir des services électriques de première
            qualité qui dépassent les attentes de nos clients.
          </motion.p>
        </motion.div>

        {reviews && reviews.length > 0 && <ReviewsCarousel reviews={reviews} />}
      </div>
    </section>
  );
}
