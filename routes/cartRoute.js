const Route = require('express').Router();
const { getCart, insertProductInTheCart, login, register, deleteOneItem, deleteAllItems } = require('../controllers/cartController');

Route.get('/', getCart);
Route.post('/', insertProductInTheCart);
Route.post('/login', login);
Route.post('/register', register);
Route.delete('/', deleteOneItem);
Route.delete('/clear', deleteAllItems);

module.exports = Route;