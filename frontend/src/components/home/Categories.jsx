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
      gsap.from(".category-card", {
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out",
      });
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
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-10">
            Categories
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className="h-52 rounded-3xl bg-gray-200 animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || categories.length === 0) {
    return (
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
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
      className="py-20 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-14">

          <h2 className="text-4xl font-bold text-gray-800">
            Shop By
            <span className="text-green-600">
              {" "}Category
            </span>
          </h2>

          <p className="mt-4 text-gray-600">
            Explore fresh products from different categories.
          </p>

        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

          {categories.map((category) => (
            <motion.div
              key={getCategoryKey(category)}
              whileHover={{
                y: -10,
                scale: 1.03,
              }}
              className="category-card"
            >
              <Link
                to={`/products?category=${category._id}`}
              >
                <div
                  className="
                    rounded-3xl
                    bg-white
                    shadow-lg
                    overflow-hidden
                    hover:shadow-2xl
                    transition-all
                    duration-300
                  "
                >

                  <SafeImage
                    src={getCategoryImage(category)}
                    alt={category.name}
                    className="
                      w-full
                      h-48
                      object-cover
                    "
                  />

                  <div className="p-6 text-center">

                    <h3 className="text-xl font-semibold">
                      {category.name}
                    </h3>

                    <p className="text-gray-500 mt-2">
                      {category.productCount > 0
                        ? `${category.productCount} product${category.productCount === 1 ? "" : "s"}`
                        : "View Products"}
                    </p>

                  </div>

                </div>
              </Link>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default Categories;
