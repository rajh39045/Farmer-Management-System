import { Link } from "react-router-dom";

import Logo from "./Logo";

import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "../../utils/icons";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <Logo />

            <p className="mt-4 text-sm leading-relaxed">
              Krishi Market connects farmers directly with customers for fresh,
              quality produce at fair prices.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>

            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-green-400">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-green-400">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-green-400">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-green-400">
                  Register
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>

            <ul className="space-y-2 text-sm">
              <li>Help Center</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Contact Us</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Follow Us</h3>

            <div className="flex gap-4 text-xl">
              <FaFacebook className="hover:text-green-400 cursor-pointer" />
              <FaTwitter className="hover:text-green-400 cursor-pointer" />
              <FaInstagram className="hover:text-green-400 cursor-pointer" />
              <FaLinkedin className="hover:text-green-400 cursor-pointer" />
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-sm">
          © {new Date().getFullYear()} Krishi Market. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
