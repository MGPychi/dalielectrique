import { AnimatePresence, m as motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
interface Props {
  links: { title: string; href: string }[];
  close: () => void;
}
const MobileMenu = ({ links, close }: Props) => {
  const [currentHovered, setCurrentHovered] = useState<string | null>();
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "100vh" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.2 }}
      className="lg:hidden py-4 overflow-hidden"
    >
      <nav className="">
        <ul className="container mx-auto px-4 flex flex-col space-y-6">
          <AnimatePresence>
            {links.map((item, index) => (
              <motion.li
                initial={{ x: -50 }}
                animate={{ x: 0 }}
                exit={{ x: -50, y: 20 }}
                transition={{ delay: 0.05 * index }}
                key={`mobile_menu_nav_item_${index}`}
              >
                <Link
                  onMouseOver={() => setCurrentHovered(item.title)}
                  onMouseLeave={() => setCurrentHovered(null)}
                  onClick={close}
                  href={item.href}
                  className={`text-xl font-semibold my-4 transition-all duration-200 text-white     hover:text-primary   
                    ${currentHovered && currentHovered != item.title && "blur-sm"}
                    ${index === 0 ? "text-primary" : ""}`}
                >
                  {item.title}
                </Link>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </nav>
    </motion.div>
  );
};

export default MobileMenu;
