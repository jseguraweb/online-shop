const Route = require('express').Router();
const { payment } = require('../controllers/paymentController');

Route.post('/', payment);

module.exports = Route;