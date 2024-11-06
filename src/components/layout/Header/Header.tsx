import { Facebook, Phone } from "lucide-react";
import * as motion from "framer-motion/m";
import ContactUsModal from "@/components/modals/ContactUsModal";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import clsx from "clsx";
const links = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Introduction",
    href: "/introduction",
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Services",
    href: "#services",
  },
];

const Header = ({
  className,
  containerClassName,
}: {
  className?: string;
  containerClassName?: string;
}) => {
  return (
    <>
      <header
        className={clsx(
          "absolute  w-full max-w-screen-xl rounded-xl py-2.5 px-2 backdrop-blur-2xl top-0 lg:top-0 xl:top-6 z-10 left-1/2 -translate-x-1/2",
          className
        )}
      >
        <div
          className={clsx(
            "container origin-center mx-auto px-4  ",
            containerClassName
          )}
        >
          <div className="flex justify-between items-center py-2.5 text-sm border-b border-gray-500">
            <motion.a
              href="mailto:admin@dalielictrique.com"
              className=" text-white transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
            >
              admin@dalielictrique.ca
            </motion.a>
            <div className="flex text-white items-center space-x-4">
              <motion.div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>0781810656</span>
              </motion.div>
              <motion.a
                href="#"
                className=" transition-colors duration-200"
                whileHover={{ scale: 1.2 }}
              >
                <Facebook size={18} />
              </motion.a>
            </div>
          </div>
          <div className="flex   justify-between items-center py-4 relative">
            <motion.div className="text-2xl md:text-3xl font-bold">
              <span className="text-white">DALI</span>
              <span className="text-primary">ELICTRIQUE</span>
            </motion.div>
            <DesktopNav links={links} />
            <div className="flex items-center space-x-4">
              <ContactUsModal />
            </div>
            <div className="lg:hidden">
              <MobileNav links={links} />
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
