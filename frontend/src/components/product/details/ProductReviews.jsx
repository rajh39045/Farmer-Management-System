import { useState } from "react";
import { motion } from "framer-motion";

import SectionHeading from "../../ui/SectionHeading";
import GlassCard from "../../ui/GlassCard";
import PrimaryButton from "../../ui/PrimaryButton";
import EmptyState from "../../ui/EmptyState";

import ReviewCard from "./ReviewCard";

import {
  FaStar,
  FaPen,
} from "../../../utils/icons";

import { fadeUp } from "../../../animations/framerVariants";

const ProductReviews = ({
  product,
  reviews = [],
  onWriteReview,
}) => {
  const [visibleReviews, setVisibleReviews] = useState(5);

  const ratingStats = product?.ratingStats || {
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  };

  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="mt-20"
    >
      <SectionHeading
        title="Customer"
        highlight="Reviews"
        subtitle="See what customers are saying about this product."
        center={false}
      />

      {/* Rating Summary */}

      <GlassCard className="mb-10">

        <div className="grid lg:grid-cols-2 gap-10">

          {/* Average Rating */}

          <div className="text-center lg:text-left">

            <h2 className="text-6xl font-bold text-green-600">
              {product?.averageRating || 0}
            </h2>

            <div className="flex justify-center lg:justify-start mt-3">

              {[1,2,3,4,5].map((item)=>(
                <FaStar
                  key={item}
                  className="text-yellow-400"
                />
              ))}

            </div>

            <p className="mt-4 text-gray-500">
              Based on {reviews.length} reviews
            </p>

          </div>

          {/* Rating Breakdown */}

          <div className="space-y-4">

            {[5,4,3,2,1].map((star)=>{

              const count = ratingStats[star] || 0;

              const percentage =
                reviews.length > 0
                  ? (count / reviews.length) * 100
                  : 0;

              return (

                <div
                  key={star}
                  className="flex items-center gap-4"
                >

                  <span className="w-8">
                    {star}★
                  </span>

                  <div
                    className="
                      flex-1
                      h-3
                      rounded-full
                      bg-gray-200
                      overflow-hidden
                    "
                  >

                    <div
                      className="h-full bg-green-600"
                      style={{
                        width: `${percentage}%`,
                      }}
                    />

                  </div>

                  <span className="text-sm text-gray-500">
                    {count}
                  </span>

                </div>

              );

            })}

          </div>

        </div>

      </GlassCard>

      {/* Write Review */}

      <div className="flex justify-end mb-8">

        <PrimaryButton
          icon={<FaPen />}
          onClick={onWriteReview}
        >
          Write Review
        </PrimaryButton>

      </div>

      {/* Reviews */}

      {reviews.length === 0 ? (

        <EmptyState
          title="No Reviews Yet"
          description="Be the first customer to review this product."
        />

      ) : (

        <div className="space-y-6">

          {reviews
            .slice(0, visibleReviews)
            .map((review) => (

              <ReviewCard
                key={review._id}
                review={review}
              />

          ))}

        </div>

      )}

      {/* Load More */}

      {visibleReviews < reviews.length && (

        <div className="flex justify-center mt-10">

          <PrimaryButton
            onClick={() =>
              setVisibleReviews(
                (prev) => prev + 5
              )
            }
          >
            Load More Reviews
          </PrimaryButton>

        </div>

      )}

    </motion.section>
  );
};

export default ProductReviews;