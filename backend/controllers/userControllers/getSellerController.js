import userModel from "../../models/userModel.js";

const getSellerController = async (req, res) => {
  const response = await userModel.find({ role: 2 });
  if (response) {
    res.status(200).send({
      success: true,
      message: "Get all sellers",
      sellers: response,
    });
  }
};
export default getSellerController;
