const mongoose = require("mongoose");

const { Schema } = mongoose;

const SizesSchema = new Schema({
    size: {
        type: String,
    }
}, { timestamps: true });


const sizes = mongoose.model('sizes', SizesSchema);

module.exports = sizes;