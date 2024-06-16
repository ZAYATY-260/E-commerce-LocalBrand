const mongoose = require("mongoose");

const { Schema } = mongoose;

const categorySchema = new Schema({
    Name: {
        type: String,
    }
}, { timestamps: true });


const categories = mongoose.model('categories', categorySchema);

module.exports = categories;
