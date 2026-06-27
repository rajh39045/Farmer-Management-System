import { motion } from "framer-motion";

import GlassCard from "../ui/GlassCard";
import ProductFilters from "./ProductFilters";

import {
  fadeUp,
} from "../../animations/framerVariants";

const ProductSidebar = ({
  categories,
  filters,
  setFilters,
  resetFilters,
}) => {
  return (
    <motion.aside
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="
        w-full
        lg:w-80
        lg:sticky
        lg:top-24
        h-fit
      "
    >
      <GlassCard>

        <h2 className="text-2xl font-bold mb-8">
          Filters
        </h2>

        <ProductFilters
          categories={categories}
          filters={filters}
          setFilters={setFilters}
          resetFilters={resetFilters}
        />

      </GlassCard>
    </motion.aside>
  );
};

export default ProductSidebar;