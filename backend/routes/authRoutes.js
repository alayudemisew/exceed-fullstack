const express = require("express");
const router = express.Router();
const authService = require("../services/authService");

// Register
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const { user, token } = await authService.registerUser(
      username,
      email,
      password
    );
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await authService.loginUser(email, password);
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
