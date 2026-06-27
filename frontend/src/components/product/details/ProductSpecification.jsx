import { motion } from "framer-motion";

import GlassCard from "../../ui/GlassCard";
import SectionHeading from "../../ui/SectionHeading";

import { fadeUp } from "../../../animations/framerVariants";

const ProductSpecification = ({ product }) => {
  if (!product) return null;

  const specifications = [
    {
      label: "Category",
      value: product.category?.name || "-",
    },
    {
      label: "Price",
      value: `₹${product.price}`,
    },
    {
      label: "Unit",
      value: product.unit || "-",
    },
    {
      label: "Available Stock",
      value: product.stock,
    },
    {
      label: "Organic",
      value: product.organic ? "Yes" : "No",
    },
    {
      label: "Featured",
      value: product.featured ? "Yes" : "No",
    },
    {
      label: "Farmer",
      value: product.farmer?.name || "-",
    },
    {
      label: "Location",
      value: product.farmer?.location || "-",
    },
    {
      label: "Created On",
      value: product.createdAt
        ? new Date(product.createdAt).toLocaleDateString()
        : "-",
    },
  ];

  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="mt-16"
    >
      <SectionHeading
        title="Product"
        highlight="Specifications"
        center={false}
      />

      <GlassCard className="overflow-hidden">

        <div className="divide-y divide-gray-200">

          {specifications.map((item) => (
            <div
              key={item.label}
              className="
                flex
                flex-col
                md:flex-row
                justify-between
                gap-3
                py-5
              "
            >
              <h4
                className="
                  font-semibold
                  text-gray-700
                  md:w-1/3
                "
              >
                {item.label}
              </h4>

              <p
                className="
                  text-gray-600
                  md:w-2/3
                  break-words
                "
              >
                {item.value}
              </p>
            </div>
          ))}

        </div>

      </GlassCard>

    </motion.section>
  );
};

export default ProductSpecification;