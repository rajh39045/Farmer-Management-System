import { motion } from "framer-motion";

import {
  FaSearch,
  IoClose,
} from "../../utils/icons";

const SearchInput = ({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
  disabled = false,
}) => {
  const handleClear = () => {
    onChange({
      target: {
        value: "",
      },
    });
  };

  return (
    <div className={`relative w-full ${className}`}>
      {/* Search Icon */}

      <FaSearch
        className="
          absolute
          left-4
          top-1/2
          -translate-y-1/2
          text-gray-400
          text-lg
        "
      />

      {/* Input */}

      <input
        type="text"
        value={value}
        disabled={disabled}
        onChange={onChange}
        placeholder={placeholder}
        className="
          w-full
          h-12
          pl-12
          pr-12
          rounded-xl
          border
          border-gray-300
          bg-white/80
          backdrop-blur-lg
          outline-none
          transition-all
          duration-300
          focus:border-green-500
          focus:ring-4
          focus:ring-green-200
          disabled:opacity-60
        "
      />

      {/* Clear Button */}

      {value && (
        <motion.button
          whileHover={{
            scale: 1.1,
          }}
          whileTap={{
            scale: 0.9,
          }}
          type="button"
          onClick={handleClear}
          className="
            absolute
            right-4
            top-1/2
            -translate-y-1/2
            text-gray-400
            hover:text-red-500
          "
        >
          <IoClose />
        </motion.button>
      )}
    </div>
  );
};

export default SearchInput;