import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Company</h3>
            <ul>
              <li><a href="#" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">About Us</a></li>
              <li><a href="#" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Careers</a></li>
              <li><a href="#" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Help</h3>
            <ul>
              <li><a href="#" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Customer Service</a></li>
              <li><a href="#" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Returns</a></li>
              <li><a href="#" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Policy</h3>
            <ul>
              <li><a href="#" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Terms of Use</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Follow Us</h3>
            <ul className="flex space-x-4">
              <li><a href="#" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Facebook</a></li>
              <li><a href="#" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Twitter</a></li>
              <li><a href="#" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Instagram</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
