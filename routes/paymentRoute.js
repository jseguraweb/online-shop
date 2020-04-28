const Route = require('express').Router();
const { payment, paypalPayment, paymentSuccess, paymentCancel } = require('../controllers/paymentController');

Route.post('/', payment);
Route.post('/paypal', paypalPayment);
Route.get('/paypal/success', paymentSuccess);
Route.get('/paypal/cancel', paymentCancel);

module.exports = Route;