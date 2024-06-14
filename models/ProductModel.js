const mongoose = require("mongoose");

const { Schema } = mongoose;

const productsSchema = new Schema({
    pname: {
        type: String,
    },
    Price: {
        type: Number,
    },
    Description: {
        type: String,
    },
    quantity: {
        type: Number,
    },
    gender:{
        type: String,
    },
    category: {
        type: String,
    },
    sale: {
        type: Number,
    },
    frontimage: {
        type: String,
    },
    backimage: {
        type: String,
    }
}, { timestamps: true });


const Product = mongoose.model('Product', productsSchema);

module.exports = Product;
