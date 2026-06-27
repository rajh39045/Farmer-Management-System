import { motion } from "framer-motion";

import GlassCard from "../../ui/GlassCard";
import Badge from "../../ui/Badge";

import {
  FaStar,
  FaThumbsUp,
  FaCheckCircle,
} from "../../../utils/icons";

import { fadeUp } from "../../../animations/framerVariants";

const ReviewCard = ({ review }) => {
  if (!review) return null;

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <GlassCard>

        {/* Header */}

        <div className="flex items-start gap-4">

          <img
            src={
              review.user?.avatar ||
              "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80"
            }
            alt={review.user?.name}
            className="
              w-14
              h-14
              rounded-full
              object-cover
            "
          />

          <div className="flex-1">

            <div className="flex flex-wrap items-center gap-3">

              <h3 className="font-bold text-lg">
                {review.user?.name}
              </h3>

              {review.verifiedPurchase && (
                <Badge variant="success">
                  <FaCheckCircle className="mr-2" />
                  Verified Purchase
                </Badge>
              )}

            </div>

            <div className="flex items-center gap-1 mt-2">

              {[...Array(review.rating)].map((_, index) => (
                <FaStar
                  key={index}
                  className="text-yellow-400"
                />
              ))}

            </div>

          </div>

          <span className="text-sm text-gray-500">
            {review.createdAt
              ? new Date(review.createdAt).toLocaleDateString()
              : ""}
          </span>

        </div>

        {/* Review */}

        <p className="mt-6 text-gray-600 leading-8">
          {review.comment}
        </p>

        {/* Footer */}

        <div className="flex justify-between items-center mt-8">

          <button
            className="
              flex
              items-center
              gap-2
              text-gray-500
              hover:text-green-600
              transition
            "
          >
            <FaThumbsUp />

            Helpful

            {review.helpfulCount > 0 &&
              ` (${review.helpfulCount})`}
          </button>

        </div>

      </GlassCard>
    </motion.div>
  );
};

export default ReviewCard;