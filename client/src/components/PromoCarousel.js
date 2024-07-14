import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const PromoCarousel = ({ featuredProducts }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(false);

    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === featuredProducts.length - 1 ? 0 : prev + 1
      );
    }, 3000);

    setTimeout(() => {
      setIsLoaded(true);
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [featuredProducts]);

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === featuredProducts.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? featuredProducts.length - 1 : prev - 1
    );
  };

  return (
    <div className="w-full max-w-screen-xl mx-auto mt-4 mb-8 px-4 relative">
      {!isLoaded && (
        <div className="flex items-center justify-center absolute inset-0 bg-gray-200 dark:bg-gray-800 bg-opacity-75 z-10">
          <p className="text-black dark:text-white">Loading...</p>
        </div>
      )}

      <div className="relative overflow-hidden shadow-lg">
        <div className="relative h-64 md:h-96">
          {featuredProducts.map((product, index) => (
            <Link to={`/product/${product._id}`} key={product._id}>
              <div
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  transform: `translateX(${index - currentSlide}00%)`,
                  opacity: index === currentSlide ? 1 : 0,
                }}
              >
                <div className="relative h-64 md:h-96">
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onLoad={() => setIsLoaded(true)}
                  />
                  {/* Discount Line */}
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 dark:bg-opacity-75 p-4 text-white">
                    <p className="text-xl md:text-3xl font-bold mb-2">
                      FLAT {product.discount[0]}% OFF
                    </p>
                    {/* Show product details on larger screens */}
                    <div className="hidden md:block">
                      <h2 className="text-lg md:text-2xl font-semibold mb-2">
                        {product.name}
                      </h2>
                      <p className="text-sm md:text-lg">
                        {product.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="absolute top-1/2 left-4 transform -translate-y-1/2 flex justify-between w-full px-4">
        <button
          className="bg-black dark:bg-gray-700 bg-opacity-20 text-white p-2 rounded-full"
          onClick={prevSlide}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          className="bg-black dark:bg-gray-700 bg-opacity-20 text-white p-2 mr-6 rounded-full"
          onClick={nextSlide}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default PromoCarousel;
