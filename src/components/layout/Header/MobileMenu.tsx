import { Button } from "@/components/ui/button";
import { AnimatePresence, m as motion } from "framer-motion";
import { X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface Props {
  links: { title: string; href: string }[];
  close: () => void;
}

const MobileMenu = ({ links, close }: Props) => {
  const [currentHovered, setCurrentHovered] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "100vh" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50  backdrop-blur-lg bg-opacity-95 lg:hidden flex flex-col justify-center items-center"
    >
      <div className="absolute  inset-0 bg-black/50 backdrop-blur z-10" />
      <nav className="z-40">
        <ul className="  px-4 flex flex-col  space-y-6">
          <AnimatePresence>
            {links.map((item, index) => (
              <motion.li
                key={`mobile_menu_nav_item_${index}`}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                transition={{ delay: 0.05 * index, duration: 0.3 }}
              >
                <Link
                  href={item.href}
                  className={`text-2xl font-semibold block my-2 transition-colors duration-200 text-white hover:text-primary ${
                    currentHovered && currentHovered !== item.title && "blur-sm"
                  }`}
                  onMouseOver={() => setCurrentHovered(item.title)}
                  onMouseLeave={() => setCurrentHovered(null)}
                  onClick={close}
                >
                  {item.title}
                </Link>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </nav>

      <Button
        className="absolute z-40 top-4 right-4 text-white hover:text-primary transition-colors duration-200"
        onClick={close}
      >
        <X />
      </Button>
    </motion.div>
  );
};

export default MobileMenu;
