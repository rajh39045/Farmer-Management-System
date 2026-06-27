import { motion } from "framer-motion";
import { buttonHover } from "../animations/framerVariants";

const PrimaryButton = ({
  children,
  type = "button",
  onClick,
  loading = false,
  disabled = false,
  icon,
  rightIcon,
  fullWidth = false,
  className = "",
}) => {
  return (
    <motion.button
      {...buttonHover}
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        flex
        items-center
        justify-center
        gap-3
        px-6
        py-3
        rounded-xl
        font-semibold
        text-white
        bg-gradient-to-r
        from-green-600
        to-emerald-500
        shadow-lg
        hover:shadow-2xl
        transition-all
        duration-300
        disabled:opacity-60
        disabled:cursor-not-allowed
        ${
          fullWidth
            ? "w-full"
            : ""
        }
        ${className}
      `}
    >
      {loading ? (
        <>
          <div
            className="
              w-5
              h-5
              border-2
              border-white
              border-t-transparent
              rounded-full
              animate-spin
            "
          />

          Loading...
        </>
      ) : (
        <>
          {icon && icon}

          {children}

          {rightIcon && rightIcon}
        </>
      )}
    </motion.button>
  );
};

export default PrimaryButton;