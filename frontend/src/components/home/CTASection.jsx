import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import {
  fadeUp,
  buttonHover,
} from "../../animations/framerVariants";

const CTASection = () => {
  return (
    <section className="relative overflow-hidden py-24 bg-gradient-to-r from-green-800 via-green-700 to-emerald-700">

      {/* Background Blur Effects */}

      <div className="absolute -top-20 -left-20 w-72 h-72 bg-green-400 rounded-full blur-3xl opacity-20" />

      <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-yellow-300 rounded-full blur-3xl opacity-20" />

      <div className="relative max-w-6xl mx-auto px-6">

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="
            bg-white/10
            backdrop-blur-xl
            border
            border-white/20
            rounded-[40px]
            p-12
            lg:p-20
            text-center
            shadow-2xl
          "
        >

          <span className="inline-block px-5 py-2 rounded-full bg-white/20 text-white font-medium mb-6">
            🌱 Join India's Smart Agriculture Marketplace
          </span>

          <h2 className="text-4xl lg:text-6xl font-extrabold text-white leading-tight">

            Fresh Food

            <br />

            Direct From Farmers

          </h2>

          <p className="mt-8 text-lg text-white/90 max-w-3xl mx-auto leading-8">

            Experience a modern agricultural marketplace where
            farmers sell directly to customers, ensuring better
            prices, fresher products, and a transparent buying
            experience.

          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-6">

            <motion.div {...buttonHover}>

              <Link
                to="/products"
                className="
                  inline-flex
                  items-center
                  justify-center
                  px-8
                  py-4
                  rounded-full
                  bg-white
                  text-green-700
                  font-bold
                  shadow-xl
                  hover:shadow-2xl
                  transition-all
                "
              >
                Shop Fresh Products
              </Link>

            </motion.div>

            <motion.div {...buttonHover}>

              <Link
                to="/register"
                className="
                  inline-flex
                  items-center
                  justify-center
                  px-8
                  py-4
                  rounded-full
                  border-2
                  border-white
                  text-white
                  font-bold
                  hover:bg-white
                  hover:text-green-700
                  transition-all
                "
              >
                Become a Farmer
              </Link>

            </motion.div>

          </div>

        </motion.div>

      </div>

    </section>
  );
};

export default CTASection;