import { motion } from "framer-motion";

import {
  GiFarmer,
  FaUsers,
  FaShoppingBasket,
  FaLeaf,
} from "../../utils/icons";

import {
  fadeUp,
  staggerContainer,
} from "../../animations/framerVariants";

const stats = [
  {
    icon: <GiFarmer className="text-3xl text-green-300" />,
    value: "10,000+",
    label: "Verified Farmers",
  },
  {
    icon: <FaShoppingBasket className="text-3xl text-yellow-300" />,
    value: "50,000+",
    label: "Fresh Orders",
  },
  {
    icon: <FaUsers className="text-3xl text-blue-300" />,
    value: "25,000+",
    label: "Happy Customers",
  },
];

const AuthBanner = () => {
  return (
    <div
      className="
        hidden
        lg:flex
        relative
        overflow-hidden
        items-center
        justify-center
        min-h-[750px]
      "
    >
      {/* Background */}

      <img
        src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1600&q=80"
        alt="Agriculture"
        className="
          absolute
          inset-0
          w-full
          h-full
          object-cover
        "
      />

      {/* Overlay */}

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-br
          from-green-900/80
          via-green-800/70
          to-black/70
        "
      />

      {/* Decorative Blur */}

      <div className="absolute top-16 left-12 w-44 h-44 rounded-full bg-green-400/20 blur-3xl" />
      <div className="absolute bottom-16 right-12 w-56 h-56 rounded-full bg-yellow-300/20 blur-3xl" />

      {/* Content */}

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="
          relative
          z-10
          max-w-lg
          px-10
          text-white
        "
      >
        <motion.div variants={fadeUp}>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-md border border-white/20">
            <FaLeaf className="text-green-300" />
            <span className="text-sm font-medium">
              Welcome to Krishi Market
            </span>
          </div>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="
            mt-8
            text-5xl
            font-extrabold
            leading-tight
          "
        >
          Fresh From
          <span className="block text-green-300">
            Farm To Your Doorstep
          </span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="
            mt-6
            text-lg
            leading-8
            text-gray-200
          "
        >
          Buy directly from verified farmers, enjoy fresh organic
          products, and support local agriculture with a trusted,
          transparent marketplace.
        </motion.p>

        {/* Statistics */}

        <motion.div
          variants={staggerContainer}
          className="mt-12 grid grid-cols-1 gap-5"
        >
          {stats.map((item, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              whileHover={{
                scale: 1.03,
              }}
              className="
                flex
                items-center
                gap-4
                rounded-2xl
                border
                border-white/20
                bg-white/10
                p-5
                backdrop-blur-xl
              "
            >
              {item.icon}

              <div>
                <h3 className="text-2xl font-bold">
                  {item.value}
                </h3>

                <p className="text-gray-200">
                  {item.label}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AuthBanner;