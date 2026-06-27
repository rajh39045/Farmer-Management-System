import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { gsap } from "gsap";

import {
  FaArrowRight,
  FaLeaf,
  FaSearch,
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
      gsap.from(".hero-content", {
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });

      gsap.from(".hero-image", {
        x: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });

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

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-emerald-100"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          <div>

            <span className="hero-content inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 font-medium mb-6">

              <FaLeaf />

              100% Organic Marketplace

            </span>

            <h1 className="hero-content text-5xl lg:text-6xl font-extrabold leading-tight">

              Fresh From Farmers

              <span className="block text-green-600">

                Direct To Your Home

              </span>

            </h1>

            <p className="hero-content mt-6 text-lg text-gray-600 leading-8">

              Buy fresh vegetables, fruits, grains, and organic
              products directly from verified farmers with secure
              payments and fast delivery.

            </p>

            <form
              onSubmit={handleSearch}
              className="hero-content mt-10 flex flex-col sm:flex-row gap-4"
            >

              <div className="relative flex-1">

                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

                <input
                  type="text"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search fresh products..."
                  className="w-full pl-11 pr-4 py-4 rounded-full border border-gray-300 bg-white shadow-md outline-none focus:ring-2 focus:ring-green-500"
                />

              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-full bg-green-600 text-white font-semibold shadow-lg"
              >
                Search
              </motion.button>

            </form>

            <div className="hero-content mt-10 flex flex-wrap gap-5">

              <Link to="/products">

                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-full bg-green-600 text-white font-semibold flex items-center gap-2 shadow-xl"
                >
                  Shop Now

                  <FaArrowRight />

                </motion.button>

              </Link>

              <Link to="/register">

                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-full border-2 border-green-600 text-green-600 font-semibold"
                >
                  Become a Farmer
                </motion.button>

              </Link>

            </div>

          </div>

          <div className="relative">

            <motion.div
              whileHover={{ scale: 1.03 }}
              className="hero-image"
            >
              <SafeImage
                src={HERO_IMAGE}
                alt="Fresh farm produce"
                className="rounded-[40px] shadow-2xl w-full object-cover"
              />
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="floating-card absolute top-10 -left-6 bg-white p-5 rounded-2xl shadow-xl"
            >

              <h3 className="text-3xl font-bold text-green-600">

                500+

              </h3>

              <p className="text-gray-500">

                Verified Farmers

              </p>

            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="floating-card absolute bottom-8 -right-6 bg-white p-5 rounded-2xl shadow-xl"
            >

              <h3 className="text-3xl font-bold text-green-600">

                10K+

              </h3>

              <p className="text-gray-500">

                Happy Customers

              </p>

            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default HeroSection;
