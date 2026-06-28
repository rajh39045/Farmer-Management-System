import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { gsap } from "gsap";

import { getAllProducts } from "../../api/productApi";

import ProductCard from "../product/ProductCard";
import ProductSkeleton from "../common/ProductSkeleton";
import EmptyState from "../ui/EmptyState";

const FeaturedProducts = () => {
  const sectionRef = useRef(null);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (loading || products.length === 0) return;
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(".featured-card", 
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: "power3.out" }
      );
    }, sectionRef.current);

    return () => ctx.revert();
  }, [loading, products.length]);

  const fetchProducts = async () => {
    try {
      setError("");
      const data = await getAllProducts({
        limit: 8,
      });

      setProducts(data.products || []);
    } catch (fetchError) {
      console.error(fetchError);
      setError(
        fetchError.response?.data?.message ||
          "Unable to load featured products."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 sm:py-28 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-12">

          <div>

            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 font-medium mb-4 text-sm sm:text-base">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Featured Selection
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-gray-900">
              Featured
              <span className="text-green-600"> Products</span>
            </h2>

            <p className="mt-3 text-base sm:text-lg text-gray-600 max-w-xl">
              Fresh products directly from verified farmers, handpicked for quality.
            </p>

          </div>

          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition-all duration-200 shadow-lg hover:shadow-xl self-start sm:self-auto"
          >
            View All
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>

        </div>

        {loading ? (
          <ProductSkeleton count={8} />
        ) : error ? (
          <EmptyState
            title="Could not load products"
            description={error}
            buttonText="Browse Products"
            buttonLink="/products"
          />
        ) : products.length === 0 ? (
          <EmptyState
            title="No products available yet"
            description="Check back soon for fresh produce from verified farmers."
            buttonText="Browse Marketplace"
            buttonLink="/products"
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {products.map((product) => (
              <motion.div
                key={product._id}
                className="featured-card"
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.25 }}
              >
                <ProductCard
                  product={product}
                />
              </motion.div>
            ))}

          </div>
        )}

      </div>
    </section>
  );
};

export default FeaturedProducts;
