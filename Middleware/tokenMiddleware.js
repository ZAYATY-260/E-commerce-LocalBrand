const jwt = require('jsonwebtoken');
const Admin = require('../models/AdminModel');

const verifyToken = (req, res, next) => {
    // Extract token from headers or cookies
    const token = req.headers.authorization || req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Authorization token not found' });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        // Check if admin exists in database
        const admin = await Admin.findOne({ _id: decoded.id, token });

        if (!admin) {
            return res.status(401).json({ message: 'Admin not found or token mismatch' });
        }

        // Attach admin details to request object
        req.admin = admin;
        next();
    });
};

module.exports = verifyToken;
