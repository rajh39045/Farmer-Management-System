import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import {
  fadeUp,
  buttonHover,
} from "../../animations/framerVariants";

import { FaLeaf, FaTruck, FaShieldAlt, FaStar, FaEnvelope } from "react-icons/fa";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success("Subscribed successfully! Welcome to Krishi Market! 🌱");
    setEmail("");
    setIsSubmitting(false);
  };

  const benefits = [
    { icon: FaLeaf, text: "Fresh Arrival Alerts" },
    { icon: FaTruck, text: "Delivery Updates" },
    { icon: FaShieldAlt, text: "Exclusive Offers" },
    { icon: FaStar, text: "Farming Tips" },
  ];

  return (
    <section className="relative overflow-hidden py-20 sm:py-28 bg-gradient-to-br from-green-700 via-emerald-700 to-green-800">

      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-green-400/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl" />
        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-white/30 rounded-full"
            style={{
              top: `${15 + i * 12}%`,
              left: `${8 + (i * 15) % 85}%`,
            }}
            animate={{ opacity: [0.2, 0.8, 0.2], scale: [0.5, 1, 0.5] }}
            transition={{ duration: 4 + i * 0.5, repeat: Infinity, delay: i * 0.4 }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

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
            p-8 sm:p-12 lg:p-16
            text-center
            shadow-2xl
          "
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 text-white font-medium mb-6 text-sm sm:text-base">
            <FaLeaf className="text-lg" />
            Stay Connected
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
            Subscribe To Our
            <br />
            <span className="text-yellow-300">Newsletter</span>
          </h2>

          <p className="mt-5 text-base sm:text-lg text-white/90 max-w-2xl mx-auto leading-8">
            Get updates about fresh arrivals, organic farming tips,
            seasonal offers, and exclusive discounts directly in your inbox.
          </p>

          {/* Benefits */}
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

          <form
            onSubmit={handleSubmit}
            className="mt-10 flex flex-col sm:flex-row gap-4 max-w-xl mx-auto"
          >
            <div className="relative flex-1">
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
                className="
                  w-full
                  pl-11
                  pr-4
                  py-4
                  rounded-2xl
                  outline-none
                  bg-white
                  text-gray-700
                  shadow-lg
                  focus:ring-2
                  focus:ring-yellow-300
                  focus:border-transparent
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                  text-base
                "
              />
            </div>

            <motion.button
              {...buttonHover}
              type="submit"
              disabled={isSubmitting}
              className="
                px-8
                py-4
                rounded-2xl
                bg-yellow-400
                text-green-900
                font-bold
                shadow-xl
                hover:shadow-2xl
                hover:bg-yellow-300
                transition-all
                disabled:opacity-50
                disabled:cursor-not-allowed
                whitespace-nowrap
                flex
                items-center
                justify-center
                gap-2
              "
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Subscribing...
                </>
              ) : (
                <>
                  Subscribe
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </>
              )}
            </motion.button>
          </form>

          <p className="mt-5 text-sm text-white/70">
            No spam, unsubscribe anytime. By subscribing, you agree to our
            <a href="/privacy" className="underline hover:text-yellow-300">Privacy Policy</a>.
          </p>

        </motion.div>

      </div>
    </section>
  );
};

export default Newsletter;
