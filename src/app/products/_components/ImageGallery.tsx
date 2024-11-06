"use client";

import { useState } from "react";
import Image from "next/image";
import { m as motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ImageGallery = ({
  images,
  productName = "Sample Product",
}: {
  images: { id: string; url: string }[];
  productName?: string;
}) => {
  const [selectedImage, setSelectedImage] = useState(0);

  const nextImage = () =>
    setSelectedImage((prev) => (prev + 1) % images.length);
  const prevImage = () =>
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="space-y-4 max-w-3xl mx-auto p-4">
      <Card className="bg-white shadow-lg overflow-hidden">
        <CardContent className="p-0 relative aspect-square">
          <AnimatePresence initial={false}>
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <Image
                src={images[selectedImage].url}
                alt={`${productName} - View ${selectedImage + 1}`}
                width={800}
                height={800}
                objectFit="cover"
                priority
              />
            </motion.div>
          </AnimatePresence>
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md hover:bg-white transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md hover:bg-white transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </CardContent>
      </Card>

      {/* Thumbnail Grid */}
      <div className="grid gap-4 grid-cols-5">
        {images.map((image, index) => (
          <motion.button
            key={image.id}
            onClick={() => setSelectedImage(index)}
            className={`relative aspect-square rounded-lg overflow-hidden border-2 ${
              selectedImage === index
                ? "border-primary ring-2 ring-primary/50"
                : "border-transparent hover:border-gray-300"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Image
              src={image.url}
              alt={`${productName} - Thumbnail ${index + 1}`}
              width={800}
              height={800}
            />
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
