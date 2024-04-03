import userModel from "../../models/userModel.js";

const getSingleUserController = async (req, res) => {
  const { id } = req.params;
  const response = await userModel.findById(id);
  if (response) {
    res.status(200).send({
      success: true,
      message: "Got the Users",
      user: response,
    });
  }
};
export default getSingleUserController;
