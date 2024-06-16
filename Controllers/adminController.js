// adminController.js

const jwt = require('jsonwebtoken');
const Admin = require("../models/AdminModel");

const checkAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find admin by email and password
        const admin = await Admin.findOne({ email, password });

        if (!admin) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate token
        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Save token to admin in database
        admin.token = token;
        await admin.save();

        // Set token in cookie or response header as needed
        // Example: Set in cookie
        res.cookie('token', token, { httpOnly: true });

        // Send response
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error logging in admin:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { checkAdmin };
