import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  GiFarmer,
  MdInventory,
  HiOutlineUsers,
  MdShoppingBag,
  FaLeaf,
  FaTruck,
  FaStar,
  FaAward,
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
    icon: <GiFarmer className="text-4xl" />,
    value: 500,
    suffix: "+",
    title: "Verified Farmers",
    color: "text-green-400",
    bgColor: "bg-green-500/20",
    description: "Trusted farmers across India",
  },
  {
    id: 2,
    icon: <MdInventory className="text-4xl" />,
    value: 1500,
    suffix: "+",
    title: "Fresh Products",
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/20",
    description: "Organic & seasonal produce",
  },
  {
    id: 3,
    icon: <HiOutlineUsers className="text-4xl" />,
    value: 10000,
    suffix: "+",
    title: "Happy Customers",
    color: "text-blue-400",
    bgColor: "bg-blue-500/20",
    description: "Satisfied families nationwide",
  },
  {
    id: 4,
    icon: <MdShoppingBag className="text-4xl" />,
    value: 25000,
    suffix: "+",
    title: "Orders Delivered",
    color: "text-orange-400",
    bgColor: "bg-orange-500/20",
    description: "On-time delivery guaranteed",
  },
];

const Counter = ({ end, suffix, isVisible }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    
    let current = 0;
    const increment = Math.ceil(end / 60);

    const timer = setInterval(() => {
      current += increment;

      if (current >= end) {
        current = end;
        clearInterval(timer);
      }

      setCount(current);
    }, 25);

    return () => clearInterval(timer);
  }, [end, isVisible]);

  return (
    <span className="font-extrabold">
      {count.toLocaleString()}{suffix}
    </span>
  );
};

const Statistics = () => {
  const sectionRef = useRef(null);
  const [countersVisible, setCountersVisible] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(".stat-card", 
        { y: 60, opacity: 0 },
        { 
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            onEnter: () => setCountersVisible(true),
          },
          y: 0, 
          opacity: 1, 
          stagger: 0.15, 
          duration: 0.8, 
          ease: "power3.out" 
        }
      );
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        py-20 sm:py-28
        bg-gradient-to-br
        from-green-700
        via-emerald-700
        to-green-800
        relative
        overflow-hidden
      "
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-400/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-400/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.div variants={fadeUp} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 text-white font-medium text-sm sm:text-base">
              <FaLeaf className="text-lg" />
              Our Impact
            </span>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
            Growing Together,
            <br />
            <span className="text-yellow-300">Thriving Together</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-5 text-lg text-white/80 max-w-2xl mx-auto leading-8">
            Connecting farmers directly with families across India for fresher food and fairer prices.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
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
                p-6 sm:p-8
                text-center
                text-white
                relative
                overflow-hidden
              "
            >
              {/* Decorative background */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
              <div className={`absolute top-0 left-0 w-full h-1 ${item.bgColor}`} />

              <div className="relative z-10">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 ${item.bgColor}`}>
                  {item.icon}
                </div>

                <h2 className="text-4xl sm:text-5xl font-extrabold leading-none">
                  <Counter end={item.value} suffix={item.suffix} isVisible={countersVisible} />
                </h2>

                <p className="mt-3 text-lg font-semibold text-white">
                  {item.title}
                </p>

                <p className="mt-2 text-sm text-white/70">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}

        </motion.div>

        {/* Additional trust badges */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { icon: <FaLeaf className="text-2xl" />, text: "100% Organic", color: "text-green-300" },
            { icon: <FaTruck className="text-2xl" />, text: "Fast Delivery", color: "text-emerald-300" },
            { icon: <FaStar className="text-2xl" />, text: "Top Rated", color: "text-yellow-300" },
            { icon: <FaAward className="text-2xl" />, text: "Quality Assured", color: "text-blue-300" },
          ].map((badge, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-2 p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10"
            >
              <div className={`w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center ${badge.color}`}>
                {badge.icon}
              </div>
              <span className="text-sm font-medium text-white/90">{badge.text}</span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Statistics;
