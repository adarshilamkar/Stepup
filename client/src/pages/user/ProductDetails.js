import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../../components/context/cart";
import { toast } from "react-hot-toast";
import { useAuth } from "../../components/context/auth";
import ImageGallery from "../../components/product/ImageGallery";
import CheckPincode from "../../components/product/CheckPin";
import Loader from "../../components/Loader";

const ProductDetails = () => {
  const [cart, setCart] = useCart();
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [auth] = useAuth();
  const params = useParams();
  const [productno, setProductNo] = useState(0);
  const [product, setProduct] = useState({});
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [isLoading, setIsLoading] = useState(true);

  const getProductDetails = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.id}`
      );
      const reviewsRes = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/reviews/${params.id}`
      );
      setProduct(res.data.product);
      setReviews(reviewsRes.data.reviews);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching product details:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProductDetails();
  }, []);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!auth.user) {
      toast.error("Login to Add a Review");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/review/add-review/${params.id}`,
        {
          comment: reviewText,
          rating: reviewRating,
          user: auth.user._id,
        }
      );
      setReviews([...reviews, response.data.review]);
      calcrating();
      setReviewText("");
      setReviewRating(5); // Reset rating to default
      toast.success("Review added successfully");
    } catch (error) {
      console.error("Error adding review:", error);
      toast.error("Failed to add review");
    }
  };

  const handleAddToCart = () => {
    if (!auth.user) {
      toast.error("Login to Add to Cart");
    } else {
      const existingItem = cart.find((item) => item._id === product._id);

      if (existingItem && existingItem.productno === productno) {
        const updatedCart = cart.map((item) =>
          item.product_id === product.product_id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        setCart(updatedCart);
      } else {
        setCart([
          ...cart,
          {
            ...product,
            productno: productno,
            quantity: 1,
          },
        ]);
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      toast.success("Item added to Cart");
    }
  };

  const calcrating = () => {
    let totalRating = reviews.reduce((acc, curr) => acc + curr.rating, 0);
    setRating(totalRating / reviews.length);
  };

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <main className="dark:bg-gray-800 bg-white relative overflow-x-hidden">
          <div className="bg-white dark:bg-gray-800 flex relative z-20 items-center overflow-hidden">
            <div className="container mx-auto px-6 flex flex-col lg:flex-row relative py-16">
              <div className="lg:w-2/5 flex flex-col relative z-20 mb-8 lg:mb-0">
                <h1 className="font-bebas-neue sm:text-2xl font-bold flex flex-col dark:text-white text-gray-800">
                  {product?.name ? <>{product.name}</> : <>Product</>}
                </h1>
                <p className="font-bebas-neue text-md xl:text-xl text-gray-700 dark:text-white">
                  {product ? product.info : "info"}
                </p>
                <p className="font-bebas-neue text-xl text-gray-600 dark:text-white mt-6">
                  <span>
                    <span className="font-bold text-gray-800 dark:text-white">
                      ₹
                      {product?.price
                        ? (product?.price[productno] *
                            (100 - product?.discount[productno])) /
                          100
                        : 0}
                    </span>{" "}
                    <span className="mx-1">
                      MRP{" "}
                      <span className="line-through">
                        ₹{product.price ? product.price[productno] : 0}
                      </span>
                      <span className="ml-2 text-orange-600">
                        ({product.price ? product.discount[productno] : 0}% OFF)
                      </span>
                    </span>
                  </span>
                </p>
                <span className="text-green-600 font-semibold">
                  inclusive of all taxes
                </span>
                <div className="my-3">
                  {product.type ? (
                    <>
                      <span className="font-semibold text-gray-800 dark:text-white">
                        SELECT TYPE
                      </span>
                      <div>
                        {product.type.map((type, index) => (
                          <button
                            key={index}
                            onClick={() => setProductNo(index)}
                            className={`px-4 py-2 mr-3 my-1 rounded-lg bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none ${
                              productno === index
                                ? "bg-gray-800 dark:bg-gray-200 dark:text-gray-800 text-white"
                                : ""
                            }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="flex mt-4">
                  <Link
                    to="#"
                    onClick={handleAddToCart}
                    className="uppercase py-3 px-24 rounded border-2 text-white bg-blue-700 hover:bg-blue-600 transition duration-300 text-md"
                  >
                    Add to Cart
                  </Link>
                </div>
                <div>
                  <CheckPincode />
                </div>
              </div>
              <div className="lg:w-3/5 flex justify-center lg:justify-end relative">
                <img
                  src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
                  className="max-w-xs md:max-w-sm m-auto"
                  alt="productImg"
                />
              </div>
            </div>
          </div>

          <div>
            <div className="text-center text-gray-800 font-semibold text-lg my-2 dark:text-white">
              More Images
            </div>
            {product.otherphoto ? (
              <ImageGallery images={product.otherphoto} />
            ) : (
              <>"Other"</>
            )}
          </div>
          <div className="mx-4 md:mx-8">
            <div className="flex flex-col lg:flex-row justify-evenly">
              <div className="lg:max-w-[40vw]">
                <div className="w-full mx-auto">
                  <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4">
                      Product Specifications
                    </h2>
                    {product.specifications ? (
                      <ul className="list-disc pl-6">
                        {product.specifications.map((specs, index) => (
                          <li key={index}>{specs}</li>
                        ))}
                      </ul>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4">
                      Product Details
                    </h2>
                    {product.description ? (
                      <div>
                        {product.description.map((desc, index) => (
                          <span key={index}>
                            {desc}
                            {", "}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4">
                      Product Rating
                    </h2>
                    <span className="font-semibold text-xl text-gray-700 mx-0.5 p-0.5">
                      {rating.toFixed(1)}
                    </span>
                    <span className="text-yellow-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 inline -mt-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 0l2.5 7.5H20l-6.25 5L15 20l-5-4.375L5 20l1.75-7.5L0 7.5h7.5z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <span className="mx-2 font-semibold text-sm text-gray-600">
                      {`Given by ${reviews.length} customers`}
                    </span>
                  </div>
                </div>
              </div>
              <div className="lg:max-w-[40vw]">
                {reviews ? (
                  <div className="max-w-4xl mx-auto py-8 px-4">
                    <h1 className="text-xl font-semibold mb-8 dark:text-white">
                      Customer Reviews
                    </h1>
                    <div className="flex flex-col lg:flex-row justify-evenly">
                      {reviews.map((review) => (
                        <div className="bg-white rounded-lg shadow-lg p-6 mb-4 lg:w-[40vw]">
                          <div className="flex items-center mb-4">
                            <div className="flex-shrink-0 mr-4">
                              <img
                                className="h-10 w-10 rounded-full"
                                src={`https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg`}
                                alt={`${review?.user?.name} avatar`}
                              />
                            </div>
                            <div>
                              <p className="text-lg font-semibold">
                                {review.user.name}
                              </p>
                              <div className="text-yellow-400">
                                {[...Array(review.rating)].map((_, index) => (
                                  <svg
                                    key={index}
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 inline"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M10 0l2.5 7.5H20l-6.25 5L15 20l-5-4.375L5 20l1.75-7.5L0 7.5h7.5z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                ))}
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-700 mb-2">{review.comment}</p>
                          <p className="text-gray-400 text-sm mb-2">
                            {new Date(review.updatedAt).toLocaleString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <>reviews</>
                )}
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Add a Review</h2>
              <form onSubmit={handleSubmitReview}>
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Write your review here..."
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none"
                  rows="4"
                ></textarea>
                <div className="flex items-center mt-4">
                  <span className="text-lg mr-2">Rating:</span>
                  {[1, 2, 3, 4, 5].map((value) => (
                    <label key={value} className="cursor-pointer">
                      <input
                        type="radio"
                        value={value}
                        checked={reviewRating === value}
                        onChange={() => setReviewRating(value)}
                        className="sr-only"
                      />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-6 w-6 ${
                          value <= reviewRating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 0l2.5 7.5H20l-6.25 5L15 20l-5-4.375L5 20l1.75-7.5L0 7.5h7.5z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </label>
                  ))}
                </div>
                <button
                  type="submit"
                  className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                  Submit Review
                </button>
              </form>
            </div>
          </div>
        </main>
      )}
    </div>
  );
};

export default ProductDetails;
