import { motion } from "framer-motion";

import SecondaryButton from "../../ui/SecondaryButton";

import { FaUndoAlt } from "../../../utils/icons";

import { buttonHover } from "../../../animations/framerVariants";

const ResetFilters = ({
  resetFilters,
}) => {
  return (
    <motion.div
      {...buttonHover}
      className="pt-4"
    >
      <SecondaryButton
        fullWidth
        icon={<FaUndoAlt />}
        onClick={resetFilters}
      >
        Reset Filters
      </SecondaryButton>
    </motion.div>
  );
};

export default ResetFilters;