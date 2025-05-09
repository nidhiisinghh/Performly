const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../db/modules/userSchema');
require('dotenv').config();

const signup = async (req, res) => {
  try {
    const { name, email, password, phoneno, usertype, address } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      phoneno,
      usertype,
      address,
    });

    res.status(201).json({ message: "User registered", user: newUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    // Generate JWT token
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.user;  // Assuming user ID is available from the auth middleware
    const { name, email, phoneno, usertype, address } = req.body;

    // Update user information (excluding password)
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, phoneno, usertype, address },
      { new: true }  // Returns the updated document
    );

    res.status(200).json({ message: "User updated", user: updatedUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  signup,
  signin,
  update
};
