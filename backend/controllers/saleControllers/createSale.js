import saleModel from "../../models/saleModel.js";
const createSale = async (req, res) => {
  try {
    const { name,start,end,discount} = req.body;
    const sale = await new saleModel({
        name,
        start,
        end,
        discount,
  
    }).save();
    if (!sale) {
      return res.status(400).send({
        success: false,
        message: "Failed to add sale",
      });
    }
    console.log(sale);
    res.status(201).send({
      success: true,
      message: "Sale added successfully!",
      sale,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Cannot create sale",
    });
  }
};
export default createSale;
