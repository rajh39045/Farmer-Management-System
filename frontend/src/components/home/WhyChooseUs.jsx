import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";

import {
  FaLeaf,
  FaSeedling,
  FaTruck,
  FaAward,
} from "../../utils/icons";

import SafeImage from "../common/SafeImage";
import { FARMER_IMAGE } from "../../utils/images";

const features = [
  {
    id: 1,
    icon: <FaLeaf />,
    title: "Fresh Products",
    description:
      "Directly harvested from verified farmers every day.",
  },
  {
    id: 2,
    icon: <FaSeedling />,
    title: "Organic Farming",
    description:
      "Naturally grown crops without harmful chemicals.",
  },
  {
    id: 3,
    icon: <FaTruck />,
    title: "Fast Delivery",
    description:
      "Quick delivery with freshness guaranteed.",
  },
  {
    id: 4,
    icon: <FaAward />,
    title: "Trusted Quality",
    description:
      "Only verified sellers and premium products.",
  },
];

const WhyChooseUs = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".why-card", {
        opacity: 0,
        y: 60,
        stagger: 0.2,
        duration: 1,
      });

      gsap.from(".farmer-image", {
        x: 80,
        opacity: 0,
        duration: 1.2,
      });
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          <div>

            <h2 className="text-4xl font-bold">

              Why Choose

              <span className="text-green-600">

                {" "}Krishi Market?

              </span>

            </h2>

            <p className="text-gray-600 mt-6 leading-8">

              We connect farmers directly with customers,
              ensuring freshness, transparency, and fair pricing.

            </p>

            <div className="mt-10 grid sm:grid-cols-2 gap-6">

              {features.map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{
                    y: -8,
                    scale: 1.03,
                  }}
                  className="
                    why-card
                    rounded-2xl
                    border
                    border-gray-200
                    p-6
                    shadow-lg
                    bg-white
                  "
                >
                  <div className="text-4xl text-green-600 mb-4">

                    {item.icon}

                  </div>

                  <h3 className="font-bold text-lg">

                    {item.title}

                  </h3>

                  <p className="text-gray-600 mt-3">

                    {item.description}

                  </p>

                </motion.div>
              ))}

            </div>

          </div>

          <motion.div
            whileHover={{
              scale: 1.03,
            }}
            className="farmer-image"
          >
            <SafeImage
              src={FARMER_IMAGE}
              alt="Farmer working in the field"
              className="
                rounded-[40px]
                shadow-2xl
                w-full
                object-cover
              "
            />
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
