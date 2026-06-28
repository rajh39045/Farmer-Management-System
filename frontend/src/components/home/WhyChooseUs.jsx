import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";

import {
  FaLeaf,
  FaSeedling,
  FaTruck,
  FaAward,
  FaUserCheck,
  FaShieldAlt,
  FaRecycle,
  FaHeart,
} from "react-icons/fa";

import SafeImage from "../common/SafeImage";
import { FARMER_IMAGE } from "../../utils/images";

const features = [
  {
    id: 1,
    icon: FaLeaf,
    color: "text-green-600",
    bgColor: "bg-green-50",
    title: "Fresh Products",
    description:
      "Directly harvested from verified farmers every day.",
  },
  {
    id: 2,
    icon: FaSeedling,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    title: "Organic Farming",
    description:
      "Naturally grown crops without harmful chemicals.",
  },
  {
    id: 3,
    icon: FaTruck,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    title: "Fast Delivery",
    description:
      "Quick delivery with freshness guaranteed.",
  },
  {
    id: 4,
    icon: FaAward,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    title: "Trusted Quality",
    description:
      "Only verified sellers and premium products.",
  },
  {
    id: 5,
    icon: FaUserCheck,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
    title: "Verified Farmers",
    description:
      "Every farmer goes through strict verification process.",
  },
  {
    id: 6,
    icon: FaShieldAlt,
    color: "text-red-600",
    bgColor: "bg-red-50",
    title: "Secure Payments",
    description:
      "Multiple payment options with bank-level security.",
  },
  {
    id: 7,
    icon: FaRecycle,
    color: "text-teal-600",
    bgColor: "bg-teal-50",
    title: "Sustainable",
    description:
      "Eco-friendly packaging and zero-waste initiatives.",
  },
  {
    id: 8,
    icon: FaHeart,
    color: "text-pink-600",
    bgColor: "bg-pink-50",
    title: "Farmer Welfare",
    description:
      "Fair prices ensuring better livelihood for farmers.",
  },
];

const WhyChooseUs = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(".why-card", 
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: "power3.out" }
      );

      gsap.fromTo(".farmer-image", 
        { x: 80, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
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

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          <div>

            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 font-medium mb-6 text-sm sm:text-base">
              <FaLeaf className="text-lg" />
              Our Difference
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-gray-900">
              Why Choose
              <span className="text-green-600">
                {" "}Krishi Market?
              </span>
            </h2>

            <p className="text-gray-600 mt-6 leading-8 max-w-xl">
              We connect farmers directly with customers,
              ensuring freshness, transparency, and fair pricing.
            </p>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">

              {features.map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{
                    y: -6,
                    scale: 1.02,
                  }}
                  className="
                    why-card
                    rounded-2xl
                    border
                    border-gray-100
                    p-5 sm:p-6
                    shadow-lg
                    bg-white
                    hover:shadow-xl
                    hover:border-green-200
                    transition-all
                    duration-300
                  "
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${item.bgColor}`}>
                      <item.icon className={`text-2xl ${item.color}`} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">
                        {item.title}
                      </h3>

                      <p className="text-gray-600 mt-2 text-sm sm:text-base leading-7">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}

            </div>

          </div>

          <motion.div
            whileHover={{
              scale: 1.02,
            }}
            className="farmer-image relative"
          >
            <div className="relative rounded-[40px] overflow-hidden shadow-2xl">
              <SafeImage
                src={FARMER_IMAGE}
                alt="Farmer working in the field"
                className="
                  w-full
                  h-[500px] sm:h-[550px]
                  object-cover
                "
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/30 via-transparent to-transparent" />
            </div>
            
            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-6 right-6 lg:bottom-8 lg:right-8 bg-white/95 backdrop-blur-sm p-4 sm:p-6 rounded-2xl shadow-xl border border-green-100"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
                  <FaAward className="text-2xl text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-green-600">4.9/5</h3>
                  <p className="text-sm text-gray-500">Customer Rating</p>
                </div>
              </div>
            </motion.div>

          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
