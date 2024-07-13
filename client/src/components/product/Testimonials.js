import React from "react";

// const reviews = [
//   {
//     id: 1,
//     name: "John Doe",
//     rating: 4,
//     comment: "Great product, loved it!",
//   },
//   {
//     id: 2,
//     name: "Jane Smith",
//     rating: 5,
//     comment: "Perfect fit, excellent quality.",
//   },
//   {
//     id: 3,
//     name: "Alice Johnson",
//     rating: 3,
//     comment: "Satisfied with the purchase.",
//   },
//   {
//     id: 4,
//     name: "Bob Anderson",
//     rating: 2,
//     comment: "Not as expected, disappointed.",
//   },
// ];

const ReviewCard = ({ review }) => (
  <div className="bg-white rounded-lg shadow-lg p-6 mb-4 w-[40vw]">
    <div className="flex items-center mb-4">
      <div className="flex-shrink-0 mr-4">
        <img
          className="h-10 w-10 rounded-full"
          src={`https://i.pravatar.cc/150?u=${review?.user?.name}`}
          alt={`${review?.user?.name} avatar`}
        />
      </div>
      <div>
        <p className="text-lg font-semibold">{review.user.name}</p>
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
    <p className="text-gray-700 mb-4">{review.user.comment}</p>
  </div>
);

export const Testimonials = ({ reviews }) => (
  <div className="max-w-4xl mx-auto py-8 px-4">
    <h1 className="text-xl font-semibold mb-8">Customer Reviews</h1>
      <div className="flex justify-evenly flex-col">
        {reviews.map((review) => (
          <ReviewCard key={review._id} {...review} />
        ))}
      </div>
  </div>
);

export default Testimonials;
