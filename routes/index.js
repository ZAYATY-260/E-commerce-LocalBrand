const express = require("express");
const {visitorMiddleware} = require("../Controllers/visitorMiddleware.js");
const router = express.Router();




router.get('/', visitorMiddleware);

router.get('/shop', (req, res) => {
    res.render('shop');
});

router.get('/contact', (req, res) => {
    res.render('contact');
});

router.get('/tracking', (req, res) => {
    res.render('tracking');
});


module.exports = router;


