const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./src/models/userModel");

const run = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/myproductsDB");
        console.log("Connected to DB");

        const email = "sasi@gmail.com";
        const newPassword = "Sasi123"; // The password you were trying to use

        const user = await User.findOne({ email });
        if (!user) {
            console.log("User sasi@gmail.com not found!");
            process.exit(1);
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        console.log(`Success! Password for ${email} has been encrypted.`);
        console.log(`New stored hash: ${hashedPassword}`);

        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
};

run();
