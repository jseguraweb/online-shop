const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const indexRoute = require('./routes/indexRoute');
const eyeGlassesRoute = require('./routes/eyeGlassesRoute');
const sunGlassesRoute = require('./routes/sunGlassesRoute');
const cartRoute = require('./routes/cartRoute');
const profileRoute = require('./routes/profileRoute');

app.use(express.json());
app.use('/', indexRoute);
app.use('/eyeglasses', eyeGlassesRoute);
app.use('/sunglasses', sunGlassesRoute);
app.use('/cart', cartRoute);
app.use('/profile', profileRoute);

app.listen(port, () => console.log("Server running in port: ", port));