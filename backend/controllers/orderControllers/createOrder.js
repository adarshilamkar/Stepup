import orderModel from "../../models/orderModel.js";
const createOrder = async (req, res) => {
  try {
    const { products, user, address, amount, status } = req.body;
    const order = await new orderModel({
      products,
      user,
      address,
      amount,
      status,
    }).save();
    if (!order) {
      return res.status(400).send({
        success: false,
        message: "Failed to add order",
      });
    }
    console.log(order);
    res.status(201).send({
      success: true,
      message: "Order added successfully!",
      order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Cannot create order",
    });
  }
};
export default createOrder;
