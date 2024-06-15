const { mailing } = require("../Middleware/emailMiddleware.js");
const Subscriber = require("../models/SubsModel");

const sendverification = async (req, res, next) => {
  try {
    const email = req.body.email;
    // Save email to MongoDB with verified: false
    const newSubscriber = new Subscriber({ email: email, verified: false });
    await newSubscriber.save();
    
    await mailing(req); // Assuming mailing function is asynchronous
    res.redirect("/tracking?emailSent=true");
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports = { sendverification };
