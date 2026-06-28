import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { gsap } from "gsap";

import { getAllCategories } from "../../api/categoryApi";
import EmptyState from "../ui/EmptyState";
import SafeImage from "../common/SafeImage";
import {
  getCategoryImage,
  getCategoryKey,
  normalizeCategories,
} from "../../utils/categories";

const Categories = () => {
  const sectionRef = useRef(null);

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (loading || categories.length === 0) return;
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(".category-card", 
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "power3.out" }
      );
    }, sectionRef.current);

    return () => ctx.revert();
  }, [loading, categories.length]);

  const fetchCategories = async () => {
    try {
      setError("");
      const data = await getAllCategories();
      setCategories(normalizeCategories(data.categories || []));
    } catch (fetchError) {
      console.error(fetchError);
      setError("Unable to load categories right now.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
              Shop By Category
            </h2>
            <p className="mt-3 text-gray-600">Discover fresh produce by category</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
            {[...Array(10)].map((_, index) => (
              <div
                key={index}
                className="aspect-square rounded-2xl bg-gray-200 animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || categories.length === 0) {
    return (
      <section className="py-20 sm:py-28 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <EmptyState
            title={error || "No categories yet"}
            description={
              error
                ? "Please refresh the page or try again in a moment."
                : "Categories will appear here once they are added."
            }
            buttonText="Browse Products"
            buttonLink="/products"
          />
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="py-20 sm:py-28 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-12 sm:mb-16">

          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 font-medium mb-6 text-sm sm:text-base">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            Fresh Categories
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-gray-900">
            Shop By
            <span className="text-green-600">
              {" "}Category
            </span>
          </h2>

          <p className="mt-5 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-8">
            Explore fresh products from different categories, sourced directly from verified farmers.
          </p>

        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">

          {categories.map((category) => (
            <motion.div
              key={getCategoryKey(category)}
              whileHover={{
                y: -8,
                scale: 1.02,
              }}
              className="category-card"
            >
              <Link
                to={`/products?category=${category._id}`}
                className="block"
              >
                <div
                  className="
                    rounded-2xl
                    bg-white
                    shadow-lg
                    overflow-hidden
                    hover:shadow-2xl
                    transition-all
                    duration-300
                    h-full
                    flex
                    flex-col
                  "
                >

                  <div className="relative aspect-square overflow-hidden">
                    <SafeImage
                      src={getCategoryImage(category)}
                      alt={category.name}
                      className="
                        w-full
                        h-full
                        object-cover
                        transition-transform
                        duration-500
                        hover:scale-105
                      "
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    {/* Product count badge */}
                    {category.productCount > 0 && (
                      <div className="absolute bottom-3 left-3 right-3">
                        <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-xs font-semibold text-gray-700 shadow-lg">
                          <svg className="w-3.5 h-3.5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                          </svg>
                          {category.productCount} {category.productCount === 1 ? "Product" : "Products"}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-5 text-center flex-1 flex flex-col justify-between">

                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 line-clamp-1">
                      {category.name}
                    </h3>

                    <p className="text-gray-500 mt-2 text-sm">
                      {category.productCount > 0
                        ? `${category.productCount} product${category.productCount === 1 ? "" : "s"} available`
                        : "View Products"}
                    </p>

                    {/* Arrow indicator */}
                    <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-center gap-2 text-green-600 font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>Explore</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>

                  </div>

                </div>
              </Link>
            </motion.div>
          ))}

        </div>

        {/* View All Categories Link */}
        <div className="text-center mt-12">
          <Link
            to="/categories"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border-2 border-green-200 text-green-700 font-semibold hover:bg-green-50 hover:border-green-300 transition-all duration-200 shadow-sm"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            View All Categories
          </Link>
        </div>

      </div>
    </section>
  );
};

export default Categories;
