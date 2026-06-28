import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { gsap } from "gsap";

import {
  FaArrowRight,
  FaLeaf,
  FaSearch,
  FaTruck,
  FaShieldAlt,
  FaStar,
} from "react-icons/fa";

import SafeImage from "../common/SafeImage";
import { HERO_IMAGE } from "../../utils/images";

const HeroSection = () => {
  const heroRef = useRef(null);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(".hero-content", 
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out" }
      );

      gsap.fromTo(".hero-image", 
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
      );

      gsap.to(".floating-card", {
        y: -12,
        repeat: -1,
        yoyo: true,
        duration: 2,
        ease: "power1.inOut",
      });
    }, heroRef.current);

    return () => ctx.revert();
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();

    const query = searchQuery.trim();

    if (query) {
      navigate(`/products?search=${encodeURIComponent(query)}`);
      return;
    }

    navigate("/products");
  };

  const trustIndicators = [
    { icon: <FaTruck className="text-green-600" />, text: "Free Delivery", subtext: "On orders above ₹499" },
    { icon: <FaShieldAlt className="text-green-600" />, text: "Secure Payment", subtext: "100% safe & encrypted" },
    { icon: <FaStar className="text-green-600" />, text: "Fresh Guarantee", subtext: "Quality assured products" },
  ];

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-emerald-100"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-200/50 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-200/50 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-10 w-40 h-40 bg-green-300/30 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 relative z-10">

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          <div>

            <span className="hero-content inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 font-medium mb-6 text-sm sm:text-base">

              <FaLeaf className="text-lg" />

              100% Organic Marketplace

            </span>

            <h1 className="hero-content text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-gray-900">

              Fresh From Farmers

              <span className="block text-green-600">

                Direct To Your Home

              </span>

            </h1>

            <p className="hero-content mt-6 text-base sm:text-lg text-gray-600 leading-8 max-w-xl">

              Buy fresh vegetables, fruits, grains, and organic
              products directly from verified farmers with secure
              payments and fast delivery.

            </p>

            {/* Trust Indicators */}
            <div className="hero-content mt-8 flex flex-wrap gap-4 sm:gap-6">
              {trustIndicators.map((item, index) => (
                <div key={index} className="flex items-center gap-3 px-4 py-3 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-green-100">
                  <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{item.text}</p>
                    <p className="text-xs text-gray-500">{item.subtext}</p>
                  </div>
                </div>
              ))}
            </div>

            <form
              onSubmit={handleSearch}
              className="hero-content mt-10 flex flex-col sm:flex-row gap-4"
            >

              <div className="relative flex-1">

                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  type="text"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search fresh products, vegetables, fruits..."
                  className="w-full pl-11 pr-4 py-4 rounded-2xl border border-gray-200 bg-white shadow-lg outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-base"
                />

              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 whitespace-nowrap"
              >
                Search
              </motion.button>

            </form>

            <div className="hero-content mt-10 flex flex-col sm:flex-row gap-4">

              <Link to="/products">

                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl transition-all duration-200"
                >
                  Shop Now

                  <FaArrowRight />

                </motion.button>

              </Link>

              <Link to="/register">

                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl border-2 border-green-600 text-green-600 font-semibold hover:bg-green-50 transition-all duration-200"
                >
                  Become a Farmer
                </motion.button>

              </Link>

            </div>

          </div>

          <div className="relative">

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="hero-image"
            >
              <div className="relative rounded-[40px] overflow-hidden shadow-2xl">
                <SafeImage
                  src={HERO_IMAGE}
                  alt="Fresh farm produce"
                  className="w-full h-[500px] sm:h-[550px] object-cover"
                />
                {/* Gradient overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-green-900/20 via-transparent to-transparent" />
              </div>
            </motion.div>

            {/* Floating stat cards with better positioning */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="floating-card absolute top-6 left-0 sm:left-4 lg:-left-6 bg-white/95 backdrop-blur-sm p-5 sm:p-6 rounded-2xl shadow-xl border border-green-100"
            >

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-green-50 flex items-center justify-center">
                  <FaLeaf className="text-2xl text-green-600" />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-green-600">500+</h3>
                  <p className="text-sm text-gray-500">Verified Farmers</p>
                </div>
              </div>

            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="floating-card absolute bottom-6 right-0 sm:right-4 lg:-right-6 bg-white/95 backdrop-blur-sm p-5 sm:p-6 rounded-2xl shadow-xl border border-green-100"
            >

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-emerald-50 flex items-center justify-center">
                  <FaStar className="text-2xl text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-emerald-600">10K+</h3>
                  <p className="text-sm text-gray-500">Happy Customers</p>
                </div>
              </div>

            </motion.div>

            {/* Additional floating card for mobile */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="floating-card absolute bottom-6 left-1/2 -translate-x-1/2 lg:hidden bg-white/95 backdrop-blur-sm p-4 rounded-2xl shadow-xl border border-green-100"
            >

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                  <FaTruck className="text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-green-600">24h</h3>
                  <p className="text-xs text-gray-500">Fast Delivery</p>
                </div>
              </div>

            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default HeroSection;
