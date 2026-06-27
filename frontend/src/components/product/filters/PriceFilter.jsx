import { motion } from "framer-motion";
import { fadeUp } from "../../../animations/framerVariants";

const PriceFilter = ({
  priceRange = { min: "", max: "" },
  setPriceRange,
}) => {
  const handleMinChange = (e) => {
    setPriceRange({
      ...priceRange,
      min: e.target.value,
    });
  };

  const handleMaxChange = (e) => {
    setPriceRange({
      ...priceRange,
      max: e.target.value,
    });
  };

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
    >
      <h3 className="text-lg font-bold text-gray-800 mb-4">
        Price Range
      </h3>

      <div className="space-y-4">

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Minimum Price
          </label>

          <input
            type="number"
            min="0"
            placeholder="₹ 0"
            value={priceRange.min || ""}
            onChange={handleMinChange}
            className="
              w-full
              rounded-xl
              border
              border-gray-300
              px-4
              py-3
              outline-none
              focus:ring-2
              focus:ring-green-500
              focus:border-green-500
            "
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Maximum Price
          </label>

          <input
            type="number"
            min="0"
            placeholder="₹ 5000"
            value={priceRange.max || ""}
            onChange={handleMaxChange}
            className="
              w-full
              rounded-xl
              border
              border-gray-300
              px-4
              py-3
              outline-none
              focus:ring-2
              focus:ring-green-500
              focus:border-green-500
            "
          />
        </div>

        <div className="rounded-xl bg-green-50 p-3 text-sm text-green-700">
          Selected Range:
          <span className="font-semibold">
            {" "}
            ₹{priceRange.min || 0}
          </span>

          {" - "}

          <span className="font-semibold">
            ₹{priceRange.max || "∞"}
          </span>
        </div>

      </div>
    </motion.div>
  );
};

export default PriceFilter;