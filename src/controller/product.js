const Product = require("../models/product");

const getProduct = async (req, res) => {
     res.status(200).json({ "message": "get api for products" });
}

const createProduct = async (req, res) => {
     const { name, price } = req.body;

     if (!name || !price) {
          res.status(400).send({ "message": "Name or price is required" });
     }
     try {
          const product = new Product(req.body);
          await product.save();
          res.status(200).send({ "message": "product is successfully add" });

     } catch (error) {
          res.status(400).send(error);
     }
}

module.exports = { getProduct, createProduct }