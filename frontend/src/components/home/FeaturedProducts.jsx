import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";

import { getAllProducts } from "../../api/productApi";

import ProductCard from "../product/ProductCard";
import ProductSkeleton from "../product/ProductSkeleton";

const FeaturedProducts = () => {
  const sectionRef = useRef(null);

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();

    const ctx = gsap.context(() => {
      gsap.from(".featured-card", {
        opacity: 0,
        y: 60,
        stagger: 0.15,
        duration: 1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getAllProducts({
        limit: 8,
      });

      setProducts(data.products || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="flex items-center justify-between mb-12">

          <div>

            <h2 className="text-4xl font-bold">
              Featured Products
            </h2>

            <p className="text-gray-500 mt-2">
              Fresh products directly from verified farmers.
            </p>

          </div>

          <Link
            to="/products"
            className="
              px-6
              py-3
              rounded-full
              bg-green-600
              text-white
              font-semibold
              hover:bg-green-700
              transition
            "
          >
            View All
          </Link>

        </div>

        {loading ? (
          <ProductSkeleton count={8} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

            {products.map((product) => (
              <div
                key={product._id}
                className="featured-card"
              >
                <ProductCard
                  product={product}
                />
              </div>
            ))}

          </div>
        )}

      </div>
    </section>
  );
};

export default FeaturedProducts;