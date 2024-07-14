import { Link } from "react-router-dom";

const Card = ({
  product,
  price,
  discount,
  imageUrl,
  Name,
  Description,
  readLink,
}) => {
  return (
    <div className="w-full md:max-w-xs bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl">
      <img
        className="w-full h-48 object-cover transition duration-300 hover:opacity-90"
        src={imageUrl}
        alt={Name}
      />
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
          {Name}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{Description}</p>
        <div className="flex items-center justify-between">
          {discount && (
            <span className="bg-red-200 text-red-700 font-semibold rounded-full px-3 py-1">
              {discount}% Off
            </span>
          )}
          <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
            ₹{price}
          </span>
        </div>
        <Link
          to={`/product/${readLink}`}
          className="block mt-6 text-center bg-blue-500 hover:bg-blue-600 text-white rounded-full px-3 py-2 font-semibold transition duration-300"
        >
          Checkout
        </Link>
      </div>
    </div>
  );
};

export default Card;
