const Product = require('../Model/product');
const { validationResult } = require("express-validator");

const getProductByID = async function (req, res) {
  try {
    const id = req.params.id;
    const productById = await Product.findById({ _id: id });
    if (productById) {
      return res.status(200).json({
        sucess: true,
        data: productById,
      });
    } else {
      return res.status(400).json({
        sucess: false,
        msg: "Product Not Found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      sucess: false,
      msg: "error",
      error: error,
    });
  }
};

const addproduct = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        msg: "Validation Error",
        errors: errors.array(),
      });
    }
    
    
    const checkproduct = await Product.findOne({ name: req.body.name });

    if (checkproduct) {
      return res.status(400).json({
        sucess: false,
        msg: "Product already present",
      });
    }

    const newProduct = new Product({
      name: req.body.name,
      price: req.body.price,
      color: req.body.color,
      Category: req.body.Category,
      Description: req.body.Description,
      ProductImageurl: req.body.ProductImageurl,
      quantity: req.body.quantity,
    });
    const addcheck = await newProduct.save();
    if (addcheck) {
      return res.status(200).json({
        sucess: true,
        msg: "Added Successfully!.",
      });
    }
  } catch (error) {}
};
module.exports = {
  getProductByID,
  addproduct,
};
