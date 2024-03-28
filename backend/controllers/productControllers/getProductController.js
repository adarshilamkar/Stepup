import productModels from "../../models/productModels.js";

const getProductController = async (req, res) => {
  const products = await productModels
    .find({})
    .select("-photo")
    .populate("category")
    .sort({ createdAt: -1 });
  res.status(200).send({
    success: true,
    count: products.length,
    message: "Fetched the products",
    products,
  });
};
export default getProductController;
