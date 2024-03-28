import React, { useEffect } from "react";
import CreateProductForm from "./CreateProductForm";
import axios from "axios";
import { useState } from "react";
const Products = () => {
  const [product, setProduct] = useState();
  const allProducts = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/api/v1/product/get-products`
    );
    if (response.data.count) {
      setProduct(response.data.products);
    }
  };
  const handleEdit = async (p) => {};
  const handleDelete = async (p) => {};
  useEffect(() => {
    allProducts();
  }, []);
  return (
    <div>
      <CreateProductForm></CreateProductForm>
      <table>
        <thead>
          <tr>
            <th className="m-52 min-w-80 border-red-700 border">Name</th>
            <th className="m-52 min-w-80 border-red-700 border">Price</th>
            <th className="m-52 min-w-80 border-red-700 border">Quantity</th>
            <th className="m-52 min-w-80 border-red-700 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {product &&
            product.map((p) => (
              <tr key={p._id}>
                <td className="mx-5 px-10">{p.name}</td>
                <td className="mx-5 px-10">{p.price}</td>
                <td className="mx-5 px-10">{p.quantity}</td>
                <td className="mx-5 px-10">
                  <button
                    className="p-2 mx-5 bg-blue-700 rounded-md"
                    onClick={(e) => {
                      e.preventDefault();
                      handleEdit(p);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="p-2 mx-5 bg-red-600 rounded-md"
                    onClick={(e) => {
                      e.preventDefault();
                      handleDelete(p);
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

export default Products;
