import React from "react";
import AdminMenu from "../../components/layouts/AdminMenu";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useState, useEffect } from "react";
import CategoryForm from "../../components/form/CategoryForm";
import { useAuth } from "../../components/context/auth";
import Modal from "../../components/layouts/Modal";

const CreateCategory = () => {
  const [auth] = useAuth();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const [updated, setUpdated] = useState("");

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleDelete = async (c) => {
    const result = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/category/delete-category/${c._id}`,
      {
        headers: {
          Authorization: `${auth.token}`,
        },
      }
    );
    if (result.data.success) {
      toast.success(`${c.name} deleted Successfully`);
      getAllCategories();
    }
  };
  const handleEdit = (c) => {
    openModal();
    setSelected(c._id);
    setUpdated(c.name);
  };
  const handleEditChange = async (e) => {
    e.preventDefault();
    const result = await axios.put(
      `${process.env.REACT_APP_API}/api/v1/category/update-category/${selected}`,
      { newname: updated },
      {
        headers: {
          Authorization: `${auth.token}`,
        },
      }
    );  
    if (result.data.success) {
      toast.success(`${updated} updated Successfully`);
      closeModal();
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
              <Modal isOpen={isModalOpen} onClose={closeModal}>
                <CategoryForm
                  handleSubmit={handleEditChange}
                  value={updated}
                  setValue={setUpdated}
                ></CategoryForm>
              </Modal>
              <td>{c.name}</td>
              <td className="flex justify-end">
                <button
                  className="bg-blue-700 text-white rounded-md p-2 m-2"
                  onClick={(e) => {
                    e.preventDefault();
                    handleEdit(c);
                  }}
                >
                  Edit
                </button>
                <button
                  className="bg-blue-700 text-white rounded-md p-2 m-2"
                  onClick={(e) => {
                    e.preventDefault();
                    handleDelete(c);
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
