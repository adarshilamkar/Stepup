import pincodeModels from "../../models/pincodeModels.js";

const getPincodeController = async (req, res) => {
  try {
    const { code } = req.params; // Destructure the pincode parameter from the request URL

    // Query the database for documents matching the given pincode
    var pindetails = await pincodeModels.find({ code: code });
    // pindetails = "hi";

    // Log the results for debugging purposes
    console.log(pindetails);

    // Check if no pincode details were found
    if (!pindetails || pindetails.length === 0) {
      return res.status(404).send({
        success: false,
        message: "Pincode is not deliverable",
      });
    }

    // Respond with the found pincode details
    res.status(200).send({
      success: true,
      message: "Delivery Available at this address",
      pindetails,
    });
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error fetching pincode details:", error);

    // Respond with an error status and message
    res.status(500).send({
      success: false,
      message: "Error in getting pincode details",
      error: error.message, // Include error message in response
    });
  }
};

export default getPincodeController;
