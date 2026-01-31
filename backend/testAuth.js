const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./src/models/userModel");

const run = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/myproductsDB");
        console.log("Connected to DB");

        const email = "testuser@example.com";
        const password = "password123";

        // Cleanup
        await User.deleteMany({ email });
        console.log("Cleaned up old test user");

        // Create
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            email,
            password: hashedPassword,
            name: "Test User",
            phone: "1234567890",
            role: "user"
        });
        await newUser.save();
        console.log("Created User");

        // Verify
        const foundUser = await User.findOne({ email });
        console.log("Found user:", foundUser);

        const isMatch = await bcrypt.compare(password, foundUser.password);
        console.log("Password match:", isMatch);

        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
};

run();
