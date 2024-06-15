const { mailing } = require("../Middleware/emailMiddleware.js");
const Subscriber = require("../models/SubsModel");

const sendverification = async (req, res, next) => {
  try {
    const email = req.body.email;

    
    const existingSubscriber = await Subscriber.findOne({ email: email });

    if (existingSubscriber) {
      
      res.redirect("/tracking?emailExists=true");
      return;
    }

    
    const newSubscriber = new Subscriber({ email: email, verified: false });
    await newSubscriber.save();

    await mailing(req, res); 
    res.redirect("/tracking?emailSent=true");
  } catch (err) {
    if (err.code === 11000) { 
      res.redirect("/tracking?emailExists=true");
    } else {
      console.error(err);
      next(err);
    }
  }
};

module.exports = { sendverification };
