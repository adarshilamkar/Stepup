import React from "react";

const SaleForm = ({
  handleSubmit,
  name,
  setName,
  start,
  setStart,
  end,
  setEnd,
  discount,
  setDiscount,
}) => {
  return (
    <div className="mx-5 mt-3">
      <form onSubmit={handleSubmit} className="flex justify-center">
        <input
          className="border border-gray-800 rounded-md text-gray-800 dark:bg-blue-100 p-2 mx-2"
          type="text"
          name="name"
          value={name}
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="border border-gray-800 rounded-md text-gray-800 dark:bg-blue-100 p-2 mx-2"
          type="text"
          name="start"
          value={start}
          onChange={(e) => setStart(e.target.value)}
        />
        <input
          className="border border-gray-800 rounded-md text-gray-800 dark:bg-blue-100 p-2 mx-2"
          type="text"
          name="end"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
        />
        <input
          className="border border-gray-800 rounded-md text-gray-800 dark:bg-blue-100 p-2 mx-2"
          type="text"
          name="discount"
          value={discount}
          placeholder="Discount"
          onChange={(e) => setDiscount(e.target.value)}
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

export default SaleForm;
