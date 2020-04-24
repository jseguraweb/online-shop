const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductSchema = new Schema(
    {
        name: { type: String, required: true },
        picture: { type: String, required: true },
        price: Number,
        initial_stock: Number,
        type: String
    }
);

module.exports = mongoose.model('Product', ProductSchema);
