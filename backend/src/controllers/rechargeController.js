const Recharge = require("../models/rechargeModel");

// GET all recharges
exports.getAllRecharges = async (req, res) => {
  try {
    const recharges = await Recharge.find().populate("userId", "name email");
    res.json(recharges);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE recharge
exports.createRecharge = async (req, res) => {
  try {
    const newRecharge = new Recharge(req.body);
    const savedRecharge = await newRecharge.save();
    res.status(201).json(savedRecharge);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET recharges by user
exports.getRechargeHistory = async (req, res) => {
  try {
    const recharges = await Recharge.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(recharges);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
