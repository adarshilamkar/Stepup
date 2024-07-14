import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          {/* Company Section */}
          <div className="text-gray-800 dark:text-white">
            <h3 className="text-xl font-bold mb-4">Company</h3>
            <ul>
              <li>
                <Link
                  to="/"
                  className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Help Section */}
          <div className="text-gray-800 dark:text-white">
            <h3 className="text-xl font-bold mb-4">Help</h3>
            <ul>
              <li>
                <Link
                  to="/"
                  className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  Customer Service
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  Returns
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Policy Section */}
          <div className="text-gray-800 dark:text-white">
            <h3 className="text-xl font-bold mb-4">Policy</h3>
            <ul>
              <li>
                <Link
                  to="/"
                  className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  Terms of Use
                </Link>
              </li>
            </ul>
          </div>

          {/* Follow Us Section */}
          <div className="text-gray-800 dark:text-white">
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <ul className="flex space-x-4">
              <li>
                <Link
                  to="/"
                  className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  Facebook
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  Twitter
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  Instagram
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
