import orderModel from "../../models/orderModel.js";

const getAllOrdersAdmin = async (req, res) => {
  try {
    const orders = await orderModel.find({}).populate("user");
    res.status(200).send({
      message: "Got all orders of the user",
      success: true,
      orders,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Internal Server Error",
      success: false,
    });
  }
};
export default getAllOrdersAdmin;
