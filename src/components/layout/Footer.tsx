import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-red-500 flex justify-center items-center h-[25rem] py-8">
      <div className="container mx-auto px-4">
        <div className=" justify-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  space-x-8">
          <ul className="text-white flex flex-col space-y-2 text-xl">
            <li className="font-bold">Services</li>
            <li>
              <Link href="">About</Link>
            </li>

            <li>
              <Link href="">About</Link>
            </li>

            <li>
              <Link href="">About</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
