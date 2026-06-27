import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  GiFarmer,
  MdInventory,
  HiOutlineUsers,
  MdShoppingBag,
} from "../../utils/icons";

import {
  fadeUp,
  staggerContainer,
  cardHover,
} from "../../animations/framerVariants";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  {
    id: 1,
    icon: <GiFarmer />,
    value: 500,
    suffix: "+",
    title: "Verified Farmers",
    color: "text-green-600",
  },
  {
    id: 2,
    icon: <MdInventory />,
    value: 1500,
    suffix: "+",
    title: "Fresh Products",
    color: "text-emerald-600",
  },
  {
    id: 3,
    icon: <HiOutlineUsers />,
    value: 10000,
    suffix: "+",
    title: "Happy Customers",
    color: "text-blue-600",
  },
  {
    id: 4,
    icon: <MdShoppingBag />,
    value: 25000,
    suffix: "+",
    title: "Orders Delivered",
    color: "text-orange-500",
  },
];

const Counter = ({ end }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let current = 0;

    const increment = Math.ceil(end / 80);

    const timer = setInterval(() => {
      current += increment;

      if (current >= end) {
        current = end;
        clearInterval(timer);
      }

      setCount(current);
    }, 20);

    return () => clearInterval(timer);
  }, [end]);

  return count;
};

const Statistics = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".stat-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        y: 60,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        py-24
        bg-gradient-to-r
        from-green-600
        via-emerald-600
        to-green-700
      "
    >
      <div className="max-w-7xl mx-auto px-6">

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >

          {stats.map((item) => (
            <motion.div
              key={item.id}
              variants={fadeUp}
              {...cardHover}
              className="
                stat-card
                bg-white/10
                backdrop-blur-lg
                border
                border-white/20
                rounded-3xl
                p-8
                text-center
                text-white
              "
            >

              <div
                className={`
                  text-5xl
                  mb-6
                  ${item.color}
                `}
              >
                {item.icon}
              </div>

              <h2 className="text-5xl font-bold">

                <Counter end={item.value} />

                {item.suffix}

              </h2>

              <p className="mt-4 text-lg font-medium">

                {item.title}

              </p>

            </motion.div>
          ))}

        </motion.div>

      </div>
    </section>
  );
};

export default Statistics;