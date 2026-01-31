const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// GET all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// LOGIN user
exports.loginUser = async (req, res) => {
  console.log("Login attempt:", req.body);
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      console.log("User not found for email:", email);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match result:", isMatch);

    if (!isMatch) {
      console.log("Password does not match");
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, 'your-secret-key', { expiresIn: '24h' });
    console.log("Login successful, token generated");
    res.json({ token, user: { _id: user._id, email: user.email, name: user.name, role: user.role, phone: user.phone } });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ error: err.message });
  }
};

// REGISTER user
exports.registerUser = async (req, res) => {
  console.log("Register attempt:", req.body);
  try {
    const { email, password, name, phone } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("User already exists:", email);
      return res.status(400).json({ error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword, name, phone });
    const savedUser = await newUser.save();
    console.log("User created:", savedUser._id);

    const token = jwt.sign({ userId: savedUser._id, role: savedUser.role }, 'your-secret-key', { expiresIn: '24h' });
    res.status(201).json({ token, user: { _id: savedUser._id, email: savedUser.email, name: savedUser.name, role: savedUser.role, phone: savedUser.phone } });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(400).json({ error: err.message });
  }
};

// CREATE user (Signup)
exports.createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};