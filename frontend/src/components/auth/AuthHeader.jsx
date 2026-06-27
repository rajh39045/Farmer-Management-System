import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { fadeUp } from "../../animations/framerVariants";

const AuthHeader = ({
  title,
  subtitle,
  linkText,
  linkLabel,
  linkTo,
}) => {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="mb-10"
    >
      {/* Logo */}

      <Link
        to="/"
        className="inline-flex items-center gap-3 mb-8"
      >
        <div
          className="
            w-14
            h-14
            rounded-2xl
            bg-gradient-to-br
            from-green-600
            to-emerald-500
            flex
            items-center
            justify-center
            text-white
            text-2xl
            shadow-lg
          "
        >
          🌾
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Krishi Market
          </h2>

          <p className="text-sm text-gray-500">
            Farmer to Consumer Marketplace
          </p>
        </div>
      </Link>

      {/* Page Title */}

      <h1 className="text-4xl font-bold text-gray-900">
        {title}
      </h1>

      {/* Subtitle */}

      <p className="mt-4 text-gray-600 leading-7">
        {subtitle}
      </p>

      {/* Bottom Link */}

      {linkTo && (
        <p className="mt-6 text-gray-600">
          {linkText}{" "}

          <Link
            to={linkTo}
            className="
              font-semibold
              text-green-600
              hover:text-green-700
              transition-colors
            "
          >
            {linkLabel}
          </Link>
        </p>
      )}
    </motion.div>
  );
};

export default AuthHeader;