const Route = require('express').Router();
const { getCart, insertProductInTheCart, deleteOneItem, deleteAllItems } = require('../controllers/cartController');

Route.get('/', getCart);
Route.post('/', insertProductInTheCart);
Route.delete('/', deleteOneItem);
Route.delete('/clear', deleteAllItems);

module.exports = Route;