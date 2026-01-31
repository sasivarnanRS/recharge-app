const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./src/models/userModel");

const run = async () => {
    try {
        require('dotenv').config();
        const uri = process.env.MONGODB_URI || "mongodb+srv://rssasivarnan_db_user:sasivarnan@cluster0.bfkp4js.mongodb.net/myproductsDB?appName=Cluster0";
        await mongoose.connect(uri);
        console.log("Connected to DB");

        const email = "admin@gmail.com";
        const password = "Admin@123";

        // Check if exists
        let user = await User.findOne({ email });

        const hashedPassword = await bcrypt.hash(password, 10);

        if (user) {
            console.log("Admin user found, updating password...");
            user.password = hashedPassword;
            user.role = "admin";
            await user.save();
            console.log("Admin password updated.");
        } else {
            console.log("Creating new admin user...");
            // Generate random 10 digit phone to avoid collision
            const randomPhone = Math.floor(1000000000 + Math.random() * 9000000000).toString();

            user = new User({
                email,
                password: hashedPassword,
                name: "Super Admin",
                phone: randomPhone,
                role: "admin"
            });
            await user.save();
            console.log(`Admin created with phone ${randomPhone}`);
        }

        process.exit(0);
    } catch (e) {
        console.error("Error seeding admin:", e);
        process.exit(1);
    }
};

run();
