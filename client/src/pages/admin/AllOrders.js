import React from "react";
import AdminMenu from "../../components/layouts/AdminMenu";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const AllOrders = () => {
  const [orders, setOrders] = useState();
  const getOrders = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/order/get-all-orders`
    );
    if (response.data.success) {
      setOrders(response.data.orders);
    }
  };
  const handleEdit = async () => {
    console.log("hello");
  };
  const handleDelete = async (order) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/order/delete/${order._id}`
    );
    if (response.data.success) {
      toast.success(response.data.message);
      getOrders();
    }
  };
  useEffect(() => {
    getOrders();
  }, []);
  return (
    <div>
      <AdminMenu></AdminMenu>
      <div className="mx-5 mt-2">
        <div className="font-bold text-center my-5 text-gray-800 dark:text-white">
          All Orders
        </div>
        <div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    OrderId
                  </th>
                  <th scope="col" className="px-6 py-3">
                    User
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Address
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders?.map((order) => (
                  <>
                    <tr
                      key={order._id}
                      className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {order._id}
                      </th>
                      <td className="px-6 py-4">{order?.user}</td>
                      <td className="px-6 py-4">{order.amount}</td>
                      <td className="px-6 py-4">{order.address}</td>
                      <td className="px-6 py-4 border border-blue-200  dark:border-gray-600">
                        {order.status}
                      </td>
                      <td className="px-6 py-4">
                        <Link
                          onClick={handleEdit}
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          Edit
                        </Link>
                        <Link
                          onClick={(e) => {
                            e.preventDefault();
                            handleDelete(order);
                          }}
                          className="ml-3 font-medium text-red-600 dark:text-blue-500 hover:underline"
                        >
                          Delete
                        </Link>
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllOrders;
