import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { gsap } from "gsap";

import { getAllCategories } from "../../api/categoryApi";

const Categories = () => {
  const sectionRef = useRef(null);

  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();

    const ctx = gsap.context(() => {
      gsap.from(".category-card", {
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await getAllCategories();

      setCategories(data.categories || []);
    } catch (error) {
      console.error(error);
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
              key={category._id}
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

                  <img
                    src={
                      category.image ||
                      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80"
                    }
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
                      View Products
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