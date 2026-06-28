import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { gsap } from "gsap";

import { FaLeaf } from "../../utils/icons";

const Logo = () => {
  const logoRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      logoRef.current,
      {
        opacity: 0,
        y: -30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
      }
    );
  }, []);

  return (
    <Link to="/">
      <motion.div
        ref={logoRef}
        whileHover={{
          scale: 1.05,
        }}
        whileTap={{
          scale: 0.95,
        }}
        className="flex items-center gap-3 cursor-pointer"
      >
        <div
          className="
            w-12
            h-12
            rounded-full
            bg-gradient-to-r
            from-green-500
            to-emerald-600
            flex
            items-center
            justify-center
            shadow-lg
          "
        >
          <FaLeaf className="text-white text-2xl" />
        </div>

        <div className="block">
          <h1
            className="
              text-xl sm:text-2xl
              font-extrabold
              text-green-700
              leading-none
            "
          >
            Krishi Market
          </h1>

          <p
            className="
              text-[10px] sm:text-xs
              text-gray-500
              tracking-wider
            "
          >
            Fresh • Organic • Direct
          </p>
        </div>
      </motion.div>
    </Link>
  );
};

export default Logo;