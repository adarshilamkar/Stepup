import React from "react";

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          className="border border-blue-700 rounded-sm text-black p-2 m-2"
          type="text"
          name="name"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          type="submit"
          className="p-2 m-2 bg-blue-700 text-white rounded-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CategoryForm;
