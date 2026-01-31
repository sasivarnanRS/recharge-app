const mongoose = require("mongoose");
const Plan = require("./src/models/planModel");

const run = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/myproductsDB");
        console.log("Connected to DB");

        const plans = await Plan.find({}, 'operator amount _id');
        console.log("Plans found:", plans.length);
        console.log(JSON.stringify(plans, null, 2));

        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
};

run();
