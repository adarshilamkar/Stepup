import productModels from "../../models/productModels.js";
const deleteProductController = async (req, res) => {
  const { id } = req.params;
  const response = await productModels.findByIdAndDelete(id);
  if (response) {
    res.status(201).send({
      success: true,
      message: "Deleted SuccessfullY",
      product: response,
    });
  }
};
export default deleteProductController;
