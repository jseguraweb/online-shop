const Route = require('express').Router();
const { getCart, insertProductInTheCart, deleteOneItem } = require('../controllers/cartController');

Route.get('/', getCart);
Route.post('/', insertProductInTheCart);
Route.delete('/', deleteOneItem);

module.exports = Route;