import orderModel from "../../models/orderModel.js";

const deleteOrder = async (req, res) => {
  const { id } = req.params;
  const response = await orderModel.findByIdAndDelete(id);
  if (response) {
    res.status(201).send({
      success: true,
      message: "Deleted SuccessfullY",
    });
  }
};
export default deleteOrder;
