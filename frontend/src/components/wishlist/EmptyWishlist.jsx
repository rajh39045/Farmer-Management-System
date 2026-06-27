import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import PrimaryButton from "../ui/PrimaryButton";

import { FaHeartBroken } from "../../utils/icons";
import { fadeUp } from "../../animations/framerVariants";

const EmptyWishlist = () => {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center justify-center py-24 text-center"
    >
      <div className="w-40 h-40 rounded-full bg-red-100 flex items-center justify-center">
        <FaHeartBroken className="text-7xl text-red-500" />
      </div>

      <h1 className="mt-8 text-4xl font-bold text-gray-900">
        Your Wishlist is Empty
      </h1>

      <p className="mt-4 max-w-lg text-gray-500 leading-8">
        Save your favorite products here and buy them later.
        Browse our fresh vegetables, fruits, dairy products,
        grains, and much more directly from verified farmers.
      </p>

      <Link
        to="/products"
        className="mt-10"
      >
        <PrimaryButton>
          Browse Products
        </PrimaryButton>
      </Link>
    </motion.div>
  );
};

export default EmptyWishlist;