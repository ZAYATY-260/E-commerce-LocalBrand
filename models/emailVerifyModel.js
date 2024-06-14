const mongoose = require("mongoose");
const { Schema } = mongoose;

const Subsemailchema = new   Schema({
    uniqueString: String,
    createdAt: Date,
    expiresAt: Date
      
});

const Subscribersemail = mongoose.model('Subscribersemail', Subsemailchema);

module.exports = Subscribersemail;
