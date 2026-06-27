import { useState } from "react";
import { motion } from "framer-motion";

const ProductGallery = ({ images = [] }) => {
  const placeholder =
    "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80";

  const galleryImages =
    images.length > 0
      ? images
      : [{ url: placeholder }];

  const [selectedImage, setSelectedImage] = useState(
    galleryImages[0].url
  );

  return (
    <div className="space-y-5">

      {/* Main Image */}

      <motion.div
        whileHover={{
          scale: 1.02,
        }}
        className="
          rounded-3xl
          overflow-hidden
          bg-white
          shadow-xl
        "
      >
        <img
          src={selectedImage}
          alt="Product"
          className="
            w-full
            h-[500px]
            object-cover
          "
        />
      </motion.div>

      {/* Thumbnail Images */}

      <div className="flex gap-4 overflow-x-auto">

        {galleryImages.map((image, index) => (
          <motion.button
            key={index}
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.95,
            }}
            onClick={() =>
              setSelectedImage(image.url)
            }
            className={`
              rounded-2xl
              overflow-hidden
              border-2
              transition-all
              ${
                selectedImage === image.url
                  ? "border-green-600"
                  : "border-transparent"
              }
            `}
          >
            <img
              src={image.url}
              alt={`Thumbnail ${index + 1}`}
              className="
                w-24
                h-24
                object-cover
              "
            />
          </motion.button>
        ))}

      </div>

    </div>
  );
};

export default ProductGallery;