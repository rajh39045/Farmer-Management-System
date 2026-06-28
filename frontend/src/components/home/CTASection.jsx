import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import {
  fadeUp,
  buttonHover,
} from "../../animations/framerVariants";

import { FaLeaf, FaTruck, FaShieldAlt, FaStar } from "react-icons/fa";

const CTASection = () => {
  const benefits = [
    { icon: FaLeaf, text: "100% Organic Produce" },
    { icon: FaTruck, text: "Free Delivery Over ₹499" },
    { icon: FaShieldAlt, text: "Secure Payments" },
    { icon: FaStar, text: "Quality Guaranteed" },
  ];

  return (
    <section className="relative overflow-hidden py-20 sm:py-28 bg-gradient-to-br from-green-800 via-green-700 to-emerald-800">

      {/* Background Blur Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-green-400/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl" />
        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/30 rounded-full"
            style={{
              top: `${10 + i * 10}%`,
              left: `${5 + (i * 12) % 90}%`,
            }}
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.5, 1, 0.5] }}
            transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.3 }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

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
            p-8 sm:p-12 lg:p-16
            text-center
            shadow-2xl
            relative
            z-10
          "
        >

          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 text-white font-medium mb-6 text-sm sm:text-base">
            <FaLeaf className="text-lg" />
            Join India's Smart Agriculture Marketplace
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white leading-tight">
            Fresh Food
            <br />
            <span className="text-yellow-300">Direct From Farmers</span>
          </h2>

          <p className="mt-6 sm:mt-8 text-base sm:text-lg text-white/90 max-w-3xl mx-auto leading-8">
            Experience a modern agricultural marketplace where
            farmers sell directly to customers, ensuring better
            prices, fresher products, and a transparent buying
            experience.
          </p>

          {/* Benefits bar */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-col items-center gap-2 p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10"
              >
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white">
                  <benefit.icon className="text-xl" />
                </div>
                <span className="text-sm font-medium text-white/90">{benefit.text}</span>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4">

            <motion.div {...buttonHover}>

              <Link
                to="/products"
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  px-8
                  py-4
                  rounded-2xl
                  bg-white
                  text-green-700
                  font-bold
                  shadow-xl
                  hover:shadow-2xl
                  transition-all
                  w-full sm:w-auto
                "
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
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
                  gap-2
                  px-8
                  py-4
                  rounded-2xl
                  border-2
                  border-white
                  text-white
                  font-bold
                  hover:bg-white
                  hover:text-green-700
                  transition-all
                  w-full sm:w-auto
                "
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
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
