const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Performer = require('../db/modules/performer');
require('dotenv').config();

// Performer Signup
const signup = async (req, res) => {
  try {
    const { name, email, password, city, category, rating } = req.body;

    const existingPerformer = await Performer.findOne({ email });
    if (existingPerformer)
      return res.status(400).json({ message: "Performer already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newPerformer = await Performer.create({
      name,
      email,
      password: hashedPassword,
      city,
      category,
      rating: rating || 0,
    });

    res.status(201).json({ message: "Performer registered", performer: newPerformer });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Performer Signin
const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const performer = await Performer.findOne({ email });
    if (!performer) return res.status(404).json({ message: "Performer not found" });

    const isMatch = await bcrypt.compare(password, performer.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: performer._id, email: performer.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ token, performer });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Optional: Performer Profile Update
const update = async (req, res) => {
  try {
    const { id } = req.user; // from auth middleware
    const { name, email, city, category } = req.body;

    const updatedPerformer = await Performer.findByIdAndUpdate(
      id,
      { name, email, city, category },
      { new: true }
    );

    res.status(200).json({ message: "Performer updated", performer: updatedPerformer });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  signup,
  signin,
  update,
};
