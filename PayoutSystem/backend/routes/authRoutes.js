const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Load admin credentials from .env
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

// Registration route - never allow 'admin' role from frontend
router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    // Prevent registration as admin
    if (email === ADMIN_EMAIL) {
        return res.status(403).json({ error: "Admin user cannot be registered via this route." });
    }

    // Always assign 'user' role
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, role: 'user' });
    await user.save();
    res.json({ message: "User registered" });
});

// Login route - allow admin login using .env credentials
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    // If admin login
    if (email === ADMIN_EMAIL) {
        // Compare with .env password
        if (password !== ADMIN_PASSWORD) {
            return res.status(400).json({ error: "Invalid password" });
        }
        // Check if admin exists in DB, if not create it
        let admin = await User.findOne({ email: ADMIN_EMAIL, role: 'admin' });
        if (!admin) {
            admin = new User({ name: "Admin", email: ADMIN_EMAIL, password: await bcrypt.hash(ADMIN_PASSWORD, 10), role: 'admin' });
            await admin.save();
        }
        const token = jwt.sign({ userId: admin._id, role: admin.role }, process.env.JWT_SECRET);
        return res.json({ token, user: admin });
    }

    // Normal user login
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid email" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid password" });

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET);
    res.json({ token, user });
});

module.exports = router;