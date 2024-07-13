import productModels from "../../models/productModels.js";
import fs from "fs";
import mongoose from "mongoose";

const createProductController = async (req, res) => {
  try {
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
    const { photo } = req.files;

    // Validate that the seller field is provided and is a valid ObjectId
    if (!seller || !mongoose.Types.ObjectId.isValid(seller)) {
      return res.status(400).send({
        success: false,
        message: "Invalid seller ID",
      });
    }
    if (!category || !mongoose.Types.ObjectId.isValid(category)) {
      return res.status(400).send({
        success: false,
        message: "Invalid category ID",
      });
    }
    var typearr = [];
    var temp = "";
    for (let i = 0; i < type.length; i++) {
      if (type[i] === "#") {
        typearr.push(temp);
        temp = "";
      } else {
        temp = temp + type[i];
      }
    }
    typearr.push(temp);
    var modelarr = [];
    temp = "";
    for (let i = 0; i < model.length; i++) {
      if (model[i] === "#") {
        modelarr.push(temp);
        temp = "";
      } else {
        temp = temp + model[i];
      }
    }
    modelarr.push(temp);
    var specificationsarr = [];
    temp = "";
    for (let i = 0; i < specifications.length; i++) {
      if (specifications[i] === "#") {
        specificationsarr.push(temp);
        temp = "";
      } else {
        temp = temp + specifications[i];
      }
    }
    specificationsarr.push(temp);
    var descriptionarr = [];
    temp = "";
    for (let i = 0; i < description.length; i++) {
      if (description[i] === "#") {
        descriptionarr.push(temp);
        temp = "";
      } else {
        temp = temp + description[i];
      }
    }
    descriptionarr.push(temp);
    var materialarr = [];
    temp = "";
    for (let i = 0; i < material.length; i++) {
      if (material[i] === "#") {
        materialarr.push(temp);
        temp = "";
      } else {
        temp = temp + material[i];
      }
    }
    materialarr.push(temp);
    var tagsarr = [];
    temp = "";
    for (let i = 0; i < tags.length; i++) {
      if (tags[i] === "#") {
        tagsarr.push(temp);
        temp = "";
      } else {
        temp = temp + tags[i];
      }
    }
    tagsarr.push(temp);
    var pricearr = [];
    temp = "";
    for (let i = 0; i < price.length; i++) {
      if (price[i] === "#") {
        if (temp === "") {
          pricearr.push(0);
          temp = "";
        } else pricearr.push(parseInt(temp));
        temp = "";
      } else {
        temp = temp + price[i];
      }
    }
    pricearr.push(temp);
    var discountarr = [];
    temp = "";
    for (let i = 0; i < discount.length; i++) {
      if (discount[i] === "#") {
        if (temp === "") {
          pricearr.push(0);
          temp = "";
        } else {
          discountarr.push(parseInt(temp));
          temp = "";
        }
      } else {
        temp = temp + discount[i];
      }
    }
    discountarr.push(temp);
    var otherphotoarr = [];
    temp = "";
    for (let i = 0; i < otherphoto.length; i++) {
      if (otherphoto[i] === "#") {
        otherphotoarr.push(temp);
        temp = "";
      } else {
        temp = temp + otherphoto[i];
      }
    }
    otherphotoarr.push(temp);

    const product = new productModels({
      name,
      info,
      type: typearr,
      model: modelarr,
      description: descriptionarr,
      specifications: specificationsarr,
      material: materialarr,
      tags: tagsarr,
      price: pricearr,
      discount: discountarr,
      seller: new mongoose.Types.ObjectId(seller), // Explicitly cast to ObjectId
      category: new mongoose.Types.ObjectId(category), // Explicitly cast to ObjectId
      quantity,
      shipping,
      otherphoto: otherphotoarr,
    });

    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }

    await product.save();
    res.status(201).send({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in creating product",
      error: error.message,
    });
  }
};

export default createProductController;
