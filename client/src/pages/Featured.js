import React from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from "../components/context/cart";
import { toast } from "react-hot-toast";

const Featured = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [feat, setFeat] = useState(null);
  const [cart, setCart] = useCart();

  const getProduct = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-products`
      );
      if (response.data.count > 0) {
        setProducts(response.data.products);
        const randomIndex = Math.floor(Math.random() * response.data.count);
        setFeat(response.data.products[randomIndex]);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const handleAddToCart = () => {
    if (!feat) return; // Return early if feat is undefined

    const existingItem = cart.find((item) => item._id === feat._id);

    if (existingItem) {
      const updatedCart = cart.map((item) =>
        item._id === feat._id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...feat, quantity: 1 }]);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success("Item added to Cart");
    navigate("/cart");
  };
  useEffect(() => {
    getProduct();
  }, []);
  return (
    <div>
      {/* {JSON.stringify(product)} */}
      <main className="dark:bg-gray-800 bg-white relative overflow-hidden h-screen">
        <div className="bg-white dark:bg-gray-800 flex relative z-20 items-center overflow-hidden">
          <div className="container mx-auto px-6 flex relative py-16">
            <div className="sm:w-2/3 lg:w-2/5 flex flex-col relative z-20">
              <span className="w-20 h-2 bg-gray-800 dark:bg-white mb-12" />
              <h1 className="font-bebas-neue uppercase text-6xl sm:text-8xl font-black flex flex-col leading-none dark:text-white text-gray-800">
                {feat?.name ? <>{feat.name}</> : <>Product</>}
                <span className="text-3xl sm:text-5xl">
                  {feat?.category ? <>{feat.category.name}</> : <>Category</>}
                </span>
              </h1>
              <p className="font-bebas-neue text-sm sm:text-base text-gray-700 dark:text-white mt-3">
                {feat?.description}
              </p>
              <p className="font-bebas-neue text-sm sm:text-base text-gray-700 dark:text-white mt-3">
                <span className="font-bold">MRP:{feat?.price}$</span>
              </p>
              <p className="font-bebas-neue text-sm sm:text-base text-gray-700 dark:text-white mt-3">
                <span className="font-bold">Discount:{feat?.discount}%</span>
              </p>
              {/* <p className="font-bebas-neue uppercase text-xl text-gray-800 mt-2">{`Price: INR ${product.price}`}</p> */}
              <div className="flex mt-8">
                <Link
                  to="#"
                  className="uppercase py-2 px-4 rounded-lg bg-blue-700 border-2 border-transparent text-white text-md mr-4 hover:bg-blue-700"
                >{`Price: $${
                  (feat?.price * (100 - feat?.discount)) / 100
                }`}</Link>
                <Link
                  to="/cart"
                  onClick={handleAddToCart}
                  className="uppercase py-2 px-4 rounded-lg bg-transparent border-2 border-blue-700 text-blue-700 dark:text-white hover:bg-blue-700 hover:text-white text-md"
                >
                  Add to Cart
                </Link>
              </div>
            </div>
            <div className="hidden sm:block sm:w-1/3 lg:w-3/5 relative">
              <img
                src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${feat?._id}`}
                className="max-w-xs md:max-w-sm m-auto"
                alt="productImg"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Featured;
