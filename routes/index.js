const express = require("express");
const {get_product_index} = require("../Controllers/productController.js");
const router = express.Router();




router.get('/', get_product_index);

router.get('/shop', (req, res) => {
    res.render('shop');
});

router.get('/contact', (req, res) => {
    res.render('contact');
});

router.get('/tracking', (req, res) => {
    res.render('tracking');
});

router.get('/confirmTracking', (req, res) => {
    res.render('confirmTracking');
});


module.exports = router;


