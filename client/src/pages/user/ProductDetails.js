import React from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const getProductDetails = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.id}`
    );
    setProduct(res.data.product);
  };
  useEffect(() => {
    getProductDetails();
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
                {product.name ? <>{product.name}</> : <>Product</>}
                <span className="text-3xl sm:text-5xl">
                  {product.category ? (
                    <>{product.category.name}</>
                  ) : (
                    <>Category</>
                  )}
                </span>
              </h1>
              <p className="font-bebas-neue text-sm sm:text-base text-gray-700 dark:text-white mt-3">
                {product.description}
              </p>
              {/* <p className="font-bebas-neue uppercase text-xl text-gray-800 mt-2">{`Price: INR ${product.price}`}</p> */}
              <div className="flex mt-8">
                <Link
                  to="#"
                  className="uppercase py-2 px-4 rounded-lg bg-blue-700 border-2 border-transparent text-white text-md mr-4 hover:bg-blue-700"
                >{`Price: $${product.price}`}</Link>
                <Link
                  to="#"
                  className="uppercase py-2 px-4 rounded-lg bg-transparent border-2 border-blue-700 text-blue-700 dark:text-white hover:bg-blue-700 hover:text-white text-md"
                >
                  Add to Cart
                </Link>
              </div>
            </div>
            <div className="hidden sm:block sm:w-1/3 lg:w-3/5 relative">
              <img
                src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
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

export default ProductDetails;
