import { motion } from "framer-motion";
import { cardHover } from "../../animations/framerVariants";

const sortOptions = [
  {
    label: "Newest First",
    value: "newest",
  },
  {
    label: "Oldest First",
    value: "oldest",
  },
  {
    label: "Price: Low to High",
    value: "price_asc",
  },
  {
    label: "Price: High to Low",
    value: "price_desc",
  },
  {
    label: "Highest Rated",
    value: "rating",
  },
  {
    label: "Name (A - Z)",
    value: "name_asc",
  },
  {
    label: "Name (Z - A)",
    value: "name_desc",
  },
];

const ProductSort = ({
  sort,
  setSort,
}) => {
  return (
    <motion.div
      {...cardHover}
      className="w-full md:w-72"
    >
      <select
        value={sort}
        onChange={(e) =>
          setSort(e.target.value)
        }
        className="
          w-full
          h-12
          px-4
          rounded-xl
          border
          border-gray-300
          bg-white
          shadow-sm
          outline-none
          transition-all
          duration-300
          focus:border-green-500
          focus:ring-4
          focus:ring-green-200
        "
      >
        {sortOptions.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </motion.div>
  );
};

export default ProductSort;