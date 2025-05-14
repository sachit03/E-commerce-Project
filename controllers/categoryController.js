const Category = require("../model/category");
const { Op }  = require("sequelize");

exports.addCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const cat = await Category.create({ name, description });
    res.json({ status: "Category created", category: cat });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.getCategoryDetails = async (req, res) => {
  try {
    const cat = await Category.findByPk(req.params.id);
    if (!cat) return res.status(404).json({ error: "Not found" });
    res.json(cat);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.getAllCategory = async (req, res) => {
  try {
    const where = req.query.search
      ? { name: { [Op.like]: `%${req.query.search}%` } }
      : {};
    const cats = await Category.findAll({ where });
    res.json(cats);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const updates = { ...req.body, updatedAt: new Date() };
    const [count] = await Category.update(updates, {
      where: { id: req.params.id },
    });
    if (!count) return res.status(404).json({ error: "Not found" });
    res.json({ status: "Category updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const count = await Category.destroy({ where: { id: req.params.id } });
    if (!count) return res.status(404).json({ error: "Not found" });
    res.json({ status: "Category deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
