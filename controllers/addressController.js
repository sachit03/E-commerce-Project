const Address = require("../model/address");

exports.addAddress = async (req, res) => {
  try {
    const { street, city, state, postalCode, country, type } = req.body;
    const userId = req.user.id;

    const address = await Address.create({
      street,
      city,
      state,
      postalCode,
      country,
      type,
      userId,
    });

    res.status(201).json({ status: "Address added", address });
  } catch (err) {
    console.error("addAddress error:", err);
    res.status(400).json({ error: err.message });
  }
};

exports.updateAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body, updatedAt: new Date() };
    const userId = req.user.id;

    const [count] = await Address.update(updates, {
      where: { id, userId }, 
    });

    if (!count) return res.status(404).json({ error: "Address not found" });
    res.json({ status: "Address updated" });
  } catch (err) {
    console.error("updateAddress error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getUserAddresses = async (req, res) => {
  try {
    const userId = req.user.id;
    const addresses = await Address.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
    });
    res.json(addresses);
  } catch (err) {
    console.error("getUserAddresses error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const count = await Address.destroy({ where: { id, userId } });
    if (!count) return res.status(404).json({ error: "Address not found" });
    res.json({ status: "Address deleted" });
  } catch (err) {
    console.error("deleteAddress error:", err);
    res.status(500).json({ error: err.message });
  }
};