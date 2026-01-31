const Product = require("../models/productModel");

// READ ALL
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find(); // Get data from MongoDB
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE PRODUCT
exports.createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);

    const savedProduct = await newProduct.save(); // Save to MongoDB

    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};