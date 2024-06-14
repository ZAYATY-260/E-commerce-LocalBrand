const Visitor = require('../models/VisitorModel'); // Assuming you have a Visitor model defined
const getIpAddress = require('../Functions/ipUtils');

const visitorMiddleware = async (req, res, next) => {
  
  const ipAddress = getIpAddress(req);
  
  
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

  } catch (err) {
    console.error("Error updating visitor count:", err);
    next(err);
  }
};

module.exports = { visitorMiddleware };
