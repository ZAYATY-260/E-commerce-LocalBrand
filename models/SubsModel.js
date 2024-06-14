const mongoose = require("mongoose");
const { Schema } = mongoose;

const Subschema = new   Schema({
    email:String
      
});

const Subscribers = mongoose.model('Subscribers', Subschema);

module.exports = Subscribers;
