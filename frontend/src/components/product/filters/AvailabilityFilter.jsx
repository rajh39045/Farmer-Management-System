import { motion } from "framer-motion";
import { fadeUp } from "../../../animations/framerVariants";

const AvailabilityFilter = ({
  inStock,
  setInStock,
}) => {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
    >
      <h3 className="text-lg font-bold text-gray-800 mb-4">
        Availability
      </h3>

      <div className="space-y-3">

        {/* All Products */}

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="radio"
            name="availability"
            checked={inStock === ""}
            onChange={() => setInStock("")}
            className="accent-green-600"
          />

          <span className="text-gray-700">
            All Products
          </span>
        </label>

        {/* In Stock */}

        <label className="flex items-center gap-3 cursor-pointer hover:text-green-600 transition-colors">
          <input
            type="radio"
            name="availability"
            checked={inStock === true}
            onChange={() => setInStock(true)}
            className="accent-green-600"
          />

          <span className="text-gray-700">
            In Stock
          </span>
        </label>

        {/* Out of Stock */}

        <label className="flex items-center gap-3 cursor-pointer hover:text-red-500 transition-colors">
          <input
            type="radio"
            name="availability"
            checked={inStock === false}
            onChange={() => setInStock(false)}
            className="accent-green-600"
          />

          <span className="text-gray-700">
            Out of Stock
          </span>
        </label>

      </div>
    </motion.div>
  );
};

export default AvailabilityFilter;