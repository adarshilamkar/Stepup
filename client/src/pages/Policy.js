import React from "react";
import { Link } from "react-router-dom";

const Policy = () => {
  return (
    <div className="text-center text-gray-800">
      <div>Privacy Policy</div>
      <div className="mt-5">
        <Link
          to={"/"}
          className="p-2 border border-blue-700 text-white bg-blue-700 rounded-md"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Policy;
