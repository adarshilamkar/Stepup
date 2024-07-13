import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/layouts/AdminMenu";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const AllOrders = () => {
  const [orders, setOrders] = useState([]);

  // Function to fetch all orders from API
  const getOrders = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/order/get-all-orders`
      );
      if (response.data.success) {
        setOrders(response.data.orders);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to fetch orders.");
    }
  };
  const handleDelete = async () => {};
  // Function to handle status update
  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/order/update-status/${orderId}`,
        { status: newStatus }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        // Refresh orders after status update
        getOrders();
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Failed to update order status.");
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div>
      <AdminMenu />
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
                    PaymentId
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
                {orders.map((order) => (
                  <tr
                    key={order._id}
                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                  >
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {order._id}
                    </td>
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {order.paymentId}
                    </td>
                    <td className="px-6 py-4">{order?.user?.name}</td>
                    <td className="px-6 py-4">₹{order.amount}</td>
                    <td className="px-6 py-4">{order.address}</td>
                    <td className="px-6 py-4 border text-gray-600 bg-violet-200 border-blue-100 dark:border-gray-600">
                      {order.status}
                    </td>
                    <td className="px-6 py-4">
                      <select
                        onChange={(e) =>
                          handleStatusUpdate(order._id, e.target.value)
                        }
                        defaultValue={order.status}
                        className="p-2 bg-gray-200 dark:bg-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                      <Link
                        to={`/edit-order/${order._id}`}
                        className="ml-3 font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(order)}
                        className="ml-3 font-medium text-red-600 dark:text-blue-500 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
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
