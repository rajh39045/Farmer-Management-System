import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import {
  fadeUp,
  buttonHover,
} from "../../animations/framerVariants";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email.");
      return;
    }

    toast.success("Subscribed successfully!");

    setEmail("");
  };

  return (
    <section className="py-24 bg-gradient-to-r from-green-700 via-emerald-600 to-green-700">
      <div className="max-w-7xl mx-auto px-6">

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="
            rounded-[40px]
            bg-white/10
            backdrop-blur-xl
            border
            border-white/20
            p-10
            lg:p-16
            text-center
            shadow-2xl
          "
        >
          <span className="inline-block px-4 py-2 rounded-full bg-white/20 text-white font-medium mb-6">
            Stay Connected 🌱
          </span>

          <h2 className="text-4xl lg:text-5xl font-bold text-white">
            Subscribe To Our Newsletter
          </h2>

          <p className="mt-6 text-white/90 max-w-2xl mx-auto text-lg leading-8">
            Get updates about fresh arrivals,
            organic farming tips, seasonal offers,
            and exclusive discounts directly in your inbox.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-12 flex flex-col md:flex-row gap-5 max-w-3xl mx-auto"
          >
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="
                flex-1
                px-6
                py-4
                rounded-full
                outline-none
                bg-white
                text-gray-700
                shadow-lg
              "
            />

            <motion.button
              {...buttonHover}
              type="submit"
              className="
                px-10
                py-4
                rounded-full
                bg-white
                text-green-700
                font-bold
                shadow-xl
              "
            >
              Subscribe
            </motion.button>
          </form>

        </motion.div>

      </div>
    </section>
  );
};

export default Newsletter;