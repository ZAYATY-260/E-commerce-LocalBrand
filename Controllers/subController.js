const {mailing} = require("../Middleware/emailMiddleware.js");
const express = require("express");
const router = express.Router(); 

const sendverification = async (req,res,next) => {
  
   try {
    mailing(req);
    res.redirect("/tracking");
  } catch (err) {
    console.error(err);
    next(err); 
  }

};

module.exports = {sendverification};

