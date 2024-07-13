import mongoose from "mongoose";
import saleModel from "../../models/saleModel.js";

const deleteSale = async (req, res) => {
  // Extract the sale ID from the request parameters
  const { id } = req.params;

  try {
    // Check if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        message: "Invalid sale ID",
        success: false,
      });
    }

    // Attempt to find and delete the sale by its ID
    const response = await saleModel.findByIdAndDelete(id);

    // If the sale is not found, respond with a 404 status
    if (!response) {
      return res.status(404).send({
        message: "Sale not found",
        success: false,
      });
    }

    // Respond with a success message
    res.status(200).send({
      message: "Sale deleted successfully",
      success: true,
      response,
    });
  } catch (error) {
    // Log the error and respond with a 500 status
    console.error(error);
    res.status(500).send({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export default deleteSale;
