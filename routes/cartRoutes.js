const express     = require("express");
const router      = express.Router();
const jwt         = require("../middleware/jwt");
const cc          = require("../controllers/cartController");

router.post(
  "/api/cart",
  jwt,
  cc.addProductToCart
);

router.get(
  "/api/cart",
  jwt,
  cc.getAllCartItems
);

router.delete(
  "/api/cart/:productId",
  jwt,
  cc.removeItem
);

module.exports = router;
