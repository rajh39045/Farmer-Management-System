import { motion } from "framer-motion";
import {
  fadeUp,
  staggerContainer,
  cardHover,
} from "../../animations/framerVariants";

import { FaStar } from "../../utils/icons";

const testimonials = [
  {
    id: 1,
    name: "Rahul Sharma",
    role: "Customer",
    image:
      "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
    review:
      "The vegetables were incredibly fresh and delivered on time. I love buying directly from farmers.",
  },
  {
    id: 2,
    name: "Anita Kumari",
    role: "Farmer",
    image:
      "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
    review:
      "Krishi Market helped me reach more customers and sell my products at a fair price.",
  },
  {
    id: 3,
    name: "Rohit Verma",
    role: "Customer",
    image:
      "https://randomuser.me/api/portraits/men/65.jpg",
    rating: 5,
    review:
      "Simple ordering process, secure payments, and excellent quality products every time.",
  },
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >

          <motion.div
            variants={fadeUp}
            className="text-center mb-14"
          >
            <h2 className="text-4xl font-bold">
              What Our Users Say
            </h2>

            <p className="mt-4 text-gray-600">
              Trusted by farmers and customers across India.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {testimonials.map((item) => (
              <motion.div
                key={item.id}
                variants={fadeUp}
                {...cardHover}
                className="
                  bg-white
                  rounded-3xl
                  p-8
                  shadow-lg
                "
              >
                <div className="flex items-center gap-4">

                  <img
                    src={item.image}
                    alt={item.name}
                    className="
                      w-16
                      h-16
                      rounded-full
                      object-cover
                    "
                  />

                  <div>

                    <h3 className="font-bold text-lg">
                      {item.name}
                    </h3>

                    <p className="text-gray-500">
                      {item.role}
                    </p>

                  </div>

                </div>

                <div className="flex mt-5 mb-5">

                  {[...Array(item.rating)].map((_, index) => (
                    <FaStar
                      key={index}
                      className="text-yellow-400"
                    />
                  ))}

                </div>

                <p className="text-gray-600 leading-7">
                  "{item.review}"
                </p>

              </motion.div>
            ))}

          </div>

        </motion.div>

      </div>
    </section>
  );
};

export default Testimonials;