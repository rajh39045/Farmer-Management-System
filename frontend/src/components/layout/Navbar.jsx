import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";

import Logo from "./Logo";
import NavLinks from "./NavLinks";
import NavActions from "./NavActions";
import MobileMenu from "./MobileMenu";

import { FaBars } from "../../utils/icons";

const Navbar = () => {
  const navbarRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    gsap.fromTo(
      navbarRef.current,
      {
        y: -80,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
      }
    );
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  return (
    <>
      <header
        ref={navbarRef}
        className={`
          fixed
          top-0
          left-0
          right-0
          z-50
          transition-all
          duration-300
          ${
            isScrolled
              ? "bg-white/80 backdrop-blur-xl shadow-lg"
              : "bg-transparent"
          }
        `}
      >
        <div
          className="
            max-w-7xl
            mx-auto
            px-4
            sm:px-6
            lg:px-8
          "
        >
          <div
            className="
              h-20
              flex
              items-center
              justify-between
            "
          >
            {/* Logo */}

            <Logo />

            {/* Desktop Navigation */}

            <NavLinks />

            {/* Desktop Actions */}

            <NavActions />

            {/* Mobile Menu Button */}

            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
              onClick={() =>
                setIsOpen(true)
              }
              className="
                lg:hidden
                text-3xl
                text-green-600
              "
            >
              <FaBars />
            </motion.button>
          </div>
        </div>
      </header>

      {/* Spacer */}

      <div className="h-20" />

      {/* Mobile Drawer */}

      <MobileMenu
        isOpen={isOpen}
        onClose={() =>
          setIsOpen(false)
        }
      />
    </>
  );
};

export default Navbar;