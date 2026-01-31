const mongoose = require("mongoose");

const rechargeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    mobileNumber: {
      type: String,
      required: true
    },
    operator: {
      type: String,
      enum: ["JIO", "AIRTEL", "VI", "BSNL"],
      required: true
    },
    planAmount: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ["SUCCESS", "FAILED", "PENDING"],
      default: "SUCCESS"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Recharge", rechargeSchema);
