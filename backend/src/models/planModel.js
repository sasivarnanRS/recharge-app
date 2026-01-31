const mongoose = require("mongoose");

const planSchema = new mongoose.Schema(
  {
    operator: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    validity: {
      type: String,
      required: true
    },
    data: {
      type: String,
      required: true
    },
    benefits: {
      type: [String],
      default: []
    },
    offers: {
      type: String
    },
    category: {
      type: String
    },
    description: {
      type: String
    },
    calls: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Plan", planSchema);