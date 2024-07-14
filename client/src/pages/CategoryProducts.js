import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Card from "../components/Card";

const CategoryProducts = () => {
  const { id } = useParams(); // Get the category ID from the URL parameters
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_URL = process.env.REACT_APP_API;

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const { data } = await axios.get(
          `${API_URL}/api/v1/product/get-products`
        );
        if (data.count) {
          let pro = data.products.filter(
            (product) => product.category._id === id
          );
          setProducts(pro);
        }
      } catch (error) {
        console.error("Error fetching products", error);
        setError("Failed to fetch products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchAllProducts();
  }, [id, API_URL]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-5 xl:py-10">
      <h2 className="text:md xl:text-2xl font-bold mb-3 xl:mb-6 text-center dark:text-white">
        Products in Category {products[0]?.category?.name}
      </h2>
      {products.length === 0 ? (
        <div className="text-gray dark:text-white">
          No products found in this category.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-4 xl:mx-0">
          {products.map((product) => (
            <Card
              key={product._id}
              product={product}
              price={product.price[0]}
              discount={product.discount[0]}
              imageUrl={`${API_URL}/api/v1/product/product-photo/${product._id}`}
              Name={product.name}
              Description={`${product.description[0].substring(0, 100)}...`}
              readLink={product._id}
              className="transition duration-300 transform hover:scale-105"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryProducts;
