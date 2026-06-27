import { motion } from "framer-motion";

import Badge from "../../ui/Badge";

import {
  FaStar,
  FaTag,
  FaBoxOpen,
} from "../../../utils/icons";

import { fadeUp } from "../../../animations/framerVariants";

const ProductInfo = ({ product }) => {
  if (!product) return null;

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Product Name */}

      <h1 className="text-4xl font-bold text-gray-900 leading-tight">
        {product.name}
      </h1>

      {/* Rating */}

      <div className="flex flex-wrap items-center gap-4">

        <div className="flex items-center gap-2">

          <FaStar className="text-yellow-400" />

          <span className="font-semibold">
            {product.averageRating || "0"}
          </span>

        </div>

        <span className="text-gray-500">
          ({product.reviewCount || 0} Reviews)
        </span>

      </div>

      {/* Price */}

      <div className="flex items-center gap-4">

        <h2 className="text-4xl font-bold text-green-600">
          ₹{product.price}
        </h2>

        {product.unit && (
          <span className="text-gray-500">
            / {product.unit}
          </span>
        )}

      </div>

      {/* Badges */}

      <div className="flex flex-wrap gap-3">

        {product.category?.name && (
          <Badge variant="primary">
            <FaTag className="mr-2" />
            {product.category.name}
          </Badge>
        )}

        {product.stock > 0 ? (
          <Badge variant="success">
            <FaBoxOpen className="mr-2" />
            In Stock
          </Badge>
        ) : (
          <Badge variant="error">
            Out of Stock
          </Badge>
        )}

        {product.organic && (
          <Badge variant="success">
            🌿 Organic
          </Badge>
        )}

        {product.featured && (
          <Badge variant="warning">
            ⭐ Featured
          </Badge>
        )}

      </div>

      {/* Description */}

      <div>

        <h3 className="text-xl font-bold mb-3">
          Description
        </h3>

        <p className="text-gray-600 leading-8">
          {product.description}
        </p>

      </div>

    </motion.div>
  );
};

export default ProductInfo;