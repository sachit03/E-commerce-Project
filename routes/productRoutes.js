const express     = require("express");
const router      = express.Router();
const jwt         = require("../middleware/jwt");
const authorize   = require("../middleware/authorize");
const pc          = require("../controllers/productController");


router.post(
  "/api/product",
  jwt,
  authorize(["admin"]),
  pc.createProduct
);

router.get(
  "/api/product/:id",
  jwt,
  authorize(["admin"]),
  pc.getProduct
);

router.get(
  "/api/products",
  jwt,
  authorize(["admin"]),
  pc.getAllProducts
);

router.patch(
  "/api/product/:id",
  jwt,
  authorize(["admin"]),
  pc.updateProduct
);

router.delete(
  "/api/product/:id",
  jwt,
  authorize(["admin"]),
  pc.deleteProduct
);

module.exports = router;
