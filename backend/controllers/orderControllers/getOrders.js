import orderModel from "../../models/orderModel.js";

const getOrders = async (req, res) => {
  try {
    const { user } = req.body;
    // Assuming `orderModel` is your Mongoose model for orders
    const orders = await orderModel.find({ user: user });
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
export default getOrders;
