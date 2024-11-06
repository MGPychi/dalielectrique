"use client";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { useState } from "react";

const ImageGallery = ({
  images,
  productName,
}: {
  images: { id: string; url: string }[];
  productName: string;
}) => {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="space-y-4 ">
      <Card className="bg-white shadow-lg">
        <CardContent className="p-2">
          <div className="relative  flex justify-center items-center aspect-square">
            <Image
              width={800}
              height={700}
              src={images[selectedImage].url}
              alt={`${productName} - View ${selectedImage + 1}`}
              className="   -full object-cover rounded-lg"
            />
          </div>
        </CardContent>
      </Card>

      {/* Thumbnail Grid */}
      <div className="grid gap-4 grid-cols-5 ">
        {images.map((image, index) => (
          <button
            key={image.id}
            onClick={() => setSelectedImage(index)}
            className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
              selectedImage === index
                ? "border-blue-500 ring-2 ring-blue-300"
                : "border-transparent hover:border-gray-300"
            }`}
          >
            <img
              src={image.url}
              alt={`${productName} - Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
