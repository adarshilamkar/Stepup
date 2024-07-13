import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const PromoCarousel = ({ featuredProducts }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false); // State to track loading status

  useEffect(() => {
    setIsLoaded(false); // Reset loading state when products change

    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === featuredProducts.length - 1 ? 0 : prev + 1
      );
    }, 3000);

    // Simulate product and image loading completion after 2 seconds
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
      {/* Loader while products are not loaded */}
      {!isLoaded && (
        <div className="flex items-center justify-center absolute inset-0 bg-gray-200 bg-opacity-75 z-10">
          <p>Loading...</p>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="w-2/3 relative overflow-hidden shadow-lg">
          <div className="relative h-96">
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
                  <div className="h-96">
                    <img
                      src={`${process.env.REACT_APP_API}/api/v1/product//product-photo/${product._id}`}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      onLoad={() => setIsLoaded(true)} // Update loading state when image is loaded
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="w-1/3 bg-slate-200 text-gray-700 p-4 h-96 flex items-center justify-center flex-col ml-2">
          <div className="w-full max-w-xl">
            <p className="text-5xl font-bold mb-2">
              FLAT {featuredProducts[currentSlide]?.discount[0]} % OFF
            </p>
            <h2 className="text-3xl font-semibold mb-2">
              {featuredProducts[currentSlide]?.name}
            </h2>
            <p className="text-lg">
              {featuredProducts[currentSlide]?.description}
            </p>
          </div>
        </div>
      </div>
      <div className="absolute top-1/2 left-4 transform -translate-y-1/2 flex justify-between w-full px-4">
        {/* Arrow icons for navigation */}
        <button
          className="bg-black bg-opacity-50 text-white p-2 rounded-full"
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
          className="bg-black bg-opacity-50 text-white p-2 mr-6 rounded-full"
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
