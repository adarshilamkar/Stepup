import React from "react";
import AdminMenu from "../../components/layouts/AdminMenu";
import CreateProductForm from "./CreateProductForm";

const CreateProduct = () => {
  return (
    <div>
      <AdminMenu></AdminMenu>
      <CreateProductForm></CreateProductForm>
    </div>
  );
};

export default CreateProduct;
