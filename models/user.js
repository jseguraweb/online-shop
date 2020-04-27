const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        address: { type: String, required: true },
        addressNr: Number,
        postCode: String,
        city: String,
        country: String,
        username: String,
        password: String,
        firstNameDEL: String,
        lastNameDEL: String,
        addressDEL: String,
        addressNrDEL: Number,
        postCodeDEL: String,
        cityDEL: String,
        countryDEL: String
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
