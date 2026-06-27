import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const navItems = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Products",
    path: "/products",
  },
  {
    name: "Categories",
    path: "/categories",
  },
  {
    name: "About",
    path: "/about",
  },
  {
    name: "Contact",
    path: "/contact",
  },
];

const NavLinks = () => {
  return (
    <ul className="hidden lg:flex items-center gap-8">
      {navItems.map((item) => (
        <li key={item.path}>
          <NavLink to={item.path}>
            {({ isActive }) => (
              <motion.div
                whileHover={{
                  y: -2,
                }}
                transition={{
                  duration: 0.2,
                }}
                className="relative"
              >
                <span
                  className={`text-base font-medium transition-colors duration-300 ${
                    isActive
                      ? "text-green-600"
                      : "text-gray-700 hover:text-green-600"
                  }`}
                >
                  {item.name}
                </span>

                {isActive && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute left-0 -bottom-2 h-[3px] w-full rounded-full bg-green-600"
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                    }}
                  />
                )}
              </motion.div>
            )}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default NavLinks;