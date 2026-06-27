import { motion } from "framer-motion";
import { FaStar } from "../../../utils/icons";
import { fadeUp } from "../../../animations/framerVariants";

const ratings = [5, 4, 3, 2, 1];

const RatingFilter = ({
  rating,
  setRating,
}) => {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
    >
      <h3 className="text-lg font-bold text-gray-800 mb-4">
        Customer Rating
      </h3>

      <div className="space-y-3">

        {/* All Ratings */}

        <label
          className="
            flex
            items-center
            gap-3
            cursor-pointer
          "
        >
          <input
            type="radio"
            name="rating"
            checked={!rating}
            onChange={() => setRating("")}
            className="accent-green-600"
          />

          <span className="text-gray-700">
            All Ratings
          </span>
        </label>

        {/* Rating Options */}

        {ratings.map((item) => (
          <label
            key={item}
            className="
              flex
              items-center
              gap-3
              cursor-pointer
              hover:text-green-600
              transition-colors
            "
          >
            <input
              type="radio"
              name="rating"
              value={item}
              checked={Number(rating) === item}
              onChange={() => setRating(item)}
              className="accent-green-600"
            />

            <div className="flex items-center gap-1">

              {[...Array(item)].map((_, index) => (
                <FaStar
                  key={index}
                  className="text-yellow-400"
                />
              ))}

              <span className="ml-2 text-sm text-gray-600">
                & Up
              </span>

            </div>

          </label>
        ))}

      </div>
    </motion.div>
  );
};

export default RatingFilter;