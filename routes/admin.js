const express = require("express");
const router = express.Router();



router.get('/', (req, res) => {
    res.render('Admin/Login');
});

router.get('/dashboard', (req, res) => {
    res.render('Admin/Dashboard');
});

router.get('/forgetpassword', (req, res) => {
    res.render('Admin/Forgetpass');
});

module.exports = router;


