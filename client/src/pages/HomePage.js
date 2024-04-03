import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";
import { Checkbox } from "antd";
import { useCart } from "../components/context/cart";

const HomePage = () => {
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [minprice, setMinPrice] = useState(0);
  const [maxprice, setMaxPrice] = useState(9999999);
  const getAllProducts = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/product/get-products`
    );
    if (response.data.count) {
      setProducts(response.data.products);
    }
  };
  const getAllCategories = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/category/all-categories`
    );
    if (response.data) {
      setCategories(response.data.categories);
    }
  };
  const handleFilters = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  // get filtered products
  const filterProduct = async () => {
    const { data } = await axios.post(
      `${process.env.REACT_APP_API}/api/v1/product/product-filters`,
      { checked }
    );
    setProducts(data?.products);
  };
  useEffect(() => {
    getAllCategories();
  }, []);
  useEffect(() => {
    if (checked.length === 0) getAllProducts();
  }, [checked]);
  useEffect(() => {
    if (checked.length) {
      filterProduct();
    }
  }, [checked]);

  return (
    <div className="flex flex-wrap justify-center mx-2 mt-3 dark:bg-gray-900">
      {/* {JSON.stringify(cart)} */}
      <div className="w-2/12 inline-block border-red-700 overflow-x-hidden bg-blue-50  rounded-xl py-4 px-7 dark:bg-gray-800 dark:text-white">
        <h2 className="text-center font-bold text-gray-800 dark:text-white">
          Filters
        </h2>
        <h3 className="text-center text-gray-700 mt-1 dark:text-white">
          Min Price
        </h3>
        <input
          className="border border-gray-800 rounded-md p-1.5 decoration:none w-full mt-1 text-gray-800 dark:text-gray-800 dark:bg-blue-100"
          type="number"
          name="minprice"
          value={minprice}
          onChange={(e) => {
            setMinPrice(e.target.value);
          }}
        />
        <h3 className="text-center text-gray-700 mt-2 dark:text-white">
          Max Price
        </h3>
        <input
          className="border border-gray-800 rounded-md p-1.5 decoration:none w-full mt-1 text-gray-700 dark:text-gray-800 dark:bg-blue-100"
          type="number"
          name="maxprice"
          value={maxprice}
          onChange={(e) => {
            setMaxPrice(e.target.value);
          }}
        />
        <h3 className="text-center text-gray-700 mt-2 dark:text-white">
          Categories
        </h3>
        <div className="flex flex-wrap">
          {categories.map((category) => (
            <div className="w-full p-1 text-xl">
              <Checkbox
                className=" text-gray-700 px-8 dark:text-white"
                key={category._id}
                onChange={(e) => {
                  e.preventDefault();
                  handleFilters(e.target.checked, category._id);
                }}
              >
                {category.name}
              </Checkbox>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap justify-evenly w-10/12">
        {products.map(
          (product) =>
            product.price >= minprice &&
            product.price <= maxprice && (
              <Card
                product={product}
                discount={product.discount}
                imageUrl={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
                Name={product.name}
                Description={`${product.description.substring(0, 30)}...`}
                readLink={product._id}
                key={product._id}
              ></Card>
            )
        )}
      </div>
    </div>
  );
};
export default HomePage;
