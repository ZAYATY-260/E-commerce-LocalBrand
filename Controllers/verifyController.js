const { mailing } = require("../Middleware/emailMiddleware.js");
const Subscriber = require("../models/SubsModel");



const verifyEmail = async (req, res, next) => {
  try {
    const email = req.query.email;
    if (!email) {
      return res.status(400).send("Invalid request");
    }

    
    const subscriber = await Subscriber.findOneAndUpdate(
      { email: email },
      { verified: true },
      { new: true }
    );

    if (!subscriber) {
      return res.status(404).send("Subscriber not found");
    }

    
    res.render('confirmTracking');
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports = { verifyEmail };
