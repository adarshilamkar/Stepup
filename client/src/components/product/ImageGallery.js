import React, { useState } from "react";

export const ProductImageGallery = ({ images }) => {
  const [mainImage, setMainImage] = useState(images[0]);
  const [animationClass, setAnimationClass] = useState("");

  const handleImageChange = (image, direction) => {
    if (image !== mainImage) {
      if (direction === "next") {
        setAnimationClass("animate-slideOutLeft");
      } else if (direction === "prev") {
        setAnimationClass("animate-slideOutRight");
      }
      setTimeout(() => {
        setMainImage(image);
        setAnimationClass(
          direction === "next" ? "animate-slideInRight" : "animate-slideInLeft"
        );
      }, 500); // Match this duration with your CSS transition
    }
  };

  const getDirection = (currentIndex, newIndex) => {
    return newIndex > currentIndex ? "next" : "prev";
  };

  return (
    <div className="flex flex-col items-center mb-2">
      {/* Main Image Display */}
      <div className="mb-4 relative">
        <img
          src={mainImage}
          alt="Main Product"
          className={`w-[60vw] h-[75vh] object-cover border border-gray-200 rounded transition-transform duration-500 ease-in-out ${animationClass}`}
        />
      </div>

      {/* Thumbnail Images */}
      <div className="flex space-x-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() =>
              handleImageChange(
                image,
                getDirection(images.indexOf(mainImage), index)
              )
            }
            className="focus:outline-none"
          >
            <img
              src={image}
              alt={`Product Thumbnail ${index + 1}`}
              className={`w-[10vw] h-16 object-cover border border-gray-200 rounded hover:opacity-75 transition duration-100 ${
                mainImage === image ? "ring-2 ring-indigo-500" : ""
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductImageGallery;
