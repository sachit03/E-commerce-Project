const Product = require("../model/product");
const { Op }  = require("sequelize");

exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category } = req.body;
    const prod = await Product.create({
      name, description, price, stock, category
    });
    res.json({ status: "Product created", product: prod });
  } catch (err) {
    console.error("createProduct error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const prod = await Product.findByPk(req.params.id);
    if (!prod) return res.status(404).json({ error: "Not found" });
    res.json(prod);
  } catch (err) {
    console.error("getProduct error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const { search, category } = req.query;
    const where = {};
    if (search)   where.name = { [Op.like]: `%${search}%` };
    if (category) where.category = category;
    const prods = await Product.findAll({ where });
    res.json(prods);
  } catch (err) {
    console.error("getAllProducts error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const updates = { ...req.body, updatedAt: new Date() };
    const [count] = await Product.update(updates, {
      where: { id: req.params.id },
    });
    if (!count) return res.status(404).json({ error: "Not found" });
    res.json({ status: "Product updated" });
  } catch (err) {
    console.error("updateProduct error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const count = await Product.destroy({ where: { id: req.params.id } });
    if (!count) return res.status(404).json({ error: "Not found" });
    res.json({ status: "Product deleted" });
  } catch (err) {
    console.error("deleteProduct error:", err);
    res.status(500).json({ error: err.message });
  }
};
