import productModels from "../../models/productModels.js";

const getDealsController = async (req, res) => {
  const products = await productModels
    .find({})
    .select("-photo")
    .populate("category")
    .sort({ discount: -1 });
  res.status(200).send({
    success: true,
    count: products.length,
    message: "Fetched the products",
    products,
  });
};
export default getDealsController;
