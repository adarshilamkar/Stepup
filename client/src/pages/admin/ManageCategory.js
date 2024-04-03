import React from "react";
import AdminMenu from "../../components/layouts/AdminMenu";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useState, useEffect } from "react";
import CategoryForm from "../../components/form/CategoryForm";
import { useAuth } from "../../components/context/auth";
import { Link } from "react-router-dom";

const CreateCategory = () => {
  const [auth] = useAuth();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const handleDelete = async (category) => {
    const result = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/category/delete-category/${category._id}`,
      {
        headers: {
          Authorization: `${auth.token}`,
        },
      }
    );
    if (result.data.success) {
      toast.success(`${category.name} deleted Successfully`);
      getAllCategories();
    }
  };
  const handleEdit = () => {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await axios.post(
      `${process.env.REACT_APP_API}/api/v1/category/create-category`,
      { name },
      {
        headers: {
          Authorization: `${auth.token}`,
        },
      }
    );
    if (result.data.success) {
      toast.success(`${name} created Successfully`);
      setName("");
      getAllCategories();
    }
  };
  // get all categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/all-categories`
      );
      setCategories(data.categories);
    } catch (error) {
      console.log(error);
      toast.error("Cannot get categories..");
    }
  };
  useEffect(() => {
    getAllCategories();
  }, []);
  return (
    <div>
      <AdminMenu></AdminMenu>
      <CategoryForm
        handleSubmit={handleSubmit}
        value={name}
        setValue={setName}
      ></CategoryForm>
      <div className="mx-5 mt-2">
        <div className="font-bold text-center my-5 text-gray-800 dark:text-white">
          All Categories
        </div>
        <div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Category Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Category Id
                  </th>
                </tr>
              </thead>
              <tbody>
                {categories?.map((category) => (
                  <>
                    <tr
                      key={category._id}
                      className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {category.name}
                      </th>
                      <td className="px-6 py-4">{category._id}</td>

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
                            handleDelete(category);
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

export default CreateCategory;
