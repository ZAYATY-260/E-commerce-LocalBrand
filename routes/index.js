const express = require("express");
const {get_product_index} = require("../Controllers/productController.js");
const {sendverification} = require("../Controllers/subController.js");
const { verifyEmail } = require("../Controllers/verifyController");
const router = express.Router();




router.get('/', (req, res) => {
    res.render('index');
});

router.get('/shop', get_product_index);



router.get('/contact', (req, res) => {
    res.render('contact');
});

router.get('/tracking', (req, res) => {
    res.render('tracking');
});

router.post('/sendverification', sendverification);
router.get('/verify', verifyEmail);

router.get('/confirmTracking', (req, res) => {
    res.render('confirmTracking');
});



module.exports = router;


