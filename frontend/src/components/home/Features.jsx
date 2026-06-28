import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";

import {
  FaLeaf,
  FaTruck,
  FaUserCheck,
  FaShieldAlt,
  FaSeedling,
  FaRecycle,
  FaClock,
  FaHeadset,
} from "react-icons/fa";

const features = [
  {
    id: 1,
    icon: FaLeaf,
    color: "text-green-600",
    bgColor: "bg-green-50",
    title: "100% Organic",
    description:
      "Fresh and naturally grown fruits, vegetables, and grains directly from farmers.",
  },
  {
    id: 2,
    icon: FaTruck,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    title: "Fast Delivery",
    description:
      "Quick and reliable doorstep delivery with real-time order tracking.",
  },
  {
    id: 3,
    icon: FaUserCheck,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    title: "Verified Farmers",
    description:
      "Products are sold only by verified and trusted farmers.",
  },
  {
    id: 4,
    icon: FaShieldAlt,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    title: "Secure Payments",
    description:
      "Safe online payments with multiple payment options.",
  },
  {
    id: 5,
    icon: FaSeedling,
    color: "text-lime-600",
    bgColor: "bg-lime-50",
    title: "Sustainable Farming",
    description:
      "Supporting eco-friendly agricultural practices for a greener planet.",
  },
  {
    id: 6,
    icon: FaRecycle,
    color: "text-teal-600",
    bgColor: "bg-teal-50",
    title: "Zero Waste",
    description:
      "Minimizing food waste through direct farmer-to-consumer connections.",
  },
  {
    id: 7,
    icon: FaClock,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    title: "24/7 Support",
    description:
      "Round-the-clock customer support for all your queries and concerns.",
  },
  {
    id: 8,
    icon: FaHeadset,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
    title: "Easy Returns",
    description:
      "Hassle-free return policy with quick refunds on quality issues.",
  },
];

const Features = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(".feature-card", 
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.15, duration: 0.8, ease: "power3.out" }
      );
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 sm:py-28 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-12 sm:mb-16">

          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 font-medium mb-6 text-sm sm:text-base">
            <FaLeaf className="text-lg" />
            Our Promise
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-gray-900">
            Why Choose
            <span className="text-green-600">
              {" "}Krishi Market?
            </span>
          </h2>

          <p className="mt-5 text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-8">
            We connect farmers directly with customers,
            ensuring freshness, fair prices, and a secure
            shopping experience.
          </p>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {features.map((feature) => (
            <motion.div
              key={feature.id}
              whileHover={{
                y: -8,
                scale: 1.02,
              }}
              className="
                feature-card
                bg-white
                rounded-2xl
                shadow-lg
                p-6 sm:p-8
                text-center
                border
                border-gray-100
                hover:border-green-200
                hover:shadow-xl
                transition-all
                duration-300
              "
            >
              <div className="flex justify-center mb-6">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${feature.bgColor}`}>
                  <feature.icon className={`text-3xl ${feature.color}`} />
                </div>
              </div>

              <h3 className="text-lg sm:text-xl font-semibold mb-3 text-gray-900">
                {feature.title}
              </h3>

              <p className="text-gray-600 leading-7 text-sm sm:text-base">
                {feature.description}
              </p>

            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default Features;
