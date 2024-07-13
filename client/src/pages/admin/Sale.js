import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/layouts/AdminMenu";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../../components/context/auth";
import { Link } from "react-router-dom";

const CreateSale = () => {
  const [auth] = useAuth();
  const [name, setName] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [discount, setDiscount] = useState("");
  const [sales, setSales] = useState([]);

  // Function to handle delete sale
  const handleDelete = async (id) => {
    // alert(id);
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/sale/delete-sale/${id}`
      );
      if (result.data.success) {
        toast.success(`Sale deleted Successfully`);
        getAllSales();
      } else {
        toast.error(result.data.message);
      }
    } catch (error) {
      console.error("Error deleting sale:", error);
      toast.error("Error deleting sale. Please try again.");
    }
  };

  const handleEdit = () => {};
  // Function to handle form submission for creating a new sale
  const handleSubmit = async () => {
    // e.preventDefault();

    // Input validation
    // if (!name || !start || !end || !discount) {
    //   return toast.error("All fields are required");
    // }
    // if (isNaN(Date.parse(start)) || isNaN(Date.parse(end))) {
    //   return toast.error("Start and End dates must be valid dates");
    // }
    // if (isNaN(discount) || discount <= 0) {
    //   return toast.error("Discount must be a positive number");
    // }
    if (!name || !start || !end || !discount) {
      toast.error("Fill all details");
      return;
    }
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/sale/create-sale`,
        { name, start, end, discount },
        {
          headers: {
            Authorization: `${auth.token}`,
          },
        }
      );

      if (result.data.success) {
        toast.success(`${name} created Successfully`);
        setName("");
        setStart("");
        setEnd("");
        setDiscount("");
        getAllSales();
      } else {
        toast.error(result.data.message);
      }
    } catch (error) {
      console.error("Error creating sale:", error);
      toast.error("Error creating sale. Please try again.");
    }
  };

  // Fetch all sales from the backend
  const getAllSales = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/sale/allsales`
      );
      // alert(response.data.sales);
      // alert(JSON.stringify(response.data));
      if (response.data.success) {
        setSales(response.data.sales);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching sales:", error);
      toast.error("Cannot get sales. Please try again later.");
    }
  };

  // Use useEffect to fetch all sales when the component mounts
  useEffect(() => {
    getAllSales();
  }, []);

  return (
    <div>
      <AdminMenu />
      <div className="mx-5 mt-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="flex justify-center"
        >
          <input
            className="border border-gray-800 rounded-md text-gray-800 dark:bg-blue-100 p-2 mx-2"
            type="text"
            name="name"
            value={name}
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            className="border border-gray-800 rounded-md text-gray-800 dark:bg-blue-100 p-2 mx-2"
            type="datetime-local"
            name="start"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            required
          />
          <input
            className="border border-gray-800 rounded-md text-gray-800 dark:bg-blue-100 p-2 mx-2"
            type="datetime-local"
            name="end"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            required
          />
          <input
            className="border border-gray-800 rounded-md text-gray-800 dark:bg-blue-100 p-2 mx-2"
            type="number"
            name="discount"
            value={discount}
            placeholder="Discount"
            onChange={(e) => setDiscount(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-blue-700 text-white rounded-md p-2 mx-2"
          >
            Create
          </button>
        </form>
      </div>
      <div className="mx-5 mt-2">
        <div className="font-bold text-center my-5 text-gray-800 dark:text-white">
          All Sales
        </div>
        <div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Sale Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Sale Id
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Start
                  </th>
                  <th scope="col" className="px-6 py-3">
                    End
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Discount
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {sales?.map((sale) => (
                  <tr
                    key={sale._id}
                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                  >
                    {/* {alert(JSON.stringify(sale))} */}
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {sale.name}
                    </th>
                    <td className="px-6 py-4">{sale._id}</td>
                    <td className="px-6 py-4">
                      {new Date(sale.start).toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      {new Date(sale.end).toLocaleString()}
                    </td>
                    <td className="px-6 py-4">{sale.discount}</td>
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
                          handleDelete(sale._id);
                        }}
                        className="ml-3 font-medium text-red-600 dark:text-blue-500 hover:underline"
                      >
                        Delete
                      </Link>
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

export default CreateSale;
