import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";

import {
  FaLeaf,
  FaTruck,
  FaUserCheck,
  FaShieldAlt,
} from "react-icons/fa";

const features = [
  {
    id: 1,
    icon: <FaLeaf className="text-4xl text-green-600" />,
    title: "100% Organic",
    description:
      "Fresh and naturally grown fruits, vegetables, and grains directly from farmers.",
  },
  {
    id: 2,
    icon: <FaTruck className="text-4xl text-green-600" />,
    title: "Fast Delivery",
    description:
      "Quick and reliable doorstep delivery with real-time order tracking.",
  },
  {
    id: 3,
    icon: <FaUserCheck className="text-4xl text-green-600" />,
    title: "Verified Farmers",
    description:
      "Products are sold only by verified and trusted farmers.",
  },
  {
    id: 4,
    icon: <FaShieldAlt className="text-4xl text-green-600" />,
    title: "Secure Payments",
    description:
      "Safe online payments with multiple payment options.",
  },
];

const Features = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".feature-card", {
        y: 60,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
      });
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-14">

          <h2 className="text-4xl font-bold text-gray-800">
            Why Choose
            <span className="text-green-600">
              {" "}Krishi Market?
            </span>
          </h2>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            We connect farmers directly with customers,
            ensuring freshness, fair prices, and a secure
            shopping experience.
          </p>

        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {features.map((feature) => (
            <motion.div
              key={feature.id}
              whileHover={{
                y: -10,
                scale: 1.03,
              }}
              className="
                feature-card
                bg-white
                rounded-3xl
                shadow-lg
                p-8
                text-center
                border
                border-gray-100
                hover:border-green-300
                transition-all
              "
            >
              <div className="flex justify-center mb-6">
                {feature.icon}
              </div>

              <h3 className="text-xl font-semibold mb-3">
                {feature.title}
              </h3>

              <p className="text-gray-600 leading-7">
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