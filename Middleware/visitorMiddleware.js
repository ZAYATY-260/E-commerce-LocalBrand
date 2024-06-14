const Visitor = require('../models/VisitorModel'); // Assuming you have a Visitor model defined

const visitorMiddleware = async (req, res, next) => {
  const ipAddress = req.ip; // Get the IP address of the visitor
  try {
    // Check if this IP address has already visited the website
    let visitor = await Visitor.findOne({ ipAddress });

    if (!visitor) {
      // If the IP address is not found in the database, create a new entry
      visitor = new Visitor({ ipAddress, count: 1 });
    } else {
      // If the IP address is found, increment the count
      visitor.count += 1;
    }

    // Save the updated visitor information to the database
    await visitor.save();

    // Set totalCount in req object for use in the route handler
    req.totalCount = await Visitor.countDocuments();
    // Continue to the next middleware or route handler
    res.render("index");
  } catch (err) {
    console.error("Error updating visitor count:", err);
    next(err);
  }
};

module.exports = { visitorMiddleware };
