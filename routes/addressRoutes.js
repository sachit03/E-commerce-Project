const express = require("express");
const router = express.Router();
const jwt = require("../middleware/jwt");
const ac = require("../controllers/addressController");

router.post("/api/address", jwt, ac.addAddress);
router.patch("/api/address/:id", jwt, ac.updateAddress);
router.get("/api/address", jwt, ac.getUserAddresses);
router.delete("/api/address/:id", jwt, ac.deleteAddress);

module.exports = router;