const express = require("express");
const router = express.Router();
const rechargeController = require("../controllers/rechargeController");

// Routes
router.get("/", rechargeController.getAllRecharges);
router.post("/", rechargeController.createRecharge);
router.get("/user/:userId", rechargeController.getRechargeHistory);

module.exports = router;
