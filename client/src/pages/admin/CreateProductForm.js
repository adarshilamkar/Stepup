import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../components/context/auth";

const CreateProductForm = () => {
  const [auth] = useAuth();
  const [categories, setCategories] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    info: "",
    type: "",
    model: "",
    reviews: "",
    description: "",
    specifications: "",
    material: "",
    tags: "",
    price: "",
    discount: "",
    seller: "",
    category: "",
    quantity: "",
    shipping: "",
    otherphoto: "",
    photo: null,
  });

  useEffect(() => {
    // Fetch categories from the API
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/api/v1/category/all-categories`
        );
        setCategories(response.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Error fetching categories");
      }
    };
    fetchCategories();

    // fetch sellers
    const fetchSellers = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/api/v1/user/get-sellers`
        );
        setSellers(response.data.sellers);
      } catch (error) {
        console.error("Error fetching sellers", error);
        toast.error("Error fetching sellers");
      }
    };
    fetchSellers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      photo: file,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("info", formData.info);
    formDataToSend.append("type", formData.type);
    formDataToSend.append("model", formData.model);
    formDataToSend.append("reviews", formData.reviews);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("specifications", formData.specifications);
    formDataToSend.append("material", formData.material);
    formDataToSend.append("tags", formData.tags);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("discount", formData.discount);
    formDataToSend.append("seller", formData.seller);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("quantity", formData.quantity);
    formDataToSend.append("shipping", formData.shipping);
    formDataToSend.append("otherphoto", formData.otherphoto);
    formDataToSend.append("photo", formData.photo);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/create-product`,
        formDataToSend,
        {
          headers: {
            Authorization: `${auth.token}`,
          },
        }
      );
      setFormData({
        name: "",
        info: "",
        type: "",
        model: "",
        reviews: "",
        description: "",
        specifications: "",
        material: "",
        tags: "",
        price: "",
        discount: "",
        seller: "",
        category: "",
        quantity: "",
        shipping: "",
        otherphoto: "",
        photo: null,
      });
      console.log("Response:", response.data);
      toast.success(response.data.message);
    } catch (error) {
      console.log(error.message);
      toast.error("Error in creating product");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mb-10">
      <h2 className="text-2xl font-bold my-4 text-center text-gray-800 dark:text-white">
        Create a New Product
      </h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div className="flex flex-col">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 dark:text-white mb-1"
          >
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white"
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="info"
            className="block text-sm font-medium text-gray-700 dark:text-white mb-1"
          >
            Info:
          </label>
          <textarea
            id="info"
            name="info"
            value={formData.info}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white"
          ></textarea>
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="type"
            className="block text-sm font-medium text-gray-700 dark:text-white mb-1"
          >
            Type:
          </label>
          <textarea
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white"
          ></textarea>
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="model"
            className="block text-sm font-medium text-gray-700 dark:text-white mb-1"
          >
            Model:
          </label>
          <textarea
            id="model"
            name="model"
            value={formData.mode}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white"
          ></textarea>
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="reviews"
            className="block text-sm font-medium text-gray-700 dark:text-white mb-1"
          >
            Reviews:
          </label>
          <textarea
            id="reviews"
            name="reviews"
            value={formData.reviews}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white"
          ></textarea>
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 dark:text-white mb-1"
          >
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white"
          ></textarea>
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="specifications"
            className="block text-sm font-medium text-gray-700 dark:text-white mb-1"
          >
            Specifications:
          </label>
          <textarea
            id="specifications"
            name="specifications"
            value={formData.specifications}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white"
          ></textarea>
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="material"
            className="block text-sm font-medium text-gray-700 dark:text-white mb-1"
          >
            Material:
          </label>
          <textarea
            id="material"
            name="material"
            value={formData.material}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white"
          ></textarea>
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="tags"
            className="block text-sm font-medium text-gray-700 dark:text-white mb-1"
          >
            Tags:
          </label>
          <textarea
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white"
          ></textarea>
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700 dark:text-white mb-1"
          >
            Price:
          </label>
          <input
            type="text"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white"
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="discount"
            className="block text-sm font-medium text-gray-700 dark:text-white mb-1"
          >
            Discount:
          </label>
          <input
            type="text"
            id="discount"
            name="discount"
            value={formData.discount}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white"
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 dark:text-white mb-1"
          >
            Category:
          </label>
          <select
            id="category"
            name="category"
            value={formData.category._id}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white"
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category._id}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="seller"
            className="block text-sm font-medium text-gray-700 dark:text-white mb-1"
          >
            Seller:
          </label>
          <select
            id="seller"
            name="seller"
            value={formData.seller._id}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white"
          >
            <option value="">Select Seller</option>
            {sellers.map((seller) => (
              <option key={seller._id} value={seller._id}>
                {seller._id}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="quantity"
            className="block text-sm font-medium text-gray-700 dark:text-white mb-1"
          >
            Quantity:
          </label>
          <input
            type="text"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white"
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="shipping"
            className="block text-sm font-medium text-gray-700 dark:text-white mb-1"
          >
            Shipping:
          </label>
          <input
            type="text"
            id="shipping"
            name="shipping"
            value={formData.shipping}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white"
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="photo"
            className="block text-sm font-medium text-gray-700 dark:text-white mb-1"
          >
            Product Photo:
          </label>
          <input
            type="file"
            id="photo"
            name="photo"
            accept="image/*"
            onChange={handlePhotoChange}
            className="p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white"
          />
        </div>
        <div className="flex flex-col md:col-span-2">
          <label
            htmlFor="otherphoto"
            className="block text-sm font-medium text-gray-700 dark:text-white mb-1"
          >
            Other Photos (URLs):
          </label>
          <textarea
            id="otherphoto"
            name="otherphoto"
            value={formData.otherphoto}
            onChange={handleChange}
            placeholder="Enter URLs separated by commas"
            className="p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white"
          ></textarea>
        </div>
        <div className="flex flex-col md:col-span-2">
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800"
          >
            Create Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProductForm;
