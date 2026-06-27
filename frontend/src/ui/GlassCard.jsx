import { motion } from "framer-motion";
import { cardHover } from "../animations/framerVariants";

const GlassCard = ({
  children,
  className = "",
  padding = "p-6",
  rounded = "rounded-3xl",
  hover = true,
}) => {
  const card = (
    <div
      className={`
        bg-white/70
        backdrop-blur-xl
        border
        border-white/30
        shadow-xl
        ${padding}
        ${rounded}
        ${className}
      `}
    >
      {children}
    </div>
  );

  if (!hover) {
    return card;
  }

  return (
    <motion.div
      {...cardHover}
    >
      {card}
    </motion.div>
  );
};

export default GlassCard;