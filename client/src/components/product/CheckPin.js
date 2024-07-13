import React, { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";

export const CheckPincode = () => {
  const [pincode, setPincode] = useState("");
  const [pindet, setPindet] = useState(null);

  const handleCheckPincode = async () => {
    // Validate Pincode length
    if (pincode.length !== 6) {
      toast.error("Enter a valid 6-digit Pincode");
      return;
    }

    try {
      // Make the API call
      // const response = await axios.get(
      //   `${process.env.REACT_APP_API}/api/v1/pin/${pincode}`
      // );
      const availcodes = ["281001", "492010", "281204", "492001"];

      // Check if the response contains the required data
      // if (response.data && response.data.pindetails) {
      //   setPindet(response.data); // Update to access the first item in the array
      // } else {
      //   setPindet(null); // Clear the previous state if no data is found
      //   toast.error("No data available for this pincode");
      // }
      for (let i = 0; i < 4; i++) {
        if (availcodes[i] === pincode) {
          // toast.success("Pincode is available");
          setPindet("Delivery available at this pincode");
          return;
        }
        setPindet("Delivery unavailable");
      }
    } catch (error) {
      // Handle errors gracefully
      toast.error("Failed to fetch pincode details");
      console.error("Error fetching pincode details:", error);
    }
  };

  return (
    <div className="flex flex-col items-start mt-2">
      <h2 className="text-md my-2 font-semibold">
        Check Delivery Availability
      </h2>
      <div className="flex space-x-2">
        <input
          type="number"
          placeholder="Enter Pincode"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          className="px-3.5 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={handleCheckPincode}
          className="ml-2 font-semibold text-indigo-500 hover:text-indigo-600 transition duration-300"
        >
          Check
        </button>
      </div>
      {pindet && (
        <div className="mt-4 text-sm font-medium text-gray-700">{pindet}</div>
      )}
    </div>
  );
};

export default CheckPincode;
