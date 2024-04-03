import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";

const Deals = () => {
  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/product/deals`
    );
    if (response.data.count) {
      setProducts(response.data.products);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <p className="block text-center my-3 text-2xl font-bold tracking-tight text-gray-800 dark:text-white">
        Hurry Up!! Discount Hours Running Out
      </p>
      <div className="flex flex-wrap justify-center">
        <div className="flex flex-wrap justify-evenly w-10/12">
          {products.map((product) => (
            <Card
              product={product}
              discount={product.discount}
              imageUrl={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
              Name={product.name}
              Description={`${product.description.substring(0, 35)}...`}
              readLink={product._id}
              key={product._id}
            ></Card>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Deals;
