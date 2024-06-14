const mongoose = require("mongoose");

const { Schema } = mongoose;

const categorySchema = new Schema({
    category: {
        type: String,
    }
}, { timestamps: true });


const categories = mongoose.model('categories', categorySchema);

module.exports = categories;
