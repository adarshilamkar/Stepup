import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import AdminMenu from "../../components/layouts/AdminMenu";
import CreateProductForm from "./CreateProductForm";
import EditProductForm from "../../components/product/components/EditProductForm";
import Modal from "../../components/Modal"; // Import the Modal component

const Products = () => {
  const [products, setProducts] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  // Fetch all products
  const allProducts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-products`
      );
      if (response.data.count) {
        setProducts(response.data.products);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
      toast.error("Failed to load products.");
    }
  };

  // Fetch all sellers
  // const allSellers = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${process.env.REACT_APP_API}/api/v1/user/get-sellers`
  //     );
  //     if (response.data.success) {
  //       setSellers(response.data.sellers);
  //       console.log("Fetched Sellers:", response.data.sellers); // Debugging
  //     } else {
  //       console.error("Error fetching sellers:", response.data.message);
  //       toast.error(response.data.message);
  //     }
  //   } catch (error) {
  //     console.error("Failed to fetch sellers:", error);
  //     toast.error("Failed to load sellers.");
  //   }
  // };

  const allSellers = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/user/get-sellers`
      );
      if (response.data.success) {
        setSellers(response.data.sellers);
        console.log("Fetched Sellers:", response.data.sellers); // Debugging
      } else {
        console.error("Error fetching sellers:", response.data.message);
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Failed to fetch sellers:", error);
      toast.error("Failed to load sellers.");
    }
  };

  // Fetch all categories
  const allCategories = async () => {
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

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleSave = () => {
    setEditingProduct(null);
    allProducts(); // Reload the products after saving
  };

  const handleDelete = async (product) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/product/delete/${product._id}`
      );
      if (response.data.success) {
        toast.success(response.data.message);
        allProducts();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Failed to delete product:", error);
      toast.error("Failed to delete product.");
    }
  };

  useEffect(() => {
    allProducts();
    allSellers();
    allCategories();
  }, []);

  return (
    <div>
      <AdminMenu />
      <CreateProductForm />
      <div className="mx-5 mt-2">
        <div className="font-bold text-center my-5 text-gray-800 dark:text-white">
          All Products
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Product Id
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Discount
                </th>
                <th scope="col" className="px-6 py-3">
                  Quantity
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product._id}
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {product._id}
                  </th>
                  <td className="px-6 py-4">{product.name}</td>
                  <td className="px-6 py-4">{product?.category?.name}</td>
                  <td className="px-6 py-4">
                    {product.price.map((pr, index) => (
                      <span key={index}>₹{pr} </span>
                    ))}
                  </td>
                  <td className="px-6 py-4">
                    {product.discount.map((dis, index) => (
                      <span key={index}>{dis}% </span>
                    ))}
                  </td>
                  <td className="px-6 py-4 border border-blue-200 bg-blue-200 dark:bg-gray-900 dark:border-gray-600">
                    {product.quantity}
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      onClick={(e) => {
                        e.preventDefault();
                        handleEdit(product);
                      }}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </Link>
                    <Link
                      onClick={(e) => {
                        e.preventDefault();
                        handleDelete(product);
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

      {/* Modal for editing a product */}
      <Modal isOpen={!!editingProduct} onClose={() => setEditingProduct(null)}>
        {editingProduct && (
          <EditProductForm
            product={editingProduct}
            sellers={sellers}
            categories={categories}
            onCancel={() => setEditingProduct(null)}
            onSave={handleSave}
          />
        )}
      </Modal>
    </div>
  );
};

export default Products;
