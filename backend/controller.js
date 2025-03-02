const User = require('./models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

async function login(req, res) {
    try {
        const data = req.body;
        const existingUser = await User.findOne({ email: data.email });
        if (!existingUser) {
            return res.status(404).json({ "message": "User not found. Please check your email or sign up." });
        }
        const isMatch = await bcrypt.compare(data.password, existingUser.password);
        if (!isMatch) {
            return res.status(401).json({ "message": "Incorrect password. Please try again." });
        }
        const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
        return res.status(200).json({ "message": "Login Successful", "token": token });
    } catch (error) {
        return res.status(500).json({ "message": "Internal Server Error", "error": error.message });
    }
}

async function signup(req, res) {
    try {
        const data = req.body;
        const isNewUser = await User.findOne({ email: data.email });
        if (isNewUser) {
            return res.status(400).json({ "message": "User already exists. Please log in instead." });
        }
        data.password = await bcrypt.hash(data.password, 10);
        const newUser = await User.create(data);
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
        return res.status(201).json({ "message": "Signup successful", "token": token });
    } catch (error) {
        return res.status(500).json({ "message": "Internal Server Error", "error": error.message });
    }
}

async function getdata(req, res) {
    try {
        if (!req.user || !req.user.id) {
            return res.status(403).json({ "message": "Access denied. No token provided." });
        }
        const userId = req.user.id;
        const data = await User.findOne({ _id: userId });
        if (!data) {
            return res.status(404).json({ "message": "User data not found." });
        }
        const { password, __v, _id, ...result } = data.toObject();
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ "message": "Internal Server Error", "error": error.message });
    }
}

async function update(req, res) {
    try {
        if (!req.user || !req.user.id) {
            return res.status(403).json({ "message": "Access denied. No token provided." });
        }
        const userId = req.user.id;
        const data = await User.findByIdAndUpdate(userId, { $set: req.body }, { new: true, upsert: false });
        if (!data) {
            return res.status(404).json({ "message": "User not found. Update failed." });
        }
        return res.status(200).json({ "message": "User data updated successfully.", "updatedData": data });
    } catch (error) {
        return res.status(500).json({ "message": "Internal Server Error", "error": error.message });
    }
}

module.exports = { login, signup, getdata, update };
