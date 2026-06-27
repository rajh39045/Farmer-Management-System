import { motion } from "framer-motion";

import SectionHeading from "../../ui/SectionHeading";
import ProductGrid from "../ProductGrid";

import { fadeUp } from "../../../animations/framerVariants";

const RelatedProducts = ({
  products = [],
  loading = false,
}) => {
  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="mt-20"
    >
      <SectionHeading
        badge="You May Also Like"
        title="Related"
        highlight="Products"
        subtitle="Explore similar products from verified farmers."
      />

      <ProductGrid
        products={products}
        loading={loading}
        skeletonCount={4}
      />
    </motion.section>
  );
};

export default RelatedProducts;