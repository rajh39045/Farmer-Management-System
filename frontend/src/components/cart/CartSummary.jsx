import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import GlassCard from "../ui/GlassCard";
import PrimaryButton from "../ui/PrimaryButton";

import { FaArrowRight } from "../../utils/icons";
import { fadeUp } from "../../animations/framerVariants";

const CartSummary = ({
  subtotal = 0,
  discount = 0,
  deliveryCharge = 0,
}) => {
  const navigate = useNavigate();

  const total =
    subtotal -
    discount +
    deliveryCharge;

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="sticky top-24"
    >
      <GlassCard>

        <h2 className="text-2xl font-bold mb-6">
          Order Summary
        </h2>

        <div className="space-y-4">

          <div className="flex justify-between">
            <span>Subtotal</span>

            <span className="font-semibold">
              ₹{subtotal.toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Discount</span>

            <span className="font-semibold text-green-600">
              - ₹{discount.toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Delivery Charge</span>

            <span className="font-semibold">
              {deliveryCharge === 0
                ? "FREE"
                : `₹${deliveryCharge.toFixed(2)}`}
            </span>
          </div>

          <hr />

          <div className="flex justify-between text-xl font-bold">

            <span>Total</span>

            <span className="text-green-600">
              ₹{total.toFixed(2)}
            </span>

          </div>

        </div>

        <PrimaryButton
          fullWidth
          icon={<FaArrowRight />}
          className="mt-8"
          onClick={() =>
            navigate("/checkout")
          }
        >
          Proceed to Checkout
        </PrimaryButton>

      </GlassCard>
    </motion.div>
  );
};

export default CartSummary;