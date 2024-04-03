import React, { useState } from "react";
import { useAuth } from "../components/context/auth";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";

const Profile = () => {
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState(auth.user.name);
  const [phone, setPhone] = useState(auth.user.phone);
  const [address, setAddress] = useState(auth.user.address);
  const handleEdit = async () => {
    // alert(auth.user._id);
    const response = await axios.put(
      `${process.env.REACT_APP_API}/api/v1/user/update-user/${auth.user._id}`,
      { newname: name, newphone: phone, newaddress: address }
    );
    if (response.data.success) {
      let piy = auth;
      piy.user.name = name;
      piy.user.phone = phone;
      piy.user.address = address;
      localStorage.setItem("auth", JSON.stringify(piy));
      setAuth(piy);
      toast.success(response.data.message);
    }
  };

  return (
    <div className="mx-14 mt-8">
      <div className="bg-white overflow-hidden shadow rounded-lg border">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 flex justify-between">
            <span>User Profile</span>
            <span className="Save">
              <button
                onClick={handleEdit}
                className="text-white bg-blue-700 py-2 px-4 rounded-md"
              >
                Edit
              </button>
            </span>
          </h3>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <div className="sm:divide-y sm:divide-gray-200">
            <div className="flex justify-between py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <div className="text-sm font-medium text-gray-500">Full name</div>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="outline-none border  mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2  p-2"
              />
            </div>
            <div className="flex justify-between py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <div className="text-sm font-medium text-gray-500">
                Email address
              </div>
              <input
                onChange={(e) => {
                  toast.error("Cannot change Email");
                }}
                value={auth.user.email}
                className="outline-none border  mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 p-2"
              />
            </div>
            <div className="flex justify-between py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <div className="text-sm font-medium text-gray-500">
                Phone number
              </div>
              <input
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                className="outline-none border  mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2  p-2"
              />
            </div>
            <div className="flex justify-between py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <div className="text-sm font-medium text-gray-500">Address</div>
              <input
                onChange={(e) => setAddress(e.target.value)}
                value={address}
                className="outline-none border  mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2  p-2"
              />
            </div>
            <div>
              <Link to={"/user/orders"}>
                <div className="border border-blue-700 bg-blue-700 rounded-md text-white p-4 text-center">
                  Show Orders
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
