import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../components/context/auth";
import toast from "react-hot-toast";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const cancelOrder = async (id) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/order/delete/${id}`
    );
    if (response.data.success) {
      toast.success(response.data.message);
      getOrders();
    }
  };
  //get orders data
  const getOrders = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/order/myorders`,
        { user: auth?.user?._id } // Sending user ID as "user" field
      );
      if (response.data.success) {
        const ordersArray = Object.values(response.data.orders);
        setOrders(ordersArray); // Set the converted array to state
        // if (response.data.orders.length) toast.success(response.data.message);
      }
    } catch (error) {
      // Handle errors
      // console.error("Error fetching orders:", error);
      // toast.error("Failed to fetch orders");
      // setTimeout(() => {
      //   window.location.reload();
      // }, 2000);
    }
  };
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const options = { month: "long", day: "numeric", year: "numeric" };
    return date.toLocaleString("en-US", options);
  };
  useEffect(() => {
    getOrders();
  }, [auth]);
  return (
    <div>
      {orders ? (
        <>
          {orders?.map((order) => (
            <section key={order._id} className="py-10 relative">
              <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
                <div className="main-box border border-gray-200 dark:border-gray-800 rounded-xl pt-6 max-w-xl max-lg:mx-auto lg:max-w-full">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between px-6 pb-6 border-b border-gray-200">
                    <div className="data">
                      <p className="font-semibold text-base leading-7 text-gray-800 dark:text-white">
                        Order Id:{" "}
                        <span className="text-indigo-600 font-medium">
                          {order._id}
                        </span>
                      </p>
                      <p className="font-semibold text-base leading-7 text-gray-800 dark:text-white mt-4">
                        Order Payment :{" "}
                        <span className="text-gray-400 font-medium">
                          {" "}
                          {formatDate(order.createdAt)}
                        </span>
                      </p>
                    </div>
                    <p class=" py-3 px-7 font-semibold text-sm leading-7 max-lg:mt-5">
                      <p className="font-semibold text-base leading-7 text-gray-800 dark:text-white mt-4">
                        Shipping Address :{" "}
                        <span className="text-gray-400 font-medium">
                          {" "}
                          {order.address}
                        </span>
                      </p>
                    </p>
                  </div>
                  {order.products.map((product) => (
                    <div
                      key={product._id}
                      className="w-full px-3 min-[400px]:px-6"
                    >
                      <div className="flex flex-col lg:flex-row items-center py-6 gap-6 w-full">
                        <div className="img-box max-lg:w-full">
                          <img
                            src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
                            alt="product"
                            className="aspect-square w-full lg:max-w-[140px]"
                          />
                        </div>
                        <div className="flex flex-row items-center w-full ">
                          <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
                            <div className="flex items-center">
                              <div className>
                                <h2 className="font-semibold text-xl leading-8 text-gray-800 dark:text-white mb-3 ">
                                  {product.name}
                                </h2>
                                <p className="font-normal text-lg leading-8 text-gray-500 mb-3">
                                  {product.category.name}
                                </p>
                                <div className="flex items-center  ">
                                  <p className="font-medium text-base leading-7 text-gray-800 dark:text-white ">
                                    Qty:{" "}
                                    <span className="text-gray-500">
                                      {product.quantity}
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="grid grid-cols-5">
                              <div className="col-span-5 lg:col-span-1 flex items-center max-lg:mt-3">
                                <div className="flex gap-3 lg:block">
                                  <p className="font-medium text-sm leading-7 text-gray-800 dark:text-white">
                                    Price
                                  </p>
                                  <p className="lg:mt-4 font-medium text-sm leading-7 text-indigo-600">
                                    $ {product.price}
                                  </p>
                                </div>
                              </div>
                              <div className="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3 ">
                                <div className="flex gap-3 lg:block">
                                  <p className="font-medium text-sm leading-7 text-gray-800 dark:text-white">
                                    Status
                                  </p>
                                  <p className="font-medium text-sm leading-6 py-0.5 px-3 whitespace-nowrap rounded-full lg:mt-3 bg-indigo-50 text-indigo-600">
                                    {order.status}
                                  </p>
                                </div>
                              </div>
                              <div className="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3">
                                <div className="flex gap-3 lg:block">
                                  <p className="font-medium text-sm whitespace-nowrap leading-6 text-gray-800 dark:text-white">
                                    Expected Delivery
                                  </p>
                                  <p className="font-medium text-base whitespace-nowrap leading-7 lg:mt-3 text-emerald-500">
                                    In {Math.floor(Math.random() * 7)} Days
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="w-full border-t border-gray-200 px-6 flex flex-col lg:flex-row items-center justify-between ">
                    <div className="flex flex-col sm:flex-row items-center max-lg:border-b border-gray-200 dark:border-gray-800">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          cancelOrder(order._id);
                        }}
                        className="flex outline-0 py-6 sm:pr-6  sm:border-r border-gray-200  dark:text-white whitespace-nowrap gap-2 items-center justify-center font-semibold group text-lg text-gray-800 bg-white dark:bg-gray-900 rounded-xl transition-all duration-500 hover:text-indigo-600 dark:border-gray-800"
                      >
                        <svg
                          className="stroke-black dark:stroke-white transition-all duration-500 group-hover:stroke-indigo-600"
                          xmlns="http://www.w3.org/2000/svg"
                          width={22}
                          height={22}
                          viewBox="0 0 22 22"
                          fill="none"
                        >
                          <path
                            d="M5.5 5.5L16.5 16.5M16.5 5.5L5.5 16.5"
                            stroke
                            strokeWidth="1.6"
                            strokeLinecap="round"
                          />
                        </svg>
                        Cancel Order
                      </button>
                    </div>
                    <p className="font-semibold text-lg text-gray-800 dark:text-white py-6">
                      Total Price:{" "}
                      <span className="text-indigo-600"> ${order.amount}</span>
                    </p>
                  </div>
                </div>
              </div>
            </section>
          ))}
        </>
      ) : (
        <>Fetching Data</>
      )}
    </div>
  );
};

export default MyOrders;
