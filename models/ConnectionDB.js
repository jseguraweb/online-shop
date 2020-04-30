const mongoose = require('mongoose');

const URI = process.env.URI;
const LOCAL = process.env.LOCAL;

const connectDB = async () => {
    await mongoose.connect(URI || LOCAL, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('DB connected...');
};

module.exports = connectDB;