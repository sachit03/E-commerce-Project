const categoryController = require("./categoryController");
const productController  = require("./productController");

exports.getAllCategoryForUser = async (req, res) => {
  return categoryController.getAllCategory(req, res);
};

exports.getAllProductsForUser = async (req, res) => {
  return productController.getAllProducts(req, res);
};


exports.getProductDetailsForUser = async (req, res) => {
  return productController.getProduct(req, res);
};
