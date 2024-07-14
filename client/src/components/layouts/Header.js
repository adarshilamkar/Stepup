import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/auth";
import { toast } from "react-hot-toast";
import { useCart } from "../context/cart";
import axios from "axios";
import "./Header.css"; // Import your CSS file for header styles

const Header = () => {
  const [cart] = useCart();
  const [auth, setAuth] = useAuth();
  const [currSale, setCurrSale] = useState(null);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to calculate time left until the end date
  const calculateTimeLeft = (endDate) => {
    const difference = new Date(endDate) - new Date();
    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      return { days, hours, minutes, seconds };
    } else {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
  };

  // Fetch all sales and set the current sale if it is active
  const getSale = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/sale/allsales`
      );
      if (res.data.success) {
        const sales = res.data.sales;
        const currDate = new Date();
        for (let sale of sales) {
          const startDate = new Date(sale.start);
          const endDate = new Date(sale.end);
          if (currDate >= startDate && currDate <= endDate) {
            setCurrSale(sale);
            setTimeLeft(calculateTimeLeft(endDate));
            break;
          }
        }
      }
    } catch (error) {
      console.error("Failed to fetch sales data:", error);
      toast.error("Failed to load current sales.");
    }
  };

  // Handle user logout
  const handleLogout = () => {
    localStorage.removeItem("auth");
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    toast.success("Logged out Successfully");
  };

  // Fetch sale data on component mount
  useEffect(() => {
    getSale();
    //eslint-disable-next-line
  }, []);

  // Update countdown every second
  useEffect(() => {
    let timer;
    if (currSale) {
      timer = setInterval(() => {
        const newTimeLeft = calculateTimeLeft(currSale.end);
        setTimeLeft(newTimeLeft);

        // Stop the timer when the countdown ends
        if (
          newTimeLeft.days === 0 &&
          newTimeLeft.hours === 0 &&
          newTimeLeft.minutes === 0 &&
          newTimeLeft.seconds === 0
        ) {
          clearInterval(timer);
        }
      }, 1000); // Update every second
    }
    return () => clearInterval(timer); // Cleanup on component unmount
  }, [currSale]);

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const closeMenu = (event) => {
      if (!event.target.closest("#navbar-user")) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("click", closeMenu);
    } else {
      document.removeEventListener("click", closeMenu);
    }

    return () => {
      document.removeEventListener("click", closeMenu);
    };
  }, [isMenuOpen]);

  return (
    <div>
      <nav className="bg-slate-100 border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src="/brandlogoup.png" className="h-5 xl:h-12" alt="" />
            <span className="self-center text-md xl:text-2xl font-semibold whitespace-nowrap text-gray-600">
              Stepup
            </span>
          </Link>
          <div className="md:hidden">
            {/* Mobile menu button */}
            <button
              className="focus:outline-none"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <svg
                className={`w-6 h-6 text-gray-600 dark:text-gray-400 ${
                  isMenuOpen ? "rotate-180" : ""
                } transition-transform duration-300`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
          <div
            className={`${
              isMenuOpen ? "block" : "hidden"
            } md:flex md:w-auto md:order-1 bg-blue-50`}
            id="navbar-user"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 bg-blue-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-blue-50 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link to="/" className="nav-link" aria-current="page">
                  Home
                </Link>
              </li>
              {auth.user ? (
                <>
                  {auth.user.role ? (
                    <li>
                      <Link to="/admin/dashboard" className="nav-link">
                        Dashboard
                      </Link>
                    </li>
                  ) : null}
                  <li>
                    <Link to="/user/profile" className="nav-link">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/user/cart"
                      className="nav-link"
                    >{`Cart (${cart.length})`}</Link>
                  </li>
                  <li>
                    <Link to="/" onClick={handleLogout} className="nav-link">
                      LogOut
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/login" className="nav-link">
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/register" className="nav-link">
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
      {currSale ? (
        <div className="pt-4 pb-4 flex justify-center bg-slate-200 shadow-md">
          <span className="text-gray-600 font-semibold">
            {currSale.name} Sale Ends in{" "}
            <span className="text-red-500">
              {`${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`}
            </span>
          </span>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Header;
