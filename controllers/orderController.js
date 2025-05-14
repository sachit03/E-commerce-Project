const Order = require("../model/order");
const stripe = require("../config/stripe");

exports.createOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { items, shippingAddress, billingAddress } = req.body;
    const totalAmount = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const amountInCents = Math.round(totalAmount * 100);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: "usd",
      metadata: { userId: String(userId) },
    });

    const order = await Order.create({
      userId,
      items,
      totalAmount,
      shippingAddress,
      billingAddress,
      paymentIntentId: paymentIntent.id,
      paymentStatus: paymentIntent.status, 
    });
    res.status(201).json({
      status: "Order pending payment",
      orderId: order.id,
      clientSecret: paymentIntent.client_secret
    });
  } catch (err) {
    console.error("createOrder error:", err);
    res.status(400).json({ error: err.message });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { items, shippingAddress, billingAddress } = req.body;
    let totalAmount = 0;
    for (const item of items) {
      totalAmount += item.price * item.quantity;
    }

    const order = await Order.create({
      userId,
      items,
      totalAmount,
      shippingAddress,
      billingAddress,
    });

    res.status(201).json({ status: "Order placed", order });
  } catch (err) {
    console.error("createOrder error:", err);
    res.status(400).json({ error: err.message });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
    });
    res.json(orders);
  } catch (err) {
    console.error("getUserOrders error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getOrderDetails = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const order = await Order.findOne({ where: { id, userId } });
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json(order);
  } catch (err) {
    console.error("getOrderDetails error:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.cancelOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const order = await Order.findOne({ where: { id, userId } });
    if (!order) return res.status(404).json({ error: "Order not found" });
    if (order.status !== "pending") {
      return res
        .status(400)
        .json({ error: "Only pending orders can be cancelled" });
    }
    order.status = "cancelled";
    order.updatedAt = new Date();
    await order.save();
    res.json({ status: "Order cancelled" });
  } catch (err) {
    console.error("cancelOrder error:", err);
    res.status(500).json({ error: err.message });
  }
};
