// admin.js

const express = require("express");
const router = express.Router();
const { check_category, add_category, view_utilities } = require("../Controllers/utilitycontroller");
const { view_add_productpage } = require("../Controllers/productController");
const { checkAdmin } = require("../Controllers/adminController.js");
const { verifyToken } = require("../Middleware/tokenMiddleware.js");

// Render login page
router.get('/', (req, res) => {
    res.render('Admin/Login');
});

// Handle admin login
router.post('/checkAdmin', checkAdmin);

// Dashboard route requiring authentication
router.get('/dashboard', verifyToken, (req, res) => {
    res.render('Admin/Dashboard');
});

// Forgotten password route
router.get('/forgetpassword', (req, res) => {
    res.render('Admin/Forgetpass');
});

// Add product route
router.get('/add_product', verifyToken, view_add_productpage );

// View products route
router.get('/view_products', verifyToken, (req, res) => {
    res.render('Admin/View_products');
});

// Utilities route
router.get('/utilities', verifyToken, (req, res) => {
    res.render('Admin/utilities', { message: "" });
});

// Check category route
router.get('/check_category/:category', verifyToken, check_category);

// Add category route
router.post('/add_category', verifyToken, add_category);

// View utilities route
router.get('/view_utilities', verifyToken, view_utilities);

module.exports = router;
