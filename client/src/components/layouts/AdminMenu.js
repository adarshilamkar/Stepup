import React from "react";
import { Link } from "react-router-dom";

const AdminMenu = () => {
  return (
    <div className="mx-5">
      <div>
        <Link
          className="text-white bg-blue-700 border border-blue-700 rounded-md  text-center my-1 inline-block w-full p-2"
          to={"/admin/users"}
        >
          Users
        </Link>
      </div>
      <div>
        <Link
          className="text-white bg-blue-700 border border-blue-700 rounded-md  text-center my-1 inline-block w-full p-2"
          to={"/admin/orders"}
        >
          Orders
        </Link>
      </div>
      <div>
        <Link
          className="text-white bg-blue-700 border border-blue-700 rounded-md  text-center my-1 inline-block w-full p-2"
          to={"/admin/products"}
        >
          Products
        </Link>
      </div>
      <div>
        <Link
          className="text-white bg-blue-700 border border-blue-700 rounded-md  text-center my-1 inline-block w-full p-2"
          to={"/admin/categories"}
        >
          Categories
        </Link>
      </div>
      <div>
        <Link
          className="text-white bg-blue-700 border border-blue-700 rounded-md  text-center my-1 inline-block w-full p-2"
          to={"/admin/sale"}
        >
          Sale
        </Link>
      </div>
    </div>
  );
};

export default AdminMenu;
