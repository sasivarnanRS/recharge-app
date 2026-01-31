const Plan = require("../models/planModel");

// GET plans by operator
exports.getPlansByOperator = async (req, res) => {
  try {
    const { operator } = req.params;
    let query = {};
    if (operator && operator.toLowerCase() !== 'all') {
      // Case-insensitive regex match
      query.operator = { $regex: new RegExp(`^${operator}$`, 'i') };
    }
    const plans = await Plan.find(query);
    res.json(plans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE plan (admin use)
exports.createPlan = async (req, res) => {
  try {
    const plan = await Plan.create(req.body);
    res.status(201).json(plan);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
// UPDATE plan
exports.updatePlan = async (req, res) => {
  try {
    const updatedPlan = await Plan.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedPlan);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE plan
exports.deletePlan = async (req, res) => {
  try {
    await Plan.findByIdAndDelete(req.params.id);
    res.json({ message: "Plan deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE all plans
exports.deleteAllPlans = async (req, res) => {
  try {
    await Plan.deleteMany({});
    res.json({ message: "All plans deleted successfully ✅" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
