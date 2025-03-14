const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const generateToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

// Register User
async function registerUser(username, email, password) {
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("User already exists");

  const newUser = await User.create({ username, email, password });
  return { user: newUser, token: generateToken(newUser) };
}

// Login User
async function loginUser(email, password) {
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    throw new Error("Invalid credentials");
  }
  return { user, token: generateToken(user) };
}

module.exports = { registerUser, loginUser };
