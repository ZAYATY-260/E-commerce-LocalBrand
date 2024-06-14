const { mailing } = require("../Middleware/emailMiddleware.js");
const express = require("express");
const router = express.Router();

const sendverification = async (req, res, next) => {
  try {
    await mailing(req); // Assuming mailing function is asynchronous
    res.redirect("/tracking?emailSent=true");
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports = { sendverification };
