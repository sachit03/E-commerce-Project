const express = require("express");
const router  = express.Router();
const jwt     = require("../middleware/jwt");
const oc      = require("../controllers/orderController");

router.post("/api/order", jwt, oc.createOrder);
router.get("/api/orders", jwt, oc.getUserOrders);
router.get("/api/order/:id", jwt, oc.getOrderDetails);
router.patch("/api/order/:id/cancel", jwt, oc.cancelOrder);
module.exports = router;
