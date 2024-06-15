const mongoose = require('mongoose');

const subscriberSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  verified: {
    type: Boolean,
    required: true,
    default: false
  }
});

const Subscriber = mongoose.model('Subscriber', subscriberSchema);

module.exports = Subscriber;