import React from "react";

const CategoryForm = ({ handleSubmit, name, setName,image,setImage }) => {
  return (
    <div className="mx-5 mt-3">
      <form onSubmit={handleSubmit} className="flex justify-center">
        <input
          className="border border-gray-800 rounded-md text-gray-800 dark:bg-blue-100 p-2"
          type="text"
          name="name"
          value={name}
          placeholder="Add New Category"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="border border-gray-800 rounded-md text-gray-800 dark:bg-blue-100 p-2"
          type="text"
          name="image"
          value={image}
          placeholder="Add Image Url"
          onChange={(e) => setImage(e.target.value)}
        />
        <button
          type="submit"
          className=" bg-blue-700 text-white rounded-md p-2 mx-2"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CategoryForm;
