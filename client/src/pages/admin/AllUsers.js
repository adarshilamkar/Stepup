import React from "react";
import AdminMenu from "../../components/layouts/AdminMenu";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const AllUsers = () => {
  const [users, setUsers] = useState();
  const getUsers = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/user/get-users`
    );
    if (response.data.success) {
      setUsers(response.data.users);
    }
  };
  const handleEdit = async () => {
    console.log("hello");
  };
  const handleDelete = async (user) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/user/delete-user/${user._id}`
    );
    if (response.data.success) {
      toast.success(response.data.message);
      getUsers();
    }
  };
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div>
      <AdminMenu></AdminMenu>
      <div className="mx-5 mt-2">
        <div className="font-bold text-center my-5 text-gray-800">
          All Users
        </div>
        <div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Phone
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Address
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {users?.map((user) => (
                  <>
                    <tr
                      key={user._id}
                      className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {user.email}
                      </th>
                      <td className="px-6 py-4">{user.name}</td>
                      <td className="px-6 py-4">{user.phone}</td>
                      <td className="px-6 py-4">{user.address}</td>
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
                            handleDelete(user);
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

export default AllUsers;
