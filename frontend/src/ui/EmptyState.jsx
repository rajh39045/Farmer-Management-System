import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { fadeUp } from "../animations/framerVariants";
import PrimaryButton from "./PrimaryButton";
import { IMAGE_PLACEHOLDER } from "../utils/images";
import { FaLeaf, FaSearch, FaShoppingBag, FaSeedling, FaTruck } from "react-icons/fa";

const EmptyState = ({
  image = IMAGE_PLACEHOLDER,
  title = "No Data Found",
  description = "There is nothing to display right now.",
  buttonText,
  buttonLink = "/",
  variant = "default", // default, search, cart, category, delivery
}) => {
  const getVariantContent = () => {
    switch (variant) {
      case "search":
        return {
          icon: <FaSearch className="text-5xl text-green-400" />,
          illustration: null,
        };
      case "cart":
        return {
          icon: <FaShoppingBag className="text-5xl text-green-400" />,
          illustration: null,
        };
      case "category":
        return {
          icon: <FaSeedling className="text-5xl text-green-400" />,
          illustration: null,
        };
      case "delivery":
        return {
          icon: <FaTruck className="text-5xl text-green-400" />,
          illustration: null,
        };
      default:
        return {
          icon: <FaLeaf className="text-5xl text-green-400" />,
          illustration: image,
        };
    }
  };

  const { icon, illustration } = getVariantContent();

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="
        flex
        flex-col
        items-center
        justify-center
        text-center
        py-12 sm:py-16
        px-4 sm:px-6
      "
    >
      {/* Illustration / Icon */}
      <div className="mb-6 sm:mb-8">
        {illustration ? (
          <img
            src={illustration}
            alt={title}
            className="w-56 sm:w-64 mx-auto opacity-60"
          />
        ) : (
          <div className="inline-flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-green-50">
            {icon}
          </div>
        )}
      </div>

      {/* Title */}
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">
        {title}
      </h2>

      {/* Description */}
      <p className="mt-4 max-w-lg text-gray-600 leading-7 text-base sm:text-lg">
        {description}
      </p>

      {/* Button */}
      {buttonText && (
        <Link to={buttonLink} className="mt-8">
          <PrimaryButton className="w-full sm:w-auto">
            {buttonText}
          </PrimaryButton>
        </Link>
      )}
    </motion.div>
  );
};

export default EmptyState;
