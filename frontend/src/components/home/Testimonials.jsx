import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

import {
  fadeUp,
  staggerContainer,
  cardHover,
} from "../../animations/framerVariants";

import SafeImage from "../common/SafeImage";
import { FaStar } from "../../utils/icons";
import { TESTIMONIAL_AVATARS } from "../../utils/images";

const testimonials = [
  {
    id: 1,
    name: "Rahul Sharma",
    role: "Customer",
    location: "Mumbai, Maharashtra",
    image: TESTIMONIAL_AVATARS.customer1,
    rating: 5,
    review:
      "The vegetables were incredibly fresh and delivered on time. I love buying directly from farmers - the quality difference is remarkable!",
  },
  {
    id: 2,
    name: "Anita Kumari",
    role: "Farmer",
    location: "Punjab",
    image: TESTIMONIAL_AVATARS.farmer1,
    rating: 5,
    review:
      "Krishi Market helped me reach more customers and sell my products at a fair price. My income has increased significantly since joining.",
  },
  {
    id: 3,
    name: "Rohit Verma",
    role: "Customer",
    location: "Delhi NCR",
    image: TESTIMONIAL_AVATARS.customer2,
    rating: 5,
    review:
      "Simple ordering process, secure payments, and excellent quality products every time. The customer support is also very responsive.",
  },
  {
    id: 4,
    name: "Priya Patel",
    role: "Customer",
    location: "Ahmedabad, Gujarat",
    image: TESTIMONIAL_AVATARS.customer1,
    rating: 5,
    review:
      "Finally a platform where I can trust the quality. The organic vegetables taste just like from my grandmother's garden. Highly recommended!",
  },
  {
    id: 5,
    name: "Suresh Reddy",
    role: "Farmer",
    location: "Hyderabad, Telangana",
    image: TESTIMONIAL_AVATARS.farmer1,
    rating: 5,
    review:
      "The platform is farmer-friendly. Timely payments, transparent pricing, and great support team. It's changed how I sell my produce.",
  },
  {
    id: 6,
    name: "Meera Singh",
    role: "Customer",
    location: "Bangalore, Karnataka",
    image: TESTIMONIAL_AVATARS.customer2,
    rating: 5,
    review:
      "Love the variety of seasonal fruits available. The subscription option for weekly delivery makes my life so much easier!",
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [cardWidth, setCardWidth] = useState(0);

  // Calculate items per view based on window width
  const calculateItemsPerView = useCallback(() => {
    if (typeof window === 'undefined') return 3;
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  }, []);

  // Update items per view and card width on mount and resize
  useEffect(() => {
    const handleResize = () => {
      const newItemsPerView = calculateItemsPerView();
      setItemsPerView(newItemsPerView);
      setCurrentIndex((prev) => Math.min(prev, testimonials.length - newItemsPerView));
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [calculateItemsPerView]);

  // Calculate card width percentage for transform
  useEffect(() => {
    if (itemsPerView > 0) {
      setCardWidth(100 / itemsPerView);
    }
  }, [itemsPerView]);

  const maxIndex = testimonials.length - itemsPerView;

  // Auto-play carousel
  useEffect(() => {
    if (!autoPlay || maxIndex <= 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [autoPlay, maxIndex]);

  const nextSlide = () => {
    setAutoPlay(false);
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    setTimeout(() => setAutoPlay(true), 8000);
  };

  const prevSlide = () => {
    setAutoPlay(false);
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    setTimeout(() => setAutoPlay(true), 8000);
  };

  const goToSlide = (index) => {
    setAutoPlay(false);
    setCurrentIndex(index);
    setTimeout(() => setAutoPlay(true), 8000);
  };

  // Calculate transform based on card width percentage
  const transformX = -currentIndex * cardWidth;

  return (
    <section className="py-20 sm:py-28 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-12 sm:mb-16">

          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 font-medium mb-6 text-sm sm:text-base">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Testimonials
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-gray-900">
            What Our Users
            <span className="text-green-600"> Say</span>
          </h2>

          <p className="mt-5 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-8">
            Trusted by thousands of farmers and customers across India.
          </p>

        </div>

        {/* Carousel Container */}
        <div className="relative">
          <div className="overflow-hidden">
            <motion.div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(${transformX}%)` }}
              animate={{ x: `${transformX}%` }}
            >
              {testimonials.map((item) => (
                <div
                  key={item.id}
                  className="flex-shrink-0 px-3"
                  style={{ width: `${cardWidth}%` }}
                >
                  <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    {...cardHover}
                    className="
                      bg-white
                      rounded-2xl
                      p-6 sm:p-8
                      shadow-lg
                      h-full
                      border
                      border-gray-100
                      hover:shadow-xl
                      hover:border-green-200
                      transition-all
                      duration-300
                    "
                  >
                    {/* Quote icon */}
                    <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center mb-5">
                      <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609v7.391h-8.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609v7.391h-9z" />
                      </svg>
                    </div>

                    {/* Review text */}
                    <p className="text-gray-700 leading-8 mb-6 text-base sm:text-lg">
                      "{item.review}"
                    </p>

                    {/* Rating */}
                    <div className="flex gap-1 mb-5">
                      {[...Array(item.rating)].map((_, index) => (
                        <FaStar key={index} className="text-yellow-400 text-lg" />
                      ))}
                    </div>

                    {/* User info */}
                    <div className="flex items-center gap-4">
                      <SafeImage
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-green-100"
                      />
                      <div className="min-w-0">
                        <h3 className="font-bold text-lg text-gray-900 truncate">{item.name}</h3>
                        <p className="text-gray-500 text-sm flex items-center gap-1 truncate">
                          <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="truncate">{item.location}</span>
                        </p>
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 mt-1 whitespace-nowrap">
                          {item.role}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Navigation Arrows - Desktop */}
          {maxIndex > 0 && (
            <div className="hidden lg:flex absolute top-1/2 left-0 right-0 -translate-y-1/2 px-4 pointer-events-none">
              <button
                onClick={prevSlide}
                className="pointer-events-auto w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-700 hover:bg-green-50 hover:text-green-600 transition-all duration-200"
                aria-label="Previous testimonial"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextSlide}
                className="pointer-events-auto w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-700 hover:bg-green-50 hover:text-green-600 transition-all duration-200 ml-auto"
                aria-label="Next testimonial"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}

          {/* Mobile dots indicator */}
          {maxIndex > 0 && (
            <div className="lg:hidden flex justify-center gap-2 mt-8">
              {Array.from({ length: maxIndex + 1 }, (_, i) => (
                <button
                  key={i}
                  onClick={() => goToSlide(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    i === currentIndex ? 'bg-green-600 w-8' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
          )}

        </div>

        {/* Stats bar */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {[
            { value: "4.9/5", label: "Average Rating", icon: <FaStar className="text-2xl" /> },
            { value: "10K+", label: "Happy Customers", icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg> },
            { value: "500+", label: "Verified Farmers", icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg> },
            { value: "25K+", label: "Orders Delivered", icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg> },
          ].map((stat, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="bg-white rounded-2xl p-5 sm:p-6 shadow-lg border border-gray-100 text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center mx-auto mb-3 text-green-600">
                {stat.icon}
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
