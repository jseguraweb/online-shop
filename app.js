const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 4000;
const { setCors } = require('./middlewares/security');
require('dotenv').config();

// DEVELOPMENT:
// const mongoose = require('mongoose');
// mongoose.connect('mongodb://127.0.0.1:27017/mr-brilli-shop', { useNewUrlParser: true, useUnifiedTopology: true });
// mongoose.connection.on('error', (err) => console.log(err));
// mongoose.connection.on('open', () => console.log('database connected'));
// mongoose.set('useFindAndModify', false);

// PRODUCTION:

const connectDB = require('./models/ConnectionDB');

connectDB();

const indexRoute = require('./routes/indexRoute');
const eyeGlassesRoute = require('./routes/eyeGlassesRoute');
const sunGlassesRoute = require('./routes/sunGlassesRoute');
const cartRoute = require('./routes/cartRoute');
const profileRoute = require('./routes/profileRoute');
const paymentRoute = require('./routes/paymentRoute');


app.use(express.static(path.resolve(__dirname, 'client')));
app.use(express.json());
app.use(setCors);
app.use('/', indexRoute);
app.use('/eyeglasses', eyeGlassesRoute);
app.use('/sunglasses', sunGlassesRoute);
app.use('/cart', cartRoute);
app.use('/profile', profileRoute);
app.use('/payment', paymentRoute);

app.use((err, req, res, next) => {
    res.json({ status: err.status, err: err.message });
});

app.listen(port, () => console.log("Server running in port: ", port));