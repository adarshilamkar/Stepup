import React from "react";

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <div className="mx-5 mt-3">
      <form onSubmit={handleSubmit} className="flex justify-center">
        <input
          className="border border-blue-700 rounded-sm text-black p-2"
          type="text"
          name="name"
          value={value}
          placeholder="Enter New Category"
          onChange={(e) => setValue(e.target.value)}
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
