const express = require("express");
const router = express.Router();
const planController = require("../controllers/planController");
// DELETE all plans
router.delete("/", planController.deleteAllPlans);

// Routes
router.get("/", (req, res, next) => {
    req.params.operator = 'all';
    next();
}, planController.getPlansByOperator);
router.get("/:operator", planController.getPlansByOperator);
router.post("/", planController.createPlan);
router.put("/:id", planController.updatePlan);
router.delete("/:id", planController.deletePlan);

module.exports = router;
