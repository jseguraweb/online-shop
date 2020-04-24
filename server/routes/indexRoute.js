const Route = require('express').Router();
const { getIndex } = require('../controllers/indexController');

Route.get('/', getIndex);

module.exports = Route;