// frontend/src/PaymentForm.js
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const PaymentForm = () => {
  const [amount, setAmount] = useState("");

  const handlePayment = async () => {
    // Validate the custom amount
    if (!amount || isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    try {
      // Send the custom amount to the backend to create an order
      const response = await axios.post(
        `http://localhost:8000/api/v1/payment/${amount}`
      );
      const { data } = response;

      // Set up Razorpay payment options
      const options = {
        key: "rzp_test_YablPwPJuBNAjh", // Replace with your Razorpay Key ID
        amount: data.amount,
        currency: data.currency,
        order_id: data.id,
        name: "Ecom",
        description: "Custom Payment",
        image: "https://example.com/logo.png", // Replace with your logo URL
        handler: function (response) {
          // Handle payment success
          toast.success("Payment successful!");
          console.log("Payment ID:", response.razorpay_payment_id);
        },
        prefill: {
          name: "Your Name", // Prefill with user data
          email: "your.email@example.com",
          contact: "1234567890",
        },
        theme: {
          color: "#3549cc",
        },
      };

      // Open the Razorpay payment interface
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("Error initiating payment");
    }
  };

  return (
    <div>
      <h2>Enter Custom Amount</h2>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
      />
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
};

export default PaymentForm;
