import { motion } from "framer-motion";
import { fadeUp } from "../../../animations/framerVariants";
import { getCategoryKey } from "../../../utils/categories";

const CategoryFilter = ({
  categories = [],
  selectedCategory,
  setSelectedCategory,
}) => {
  const activeCategory = selectedCategory?.toString() || "";

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
            checked={!activeCategory}
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

        {categories.map((category) => {
          const categoryId = category._id?.toString() || category.slug || "";

          return (
            <label
              key={getCategoryKey(category)}
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
                checked={activeCategory === categoryId}
                onChange={() =>
                  setSelectedCategory(categoryId)
                }
                className="
                  w-4
                  h-4
                  accent-green-600
                "
              />

              <span>
                {category.name}
                {category.productCount > 0
                  ? ` (${category.productCount})`
                  : ""}
              </span>

            </label>
          );
        })}

      </div>
    </motion.div>
  );
};

export default CategoryFilter;