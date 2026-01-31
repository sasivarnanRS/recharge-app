const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const dbUri = process.env.MONGODB_URI || "mongodb+srv://rssasivarnan_db_user:sasivarnan@cluster0.bfkp4js.mongodb.net/myproductsDB?appName=Cluster0";
    await mongoose.connect(dbUri);
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;