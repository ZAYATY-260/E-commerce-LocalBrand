const express = require("express");
const {visitorMiddleware} = require("../Controllers/visitorMiddleware.js");
const router = express.Router();




router.get('/', visitorMiddleware);



module.exports = router;


