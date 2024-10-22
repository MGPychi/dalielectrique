import Image from "next/image";
import React from "react";

const Location = () => {
  return (
    <section className="flex flex-col items-center lg:items-start px-4 gap-4 lg:flex-row mx-auto container justify-between py-8 ">
      <div className="w-full lg:w-1/2 ">
        <h1 className="text-4xl lg:text-5xl font-bold py-4 pb-6 lg:py-8 lg:pb-10">
          Where to find us?
        </h1>
        <p className="text-gray-800 text-base lg:text-lg">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore illo
          eius ducimus eligendi vero maxime dignissimos iure error? Architecto
          quia voluptatibus quisquam beatae provident quam eaque, unde
          voluptatem voluptate dignissimos!
        </p>
      </div>
      <div>
        <Image
          src={"/location.png"}
          width={550}
          height={450}
          alt="location image"
        />
      </div>
    </section>
  );
};

export default Location;
