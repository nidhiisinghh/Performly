const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User=require('../db/modules/userSchema')
require('dotenv').config()

const signup = async (req, res) => {
    try {
        const { name, email, password, phoneno, usertype, address } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            phoneno,
            usertype,
            address
        });

        res.status(201).json({ message: "User registered", user: newUser });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token, user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const update = async (req, res) => {
    try {
        const { id } = req.user;
        const { name, email, phoneno, usertype, address } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { name, email, phoneno, usertype, address },
            { new: true }
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
