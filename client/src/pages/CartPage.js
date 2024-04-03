import React, { useEffect, useState } from "react";
import { useAuth } from "../components/context/auth";
import { useCart } from "../components/context/cart";
import { toast } from "react-hot-toast";
import axios from "axios";
const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");

  const createOrder = async () => {
    if (!address) {
      toast.error("Please enter your address!");
    } else {
      const order = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/order/cart`,
        {
          products: cart,
          user: auth?.user, 
          address,
          amount: total,
          status: "Pending",
        },
        {
          headers: {
            Authorization: `${auth.token}`,
          },
        }
      );
      if (!order) {
        toast.error("Cannot create order");
        console.log(order.data.message);
      } else {
        toast.success("created order successfully");
        console.log(order.data.message);
        localStorage.removeItem("cart");
        setCart([]);
        setAddress("");
      }
    }
  };

  const calcTotal = () => {
    let pr = 0;
    for (let i = 0; i < cart.length; i++) {
      pr += (cart[i].price * cart[i].quantity * (100 - cart[i].discount)) / 100;
    }
    setTotal(pr);
  };
  useEffect(() => {
    calcTotal();
  });
  return (
    <div>
      {auth.token ? (
        <>
          <section className="pt-0 relative z-10 after:contents-[''] after:absolute after:z-0 after:h-full xl:after:w-1/3 after:top-0 after:right-0 after:bg-gray-50">
            <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto relative z-10">
              <div className="grid grid-cols-12">
                <div className="col-span-12 xl:col-span-8 lg:pr-8 lg:py-4 w-full max-xl:max-w-3xl max-xl:mx-auto">
                  <div className="flex items-center justify-between pb-8 border-b border-gray-300">
                    <h2 className="font-manrope font-bold text-3xl leading-10 text-black">
                      Shopping Cart
                    </h2>
                    <h2 className="font-manrope font-bold text-3xl leading-10 text-black">
                      {cart.length}
                    </h2>
                  </div>
                  <div className="grid grid-cols-12 mt-8 max-md:hidden pb-6 border-b border-gray-200">
                    <div className="col-span-12 md:col-span-7">
                      <p className="font-normal text-lg leading-8 text-gray-400">
                        Product Details
                      </p>
                    </div>
                    <div className="col-span-12 md:col-span-5">
                      <div className="grid grid-cols-5">
                        <div className="col-span-3">
                          <p className="font-normal text-lg leading-8 text-gray-400 text-center">
                            Quantity
                          </p>
                        </div>
                        <div className="col-span-2">
                          <p className="font-normal text-lg leading-8 text-gray-400 text-center">
                            Total
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {cart.map((item) => (
                    <div
                      key={item._id}
                      className="flex flex-col min-[500px]:flex-row min-[500px]:items-center gap-5 py-6  border-b border-gray-200"
                    >
                      <div className="w-full md:max-w-[126px]">
                        <img
                          src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${item._id}`}
                          alt="product"
                          className="mx-auto"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-4 w-full">
                        <div className="md:col-span-2">
                          <div className="flex flex-col max-[500px]:items-center gap-3">
                            <h6 className="font-semibold text-base leading-7 text-black">
                              {item.name}
                            </h6>
                            <h6 className="font-normal text-base leading-7 text-gray-500">
                              {item.category.name}
                            </h6>
                            <h6 className="font-semibold text-base leading-7 text-indigo-600">
                              {`$${(item.price * (100 - item.discount)) / 100}`}
                            </h6>
                          </div>
                        </div>
                        <div className="flex items-center max-[500px]:justify-center h-full max-md:mt-3">
                          <div className="flex items-center h-full">
                            <p className="ml-20">{item.quantity}</p>
                          </div>
                        </div>
                        <div className="flex items-center max-[500px]:justify-center md:justify-end max-md:mt-3 h-full">
                          <p className="font-bold text-lg leading-8 text-indigo-600 text-center">
                            {`$${
                              (item.price *
                                item.quantity *
                                (100 - item.discount)) /
                              100
                            }`}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className=" col-span-12 xl:col-span-4 bg-gray-50 w-full max-xl:px-6 max-w-3xl xl:max-w-lg mx-auto lg:pl-8 py-24">
                  <h2 className="font-manrope font-bold text-3xl leading-10 text-black pb-8 border-b border-gray-300">
                    Order Summary
                  </h2>
                  <div className="mt-8">
                    <div className="flex items-center justify-between pb-6">
                      <p className="font-normal text-lg leading-8 text-black">
                        {cart.length}
                      </p>
                      <p className="font-medium text-lg leading-8 text-black">
                        $ {total}
                      </p>
                    </div>
                    <div>
                      <label className="flex  items-center mb-1.5 text-gray-600 text-sm font-medium">
                        Shipping Address
                      </label>
                      <div className="flex pb-6">
                        <div className="relative w-full">
                          <div className=" absolute left-0 top-0 py-3 px-4"></div>
                          <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="block w-full h-11 p-2 font-normal shadow-xs text-gray-900 bg-white border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-gray-400"
                            placeholder="Hostel H NIT"
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between py-8">
                        <p className="font-medium text-xl leading-8 text-black">
                          {cart.length} Items
                        </p>
                        <p className="font-semibold text-xl leading-8 text-indigo-600">
                          $ {total}
                        </p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          createOrder();
                        }}
                        className="w-full text-center bg-indigo-600 rounded-full py-4 px-6 font-semibold text-lg text-white transition-all duration-500 hover:bg-indigo-700"
                      >
                        Checkout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        <>Please Sign In to access Cart</>
      )}
    </div>
  );
};

export default CartPage;
