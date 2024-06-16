const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Admin = require('../models/AdminModel'); 




// const addAdmin = async (email, plainPassword) => {
//   try {
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(plainPassword, salt);

//     const newAdmin = new Admin({
//       email: email,
//       password: hashedPassword,
//     });

//     await newAdmin.save();
//     console.log('Admin user created successfully');
//     mongoose.connection.close();
//   } catch (error) {
//     console.error('Error creating admin user:', error);
//     mongoose.connection.close();
//   }
// };

// // Replace with the admin email and plain password
// addAdmin('zayaty@gmail.com', 'admin123');
