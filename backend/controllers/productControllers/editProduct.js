import productModels from "../../models/productModels.js";

const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      info,
      type,
      model,
      description,
      specifications,
      material,
      tags,
      price,
      discount,
      seller,
      category,
      quantity,
      shipping,
      otherphoto,
    } = req.fields;

    // Parse the string inputs into arrays
    const parseStringToArray = (str) =>
      str.split("#").filter((item) => item.trim() !== "");

    const typeArr = parseStringToArray(type);
    const modelArr = parseStringToArray(model);
    const descriptionArr = parseStringToArray(description);
    const specificationsArr = parseStringToArray(specifications);
    const materialArr = parseStringToArray(material);
    const tagsArr = parseStringToArray(tags);
    const priceArr = parseStringToArray(price).map((item) => parseFloat(item)); // Ensure prices are numeric
    const discountArr = parseStringToArray(discount).map((item) =>
      parseInt(item)
    ); // Ensure discounts are numeric
    const otherPhotoArr = parseStringToArray(otherphoto);

    // Prepare the update object
    const updatedProductData = {
      name,
      info,
      type: typeArr,
      model: modelArr,
      description: descriptionArr,
      specifications: specificationsArr,
      material: materialArr,
      tags: tagsArr,
      price: priceArr,
      discount: discountArr,
      seller,
      category,
      quantity,
      shipping,
      otherphoto: otherPhotoArr,
    };

    // Find and update the product
    const updatedProduct = await productModels.findByIdAndUpdate(
      id,
      { $set: updatedProductData },
      { new: true, runValidators: true } // Return the updated document and run schema validation
    );

    if (!updatedProduct) {
      return res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).send({
      success: false,
      message: "An error occurred while updating the product",
      error: error.message,
    });
  }
};

export default editProduct;
