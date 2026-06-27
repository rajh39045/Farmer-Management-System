import { motion } from "framer-motion";
import { fadeUp } from "../../../animations/framerVariants";

const CategoryFilter = ({
  categories = [],
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
    >
      <h3 className="text-lg font-bold text-gray-800 mb-4">
        Categories
      </h3>

      <div className="space-y-3">

        {/* All Categories */}

        <label
          className="
            flex
            items-center
            gap-3
            cursor-pointer
          "
        >
          <input
            type="radio"
            name="category"
            checked={!selectedCategory}
            onChange={() =>
              setSelectedCategory("")
            }
            className="
              w-4
              h-4
              accent-green-600
            "
          />

          <span className="text-gray-700">
            All Categories
          </span>
        </label>

        {/* Dynamic Categories */}

        {categories.map((category) => (
          <label
            key={category._id}
            className="
              flex
              items-center
              gap-3
              cursor-pointer
              hover:text-green-600
              transition
            "
          >
            <input
              type="radio"
              name="category"
              checked={
                selectedCategory === category._id
              }
              onChange={() =>
                setSelectedCategory(category._id)
              }
              className="
                w-4
                h-4
                accent-green-600
              "
            />

            <span>
              {category.name}
            </span>

          </label>
        ))}

      </div>
    </motion.div>
  );
};

export default CategoryFilter;