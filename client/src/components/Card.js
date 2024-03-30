import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "./context/cart";
import { useNavigate } from "react-router-dom";
const Card = ({ imageUrl, Name, Description, readLink }) => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const addToCart = () => {
    // alert(readLink);
    setCart(...cart, readLink);
    localStorage.setItem("cart", JSON.stringify(cart));
    // navigate(`${readLink}`);
  };
  return (
    <div className="w-80 p-2">
      <div className="text-center max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <Link className="flex justify-center rounded-3xl" to="#">
          <img
            className="rounded-t-lg w-72  mt-2 p-1 rounded-xl border "
            src={imageUrl}
            alt="product"
          />
        </Link>
        <div className="p-5">
          <Link to="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {Name}
            </h5>
          </Link>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {Description}
          </p>
          <div className="flex justify-evenly">
            <Link
              to={`/product/${readLink}`}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Read more
              <svg
                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </Link>
            <button
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={(e) => {
                e.preventDefault();
                addToCart();
              }}
            >
              Add to Cart
              <svg
                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
