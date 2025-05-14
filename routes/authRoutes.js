const express = require("express");
const router  = express.Router();
const ac      = require("../controllers/authController");

router.post("/api/register", ac.register);
router.post("/api/login",    ac.login);

module.exports = router;
