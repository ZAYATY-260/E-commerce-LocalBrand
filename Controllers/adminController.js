const Admin = require("../models/AdminModel");

const checkAdmin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Find admin by email
    const admin = await Admin.findOne({ email });

    // Check if admin exists and password matches
    if (admin && admin.password === password) {
      // Render dashboard if email and password match
      res.render('admin/dashboard');
    } else {
      // Authentication failed
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    // Handle errors
    next(error);
  }
};

module.exports = { checkAdmin };
