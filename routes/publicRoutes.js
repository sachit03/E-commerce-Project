const express     = require("express");
const router      = express.Router();
const jwt         = require("../middleware/jwt");
const pc          = require("../controllers/publicController");

router.get(
  "/api/user/categories",
  jwt,
  pc.getAllCategoryForUser
);

router.get(
  "/api/user/products",
  jwt,
  pc.getAllProductsForUser
);

router.get(
  "/api/user/product/:id",
  jwt,
  pc.getProductDetailsForUser
);

module.exports = router;
