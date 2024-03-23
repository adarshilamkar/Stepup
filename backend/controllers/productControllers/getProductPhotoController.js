import productModels from "../../models/productModels.js";

const getProductPhotoController = async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productModels.findById(pid).select("photo");
    if (product.photo.data) {
      res.set("Content-Type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in  getting photo",
    });
  }
};

export default getProductPhotoController;
