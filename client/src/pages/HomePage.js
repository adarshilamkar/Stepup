import React, { useEffect, useState } from "react";
import axios from "axios";
import PromoCarousel from "../components/PromoCarousel";
import CategorySection from "../components/CategorySection";
import ProductGrid from "../components/ProductGrid";
import Loader from "../components/Loader"; // Import the Loader component

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading indicator
  var API_URL = process.env.REACT_APP_API_THIRD;
  if (API_URL.length < 10) API_URL = process.env.REACT_APP_API_SECOND;
  if (API_URL.length < 10) API_URL = process.env.REACT_APP_API;

  useEffect(() => {
    fetchAllProducts();
    fetchAllCategories();
  }, []);

  const fetchAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${API_URL}/api/v1/product/get-products`
      );
      if (data.count) {
        setProducts(data.products);
        setFeaturedProducts(getRandomProducts(data.products, 5));
      }
    } catch (error) {
      console.error("Error fetching products", error);
    } finally {
      setLoading(false); // Set loading to false when fetching is complete
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

  const getRandomProducts = (products, count) => {
    return products.sort(() => 0.5 - Math.random()).slice(0, count);
  };

  if (loading) {
    return <Loader />; // Display the Loader component while loading
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* <Header /> */}
      <PromoCarousel featuredProducts={featuredProducts} />
      <CategorySection categories={categories} />
      <ProductGrid products={products} />
    </div>
  );
};

export default HomePage;
