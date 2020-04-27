const Route = require('express').Router();
const { getCart, insertProductInTheCart, login, register, delivery, deleteOneItem, deleteAllItems } = require('../controllers/cartController');

Route.get('/', getCart);
Route.post('/', insertProductInTheCart);
Route.post('/login', login);
Route.post('/register', register);
Route.post('/delivery', delivery);
Route.delete('/', deleteOneItem);
Route.delete('/clear', deleteAllItems);

module.exports = Route;