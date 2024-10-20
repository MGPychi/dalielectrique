import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-8">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-4">
          <img
            src="/placeholder.svg?height=50&width=100"
            alt="Electrical Contractors Registration Agency"
            className="h-12"
          />
          <img
            src="/placeholder.svg?height=50&width=100"
            alt="Electrical Safety Authority"
            className="h-12"
          />
        </div>
        <p className="text-gray-600">
          &copy; 2023 YOURELECTRIC. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
