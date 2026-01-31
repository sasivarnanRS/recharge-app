const User = require("../models/userModel");
const Recharge = require("../models/rechargeModel");

exports.getDashboardStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalRecharges = await Recharge.countDocuments();

        const revenueResult = await Recharge.aggregate([
            { $match: { status: "SUCCESS" } },
            { $group: { _id: null, total: { $sum: "$planAmount" } } }
        ]);
        const totalRevenue = revenueResult.length > 0 ? revenueResult[0].total : 0;

        res.json({
            totalUsers,
            totalRevenue,
            totalRecharges
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
