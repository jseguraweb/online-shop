const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema(
    {
        name: { type: String, required: true },
        surname: { type: String, required: true },
        address: { type: String, required: true },
        number: Number,
        postcode: Number,
        city: String,
        country: String
    },
    {
        toObject: {
            virtuals: true
        },
        toJSON: {
            virtuals: true
        }
    }
);

ProductSchema.virtual('complete-address').get(function () { return `${this.address} ${this.number}, ${this.postcode} ${this.city} (${this.country})` });

module.exports = mongoose.model('User', UserSchema);
