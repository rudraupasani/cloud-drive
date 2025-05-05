const express = require("express");
const router = express.Router();
const userModel = require("../model/user.model");
const jwt = require("jsonwebtoken");

//register user
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check for missing fields
    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if the user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Create a new user
    const newUser = new userModel({ username, email, password });
    await newUser.save();

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ error: "Error registering user" });
  }
});
//login user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email, password });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const token = jwt.sign({ id: user._id }, "rudra", { expiresIn: "1h" });

    res.status(200).json({
      message: "Login successful",
      token,
      userId: user._id,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    res.status(500).json({ error: "Error logging in" });
  }
});

module.exports = router;
