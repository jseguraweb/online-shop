const Route = require('express').Router();
const { getCart, insertProductInTheCart } = require('../controllers/cartController');

Route.get('/', getCart);
Route.post('/', insertProductInTheCart);

module.exports = Route;