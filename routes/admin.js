const express = require("express");
const router = express.Router();
const {check_category , add_category , view_utilities} = require("../Controllers/utilitycontroller");


router.get('/', (req, res) => {
    res.render('Admin/Login');
});

router.get('/dashboard', (req, res) => {
    res.render('Admin/Dashboard');
});

router.get('/forgetpassword', (req, res) => {
    res.render('Admin/Forgetpass');
});

router.get('/add_product', (req, res) => {
    res.render('Admin/add_product');
});

router.get('/view_products', (req, res) => {
    res.render('Admin/View_products');
});

router.get('/utilities', (req, res) => {
    res.render('Admin/utilities',{message: ""});
});

router.get('/check_category/:category', check_category);

router.post('/add_category', add_category);

router.get('/view_utilities', view_utilities);

module.exports = router;


