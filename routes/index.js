const express = require("express");
const {visitorMiddleware} = require("../Controllers/visitorMiddleware.js");
const router = express.Router();




router.get('/', visitorMiddleware);

router.get('/contact', (req, res) => {
    res.render('contact');
});


module.exports = router;


