import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import PrimaryButton from "../ui/PrimaryButton";

import { FaShoppingBasket } from "../../utils/icons";
import { fadeUp } from "../../animations/framerVariants";

const EmptyCart = () => {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="
        flex
        flex-col
        items-center
        justify-center
        py-24
        text-center
      "
    >
      <div
        className="
          w-40
          h-40
          rounded-full
          bg-green-100
          flex
          items-center
          justify-center
          text-green-600
          text-7xl
        "
      >
        <FaShoppingBasket />
      </div>

      <h2 className="mt-8 text-3xl font-bold">
        Your Cart is Empty
      </h2>

      <p
        className="
          mt-4
          max-w-md
          text-gray-500
          leading-7
        "
      >
        Looks like you haven't added any
        fresh products yet.
        Start shopping directly from
        verified farmers.
      </p>

      <Link
        to="/products"
        className="mt-10"
      >
        <PrimaryButton>
          Continue Shopping
        </PrimaryButton>
      </Link>
    </motion.div>
  );
};

export default EmptyCart;