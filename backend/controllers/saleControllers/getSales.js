import saleModel from "../../models/saleModel.js";

const getSales = async (req, res) => {
  try {
    const sales = await saleModel.find({});
    res.status(200).send({
      message: "Got all sales",
      success: true,
      sales,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Internal Server Error",
      success: false,
    });
  }
};
export default getSales;
