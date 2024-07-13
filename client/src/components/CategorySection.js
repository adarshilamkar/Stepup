import React from "react";
import { Link } from "react-router-dom";

const CategorySection = ({ categories }) => {
  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Shop by Category
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link to={`/category/${category._id}`}>
            <div key={category._id} className="relative group">
              <img
                src={`${category.image}`}
                alt={category.name}
                className="h-48 w-full object-cover rounded-md group-hover:opacity-75"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white text-xl font-bold">
                  {category.name}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
