import productModels from "../../models/productModels.js";

const productFiltersController = async (req, res) => {
  const { checked } = req.body;
  let args = {};
  if (checked.length > 0) {
    args.category = checked;
    // args.price = { $gte: minprice, $lte: maxprice };
    const products = await productModels.find(args);
    res.status(200).send({
      success: true,
      count: products.length,
      message: "Fetched the products",
      products,
    });
  }
};
export default productFiltersController;
