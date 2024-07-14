import React, { useEffect, useState } from "react";
import { useAuth } from "../components/context/auth";
import { useCart } from "../components/context/cart";
import { toast } from "react-hot-toast";
import axios from "axios";

// Loader component to display while data is loading
const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  );
};

const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const [total, setTotal] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [can, setCan] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Loading state

  // Fetch cart data and set loading state accordingly
  useEffect(() => {
    // Simulate loading delay with setTimeout (replace with actual API call)
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Adjust timeout as needed for your use case
  }, []);

  const handlePayment = async () => {
    // Pincode validation
    if (pincode.length !== 6) {
      toast.error("Enter a valid 6-digit Pincode");
      setCan(false);
      return;
    }

    try {
      // Check if delivery is available at the pincode
      const availcodes = ["281001", "492010", "281204", "492001"];
      let k = false;
      for (let i = 0; i < 4; i++) {
        if (availcodes[i] === pincode) {
          setCan(true);
          k = true;
        }
      }
      if (!k) {
        toast.error("Delivery not available at this address");
        setCan(false);
      }
    } catch (error) {
      toast.error("Failed to fetch pincode details");
      console.error("Error fetching pincode details:", error);
    }

    // If delivery available, proceed with payment
    if (can) {
      if (total <= 0) {
        toast.error("Please add some items to your cart");
        return;
      } else if (!address) {
        toast.error("Please enter your address");
        return;
      }
      if (!total || isNaN(total) || total <= 0) {
        toast.error("Please enter a valid amount");
        return;
      }

      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API}/api/v1/payment/${parseInt(total)}`
        );
        const { data } = response;

        const options = {
          key: "rzp_test_YablPwPJuBNAjh", // Replace with your Razorpay Key ID
          amount: data.amount,
          currency: data.currency,
          order_id: data.id,
          name: "StepUp",
          description: "Custom Payment",
          image: "https://example.com/logo.png", // Replace with your logo URL
          handler: function (response) {
            toast.success("Payment successful!");
            createOrder(response.razorpay_payment_id);
          },
          prefill: {
            name: `${auth.user.name}`,
            email: `${auth.user.email}`,
            contact: `${auth.user.phone}`,
          },
          theme: {
            color: "#3549cc",
          },
          modal: {
            ondismiss: function () {
              toast.error("Payment cancelled.");
            },
            width: "500px", // Custom width
            height: "400px", // Custom height
          },
          // Custom CSS
          customCSS: {
            "@import":
              "url('https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css')",
            modal: {
              "max-height": "400px !important",
              "overflow-y": "auto !important",
            },
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } catch (error) {
        console.error("Error creating order:", error);
        toast.error("Error initiating payment");
      }
    }
  };

  // Calculate total price and total item count of the cart
  const calcTotal = () => {
    if (cart.length > 0) {
      let totalPrice = 0;
      let itemCount = 0;
      for (let i = 0; i < cart.length; i++) {
        const itemPrice =
          (cart[i].price[cart[i].productno] *
            (100 - cart[i].discount[cart[i].productno])) /
          100;
        totalPrice += itemPrice * cart[i].quantity;
        itemCount += cart[i].quantity;
      }
      setTotal(totalPrice);
      setTotalItems(itemCount); // Update total item count
    } else {
      setTotal(0); // If cart is empty, total should be 0
      setTotalItems(0); // If cart is empty, total item count should be 0
    }
  };

  // Effect to recalculate total and total items whenever cart changes
  useEffect(() => {
    calcTotal();
  }, [cart]);

  // Handle quantity increase
  const handleIncreaseQuantity = (index) => {
    const newCart = [...cart];
    newCart[index].quantity += 1;
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart)); // Update local storage
    calcTotal(); // Recalculate totals after updating cart
  };

  // Handle quantity decrease
  const handleDecreaseQuantity = (index) => {
    const newCart = [...cart];
    if (newCart[index].quantity > 1) {
      newCart[index].quantity -= 1;
    } else {
      newCart.splice(index, 1); // Remove the item if its quantity reaches 0
      toast.success("Item removed from cart");
    }
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart)); // Update local storage
    calcTotal(); // Recalculate totals after updating cart
  };

  // Create order
  const createOrder = async (paymentId) => {
    try {
      const order = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/order/cart`,
        {
          products: cart,
          user: auth?.user,
          address,
          amount: parseInt(total),
          paymentId: paymentId,
          status: "Pending",
        },
        {
          headers: {
            Authorization: `${auth.token}`,
          },
        }
      );
      if (!order) {
        toast.error("Cannot place order");
        console.log(order.data.message);
      } else {
        // toast.success("Created order successfully");
        console.log(order.data.message);
        localStorage.removeItem("cart");
        setCart([]);
        setAddress("");
        setPincode("");
      }
    } catch (error) {
      // toast.error("Failed to create order");
      console.error("Error creating order:", error);
    }
  };

  if (isLoading) {
    return <Loader />; // Show loader while data is loading
  }

  return (
    <div>
      {auth.token ? (
        <>
          <section className="pt-0 relative z-10 after:contents-[''] after:absolute after:z-0 after:h-full xl:after:w-1/3 after:top-0 after:right-0 after:bg-gray-50 dark:after:bg-gray-800">
            <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto relative z-10">
              <div className="grid grid-cols-12">
                <div className="col-span-12 xl:col-span-8 lg:pr-8 lg:py-4 w-full max-xl:max-w-3xl max-xl:mx-auto">
                  <div className="flex items-center justify-between pb-8 border-b border-gray-300">
                    <h2 className="mt-2 font-manrope font-bold text-xl xl:text-3xl leading-10 text-gray-800 dark:text-white">
                      Shopping Cart
                    </h2>
                    <h2 className="mt-2 font-manrope font-bold text-xl xl:text-3xl leading-10 text-gray-800 dark:text-white">
                      {totalItems} Items
                    </h2>{" "}
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

                  {cart.map((item, index) => (
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
                            <h6 className="font-semibold text-base leading-7 text-gray-800 dark:text-white">
                              {item.name}
                            </h6>
                            <h6 className="font-normal text-base leading-7 text-gray-500">
                              {item.type ? (
                                <>{item.type[item.productno]}</>
                              ) : (
                                <>{item.model[item.productno]}</>
                              )}
                            </h6>
                            <h6 className="font-semibold text-base leading-7 text-indigo-600">
                              {`₹${
                                (item.price[item.productno] *
                                  (100 - item.discount[item.productno])) /
                                100
                              }`}
                            </h6>
                          </div>
                        </div>
                        <div className="flex items-center max-[500px]:justify-center h-full max-md:mt-3">
                          <div className="flex items-center h-full">
                            <button
                              className="text-indigo-600 font-bold  text-2xl mx-2"
                              onClick={() => handleDecreaseQuantity(index)}
                            >
                              -
                            </button>
                            <p className="ml-2 mr-2 text-gray-800 dark:text-white">
                              {item.quantity}
                            </p>
                            <button
                              className="text-indigo-600 font-bold text-2xl mx-2"
                              onClick={() => handleIncreaseQuantity(index)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="flex items-center max-[500px]:justify-center md:justify-end max-md:mt-3 h-full">
                          <p className="font-bold text-lg leading-8 text-indigo-600 text-center">
                            {`₹${parseInt(
                              (item.price[item.productno] *
                                item.quantity *
                                (100 - item.discount[item.productno])) /
                                100
                            )}`}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className=" col-span-12 xl:col-span-4 bg-gray-50 dark:bg-gray-800 w-full max-xl:px-6 max-w-3xl xl:max-w-lg mx-auto lg:pl-8 py-5 xl:py-24">
                  <h2 className="font-manrope font-bold text-xl xl:text-3xl leading-10 text-black pb-8 border-b border-gray-300 dark:text-white">
                    Order Summary
                  </h2>
                  <div className="mt-8">
                    <div className="flex items-center justify-between pb-6">
                      <p className="font-normal text-lg leading-8 text-gray-800 dark:text-white">
                        {totalItems} Items {/* Display total item count */}
                      </p>
                      <p className="font-medium text-lg leading-8 text-gray-800 dark:text-white">
                        ₹ {parseInt(total)}
                      </p>
                    </div>
                    <div>
                      <label className="flex items-center mb-1.5 text-gray-800 dark:text-white text-sm font-medium">
                        Shipping Address
                      </label>
                      <div className="flex pb-1">
                        <div className="relative w-full">
                          <textarea
                            className="px-3 py-2 w-full outline-none rounded-lg resize-none text-lg  text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-300"
                            rows="2"
                            placeholder="Enter your address here"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="flex flex-col items-start mt-1 mb-3">
                        <div className="flex">
                          <input
                            type="number"
                            placeholder="Enter Pincode"
                            value={pincode}
                            onChange={(e) => setPincode(e.target.value)}
                            className="px-5 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-300"
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <p className="font-medium text-xl leading-8 text-gray-800 dark:text-white">
                          Total
                        </p>
                        <p className="font-semibold text-xl leading-8 text-indigo-600">
                          ₹ {parseInt(total)}
                        </p>
                      </div>

                      <button
                        onClick={handlePayment}
                        className="w-full text-center bg-indigo-600 rounded-full py-4 px-6 font-semibold text-lg text-white transition-all duration-500 hover:bg-indigo-700"
                      >
                        Place Order
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        <p className="text-center text-xl font-semibold text-gray-800 dark:text-white">
          Please log in to view your cart.
        </p>
      )}
    </div>
  );
};

export default CartPage;
