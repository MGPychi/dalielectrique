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

// const testimonials = [
//   {
//     name: "Shanavas MA",
//     service: "OUTLET AND SWITCH INSTALLATION",
//     rating: 5,
//     review:
//       "I recently hired Zak as an electrician, and I couldnt be happier with his service. He completed the electrical work for our entire basement and placed pot lights surrounding the exterior of our house. Zak is highly skilled and completed the job efficiently and effectively. He was punctual, professional, and his attention to detail was impressive. I felt confident in his expertise, and he went above and beyond to ensure customer satisfaction. I highly recommend Zak for any electrical needs.",
//   },
//   {
//     name: "Dipali Sharma",
//     service: "POT LIGHT INSTALLATION",
//     rating: 5,
//     review:
//       "We recently hired ZAK electrical for pot light installation in our living room. They did an exceptional job. Arrived on time, were very professional, and completed the work efficiently. The end result looks fantastic! Highly recommend their services for any electrical work you may need.",
//   },
//   {
//     name: "John Doe",
//     service: "ELECTRICAL PANEL UPGRADE",
//     rating: 5,
//     review:
//       "I had my electrical panel upgraded by this company and I'm thoroughly impressed. The technicians were knowledgeable, courteous, and explained every step of the process. They completed the job in a timely manner and left the work area spotless. I feel much safer knowing my home's electrical system is up to date. Excellent service!",
//   },
//   // Add more testimonials as needed
// ];

export default async function Reviews() {
  const reviews = await getAllReviews();
  return (
    <section className=" py-32 items-center flex   px-4 bg-gray-800    text-white">
      <div className="container flex flex-col lg:flex-row justify-between  w-full   mx-auto">
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView={"visible"}
          transition={{ duration: 0.5 }}
          className="text-left mb-16"
        >
          <Badge className="mb-6 px-4 py-2 font-bold bg-white text-primary rounded-md">
            Testimonials
          </Badge>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            {"Powerful Praise".split(" ").map((word, idx) => (
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
            {"Hear from Our Customers".split(" ").map((word, idx) => (
              <motion.span
                key={`testimonial_word_2_${idx}`}
                variants={itemVariants}
                initial={"hidden"}
                whileInView={"visible"}
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
            className="text-gray-400 max-w-2xl"
          >
            We take pride in providing top-notch electricity services that
            exceed our customers expectations.
          </motion.p>
        </motion.div>

        {reviews && reviews.length > 0 && <ReviewsCarousel reviews={reviews} />}
      </div>
    </section>
  );
}
