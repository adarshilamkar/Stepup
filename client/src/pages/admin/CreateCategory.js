import React from "react";
import AdminMenu from "../../components/layouts/AdminMenu";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useState, useEffect } from "react";
import CategoryForm from "../../components/form/CategoryForm";
import { useAuth } from "../../components/context/auth";

const CreateCategory = () => {
  const [auth] = useAuth();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const handleDelete = async (id) => {
    const result = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/category/delete-category/${id}`,
      {
        headers: {
          Authorization: `${auth.token}`,
        },
      }
    );
    if (result.data.success) {
      toast.success(`${id} deleted Successfully`);
      getAllCategories();
    }
  };
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
        `http://localhost:8000/api/v1/category/all-categories`
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
      <table>
        <thead>
          <tr>
            <th className="m-52 min-w-96 border-red-700 border">
              Category Name
            </th>
            <th className="m-52 min-w-96 border-red-700 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((c) => (
            <tr className="" key={c._id}>
              <td>{c.name}</td>
              <td className="flex justify-end">
                <button className="bg-blue-700 text-white rounded-md p-2 m-2">
                  Edit
                </button>
                <button
                  className="bg-blue-700 text-white rounded-md p-2 m-2"
                  onClick={(e) => {
                    e.preventDefault();
                    handleDelete(c._id);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CreateCategory;
