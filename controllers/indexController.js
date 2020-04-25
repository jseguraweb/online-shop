const Product = require('../models/product');
const Cart = require('../models/cart');

const getIndex = (req, res, next) => {
    res.send('This is the landing page');
};

const getAllProducts = async (req, res, next) => {
    try {
        const products = await Product.find();
        const cart = await Cart.find();
        res.json({ products: products, cart: cart });
    } catch (error) {
        next(error);
    }
};

module.exports = { getIndex, getAllProducts };