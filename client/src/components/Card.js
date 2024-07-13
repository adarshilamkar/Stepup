// import React from "react";
// import { Link } from "react-router-dom";
// import { useCart } from "./context/cart";
// import { useNavigate } from "react-router-dom";
// import {auth,useAuth} from './context/auth';
// import toast from "react-hot-toast";
// const Card = ({ imageUrl, Name, discount, Description, readLink, product }) => {
//   const [cart, setCart] = useCart();
//   const [auth,setAuth]=useAuth();
//   const addToCart = () => {
//     if(!auth.user){
//       toast.error("Please Login to Add Product");
//     }
//     else{
//     const existingItem = cart.find((item) => item._id === product._id);

//     if (existingItem) {
//       // If the product already exists, create a copy of the cart and increase the quantity of the existing item
//       const updatedCart = cart.map((item) =>
//         item.product_id === product.product_id
//           ? { ...item, quantity: item.quantity + 1 }
//           : item
//       );
//       setCart(updatedCart);
//     } else {
//       // If the product doesn't exist, add it to the cart with quantity 1
//       setCart([...cart, { ...product, quantity: 1 }]);
//     }
//     localStorage.setItem("cart", JSON.stringify(cart));
//     toast.success("Item added to Cart");
//     console.log(cart);
//     }
//   };
//   return (
//     <div className="w-80 p-2">
//       <div className="text-center max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
//         <Link className="flex justify-center rounded-3xl" to="#">
//           <img
//             className="rounded-t-lg w-full mx-2  mt-2 p-1 rounded-xl h-60  "
//             src={imageUrl}
//             alt="product"
//           />
//         </Link>
//         <div className="p-5">
//           <Link to="#">
//             <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
//               {Name}
//             </h5>
//           </Link>
//           <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
//             {Description}
//           </p>
//           <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
//             <span>MRP:{product.price}$</span>
//             <span className="ml-2">Discount:{discount}%</span>
//           </p>
//           <div className="flex justify-evenly">
//             <Link
//               to={`/product/${readLink}`}
//               className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//             >
//               Get Details
//             </Link>
//             <button
//               className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//               onClick={(e) => {
//                 e.preventDefault();
//                 addToCart();
//               }}
//             >
//               Add to Cart
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Card;
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
    <div className="max-w-xs bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl">
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
