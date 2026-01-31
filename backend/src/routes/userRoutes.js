const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Auth Routes
router.post("/login", userController.loginUser);
router.post("/register", userController.registerUser);

// CRUD Routes
router.get("/", userController.getAllUsers);
router.post("/", userController.createUser);

module.exports = router;