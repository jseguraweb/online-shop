const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema(
    {
        name: { type: String, required: true },
        surname: { type: String, required: true },
        address: { type: String, required: true },
        number: Number,
        postcode: String,
        city: String,
        country: String,
        username: String,
        password: String
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

UserSchema.virtual('complete-address').get(function () { return `${this.address} ${this.number}, ${this.postcode} ${this.city} (${this.country})` });

module.exports = mongoose.model('User', UserSchema);
