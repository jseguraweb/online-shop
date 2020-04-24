const getCart = (req, res, next) => {
    res.send('This is the cart page');
};

const insertProductInTheCart = (req, res, next) => {
    res.send('Product added in the cart')
};

module.exports = { getCart, insertProductInTheCart };