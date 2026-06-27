import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { fadeUp } from "../animations/framerVariants";
import PrimaryButton from "./PrimaryButton";

const EmptyState = ({
  image = "https://illustrations.popsy.co/gray/searching.svg",
  title = "No Data Found",
  description = "There is nothing to display right now.",
  buttonText,
  buttonLink = "/",
}) => {
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
        py-16
        px-6
      "
    >
      {/* Illustration */}

      <img
        src={image}
        alt={title}
        className="
          w-60
          md:w-72
          mb-8
        "
      />

      {/* Title */}

      <h2
        className="
          text-3xl
          font-bold
          text-gray-800
        "
      >
        {title}
      </h2>

      {/* Description */}

      <p
        className="
          mt-4
          max-w-lg
          text-gray-600
          leading-7
        "
      >
        {description}
      </p>

      {/* Button */}

      {buttonText && (
        <Link
          to={buttonLink}
          className="mt-8"
        >
          <PrimaryButton>
            {buttonText}
          </PrimaryButton>
        </Link>
      )}
    </motion.div>
  );
};

export default EmptyState;