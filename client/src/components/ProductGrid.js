import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../components/Card";

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [selectedCat, setSelectedCat] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortBy, setSortBy] = useState("newest");
  const [sliderMaxPrice, setSliderMaxPrice] = useState(100000);
  const API_URL = process.env.REACT_APP_API;

  const fetchAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${API_URL}/api/v1/product/get-products`
      );
      if (data.count) {
        setProducts(data.products);

        let maxi = 0;
        for (let i = 0; i < data.products.length; i++) {
          maxi = Math.max(maxi, data.products[i].price[0]);
        }
        setMaxPrice(maxi);
        setSliderMaxPrice(maxi); // Set slider max price
      }
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  const fetchAllCategories = async () => {
    try {
      const { data } = await axios.get(
        `${API_URL}/api/v1/category/all-categories`
      );
      if (data) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };

  const handleCategoryCheckboxChange = (event) => {
    const category = event.target.value;
    setSelectedCat(
      (prevSelected) =>
        event.target.checked
          ? [...prevSelected, category] // Add category if checked
          : prevSelected.filter((cat) => cat !== category) // Remove category if unchecked
    );
  };

  const handleSliderChange = (event) => {
    setSliderMaxPrice(event.target.value);
  };

  useEffect(() => {
    fetchAllProducts();
    fetchAllCategories();
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      let filtered = products;

      // Filter by selected categories
      if (selectedCat.length > 0) {
        filtered = filtered.filter((product) =>
          selectedCat.includes(product.category._id)
        );
      }

      // Filter by price range
      filtered = filtered.filter(
        (product) => parseInt(product.price[0]) <= sliderMaxPrice
      );

      // Sort by selected criteria
      filtered = filtered.sort((a, b) => {
        const dateA = new Date(a.updatedAt);
        const dateB = new Date(b.updatedAt);

        if (sortBy === "newest") {
          return dateB - dateA;
        } else if (sortBy === "oldest") {
          return dateA - dateB;
        } else if (sortBy === "discount") {
          return b.discount[0] - a.discount[0];
        } else if (sortBy === "price-low") {
          return a.price[0] - b.price[0];
        } else if (sortBy === "price-high") {
          return b.price[0] - a.price[0];
        } else {
          return 0;
        }
      });

      setFilteredProducts(filtered);
    };

    applyFilters();
  }, [products, selectedCat, sliderMaxPrice, sortBy]);

  return (
    <div className="container mx-auto px-4 py-10">
      {/* {JSON.stringify(products)} */}
      <div className="flex justify-between items-center mb-4 lg:mb-6">
        <label
          htmlFor="sort"
          className="text-lg font-medium text-gray-700 dark:text-white transition duration-300"
        >
          <span className="p-2">Sort by:</span>
        </label>
        <select
          id="sort"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="p-2 font-semibold block border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-300"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="discount">Discount</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
      </div>
      <div className="flex flex-col lg:flex-row">
        {/* Filters */}
        <div className="w-1/4 bg-blue-50 dark:bg-gray-800 rounded-lg p-6 shadow-md mb-6 mr-5">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
            Filters
          </h2>
          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-700 dark:text-white">
              Max Price
            </h3>
            <div className="mt-2">
              <input
                type="range"
                min={0}
                max={maxPrice}
                value={sliderMaxPrice}
                onChange={handleSliderChange}
                className="w-full"
              />
              <div className="flex justify-between text-gray-700 dark:text-gray-300">
                <span>₹{"0"}</span>
                <span>₹{sliderMaxPrice}</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-700 dark:text-white">
              Categories
            </h3>
            <div className="mt-2 space-y-2">
              {categories.map((category, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="checkbox"
                    value={category._id}
                    onChange={handleCategoryCheckboxChange}
                    className="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
                  />
                  <span className="ml-2 text-gray-700 dark:text-gray-300">
                    {category.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Product Cards */}
        {/* {JSON.stringify(products)} */}
        <div className="w-full lg:w-3/4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Card
                key={product._id}
                product={product}
                price={product.price[0]}
                discount={product.discount[0]}
                imageUrl={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
                Name={product.name}
                Description={`${product.description[0].substring(0, 100)}...`}
                readLink={product._id}
                className="transition duration-300 transform hover:scale-105"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
