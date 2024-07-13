import reviewModel from "../../models/reviewModel.js";

const createReviewController = async (req, res) => {
  const { id } = req.params;
  const { comment, rating, user } = req.body;
  const review = await new reviewModel({
    comment,
    rating,
    user: user,
    product: id,
  }).save();
  if (!review) {
    return res.status(400).send({
      success: false,
      message: "Failed to add review",
    });
  }
  console.log(review);
  res.status(201).send({
    success: true,
    message: "Review added successfully!",
    review,
  });
};
export default createReviewController;
