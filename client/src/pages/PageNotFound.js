import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div>
      <div className="text-center text-gray-800">
        <div>Page Not Found</div>
        <div className="mt-5">
          <Link
            to={"/"}
            className="p-2 border border-blue-700 text-white bg-blue-700 rounded-md"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
