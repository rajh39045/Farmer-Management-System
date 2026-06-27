import { motion } from "framer-motion";
import { fadeUp } from "../../animations/framerVariants";

const SectionHeading = ({
  badge,
  title,
  highlight,
  subtitle,
  center = true,
}) => {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={`mb-14 ${
        center ? "text-center" : "text-left"
      }`}
    >
      {badge && (
        <span
          className="
            inline-block
            px-4
            py-2
            rounded-full
            bg-green-100
            text-green-700
            font-semibold
            text-sm
            mb-5
          "
        >
          {badge}
        </span>
      )}

      <h2
        className="
          text-3xl
          md:text-4xl
          lg:text-5xl
          font-extrabold
          text-gray-800
          leading-tight
        "
      >
        {title}

        {highlight && (
          <span className="text-green-600">
            {" "}
            {highlight}
          </span>
        )}
      </h2>

      {subtitle && (
        <p
          className="
            mt-5
            text-gray-600
            text-lg
            leading-8
            max-w-3xl
            mx-auto
          "
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeading;