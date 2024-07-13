import React, { useEffect, useState } from "react";
import axios from "axios";
import PromoCarousel from "../components/PromoCarousel";
import CategorySection from "../components/CategorySection";
import ProductGrid from "../components/ProductGrid";

const HomePage = () => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const API_URL = process.env.REACT_APP_API;

  useEffect(() => {
    fetchAllProducts();
    fetchAllCategories();
  }, []);


  const fetchAllProducts = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/v1/product/get-products`);
      if (data.count) {
        setProducts(data.products);
        setFeaturedProducts(getRandomProducts(data.products, 5));
      }
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  const fetchAllCategories = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/v1/category/all-categories`);
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

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* <Header /> */}
      <PromoCarousel featuredProducts={featuredProducts} />
      <CategorySection categories={categories} />
      <ProductGrid></ProductGrid>
    </div>
  );
};

export default HomePage;
