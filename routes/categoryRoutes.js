const express     = require("express");
const router      = express.Router();
const jwt         = require("../middleware/jwt");
const authorize   = require("../middleware/authorize");
const cc          = require("../controllers/categoryController");

router.post(
  "/api/category",
  jwt,
  authorize(["admin"]),
  cc.addCategory
);

router.get(
  "/api/category/:id",
  jwt,
  authorize(["admin"]),
  cc.getCategoryDetails
);

router.get(
  "/api/categories",
  jwt,
  authorize(["admin"]),
  cc.getAllCategory
);

router.patch(
  "/api/category/:id",
  jwt,
  authorize(["admin"]),
  cc.updateCategory
);

router.delete(
  "/api/category/:id",
  jwt,
  authorize(["admin"]),
  cc.deleteCategory
);

module.exports = router;
