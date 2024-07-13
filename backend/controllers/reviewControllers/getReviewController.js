import reviewModel from "../../models/reviewModel.js";

const getreviewController = async (req, res) => {
  try {
    const { id } = req.params;
    const reviews = await reviewModel.find({ product: id }).populate("user");
    console.log(reviews);
    if (!reviews) {
      return res.status(500).send({
        success: false,
        message: "Cannot find reviews",
      });
    }
    res.status(200).send({
      success: true,
      message: "Fetched the reviews",
      reviews,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error in getting reviews",
      success: false,
      error,
    });
  }
};
export default getreviewController;
