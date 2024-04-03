import React, { useEffect } from "react";
import CreateProductForm from "./CreateProductForm";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import AdminMenu from "../../components/layouts/AdminMenu";
import toast from "react-hot-toast";
const Products = () => {
  const [products, setProducts] = useState();
  const allProducts = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/product/get-products`
    );
    if (response.data.count) {
      setProducts(response.data.products);
    }
  };
  const handleEdit = async () => {};
  const handleDelete = async (product) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/product/delete/${product._id}`
    );
    if (response.data.success) {
      toast.success(response.data.message);
      allProducts();
    }
  };
  useEffect(() => {
    allProducts();
  }, []);
  return (
    <div>
      <AdminMenu></AdminMenu>
      <CreateProductForm></CreateProductForm>
      <div className="mx-5 mt-2">
        <div className="font-bold text-center my-5 text-gray-800 dark:text-white">
          All Products
        </div>
        <div>
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
                {products?.map((product) => (
                  <>
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
                      <td className="px-6 py-4">${product.price}</td>
                      <td className="px-6 py-4">{product.discount}%</td>
                      <td className="px-6 py-4 border border-blue-200 bg-blue-200 dark:bg-gray-900 dark:border-gray-600">
                        {product.quantity}
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
                            handleDelete(product);
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

export default Products;
