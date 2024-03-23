import productModels from "../../models/productModels.js";

const getSingleProductController = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModels
      .findById(id)
      .select("-photo")
      .populate("category");
    console.log(product);
    if (!product) {
      return res.status(500).send({
        success: false,
        message: "Cannot find product",
      });
    }
    res.status(200).send({
      success: true,
      message: "Fetched the product",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error in getting product",
      success: false,
      error,
    });
  }
};
export default getSingleProductController;
