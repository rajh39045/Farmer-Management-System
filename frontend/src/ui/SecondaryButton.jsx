import { motion } from "framer-motion";
import { buttonHover } from "../animations/framerVariants";

const SecondaryButton = ({
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
        border-2
        border-green-600
        text-green-600
        bg-transparent
        hover:bg-green-600
        hover:text-white
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
              border-green-600
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

export default SecondaryButton;