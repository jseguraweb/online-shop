const Product = require('../models/product');
const Cart = require('../models/cart');
const User = require('../models/user');

const getCart = async (req, res, next) => {
    const cart = await Cart.find();
    res.json(cart);
};

const insertProductInTheCart = async (req, res, next) => {
    try {
        // console.log(req.body);
        let clickedItem = await Product.findOne(req.body);
        clickedItem.stock -= 1;
        const updatedItem = await Product.findOneAndUpdate(req.body, clickedItem);
        // console.log('UPDATED ITEM: ', updatedItem);

        const itemAlreadyInCart = await Cart.findOne(req.body);
        console.log('ALREADY IN CART?', itemAlreadyInCart);

        if (itemAlreadyInCart) {

            itemAlreadyInCart.quantity += 1;
            const updatedCart = await Cart.findOneAndUpdate(req.body, itemAlreadyInCart);
            await updatedCart.save();

        } else {
            const newItemAddedInCart = await new Cart(
                {
                    name: updatedItem.name,
                    price: updatedItem.price,
                    quantity: updatedItem.initial_stock - (updatedItem.stock - 1)
                }
            );
            console.log('NEW ITEM: ', newItemAddedInCart);
            await newItemAddedInCart.save();
        }

        const cart = await Cart.find();
        console.log('CART: ', cart);
        res.json(cart);
    } catch (error) {
        next(error);
    }
};

const deleteOneItem = async (req, res, next) => {
    let { name } = req.body;
    console.log({ name });

    try {
        let deletedItem = await Product.findOne({ name });
        deletedItem.stock += 1;
        // console.log(deletedItem);
        const updatedItem = await Product.findOneAndUpdate({ name }, deletedItem);
        // console.log(updatedItem);

        const itemStillInCart = await Cart.findOne({ name });
        console.log('STILL IN CART?', itemStillInCart);

        if (itemStillInCart.quantity > 1) {

            itemStillInCart.quantity -= 1;
            const updatedCart = await Cart.findOneAndUpdate({ name }, itemStillInCart);
            await updatedCart.save();

        } else if (itemStillInCart.quantity === 1) {
            await Cart.findOneAndDelete({ name });
        }

    } catch (error) {
        next(error);
    }
    const cart = await Cart.find();
    console.log('CART: ', cart);
    res.json(cart);
};

const deleteAllItems = async (req, res, next) => {
    try {

        const updatedProducts = await Product.updateMany({}, { stock: 10 });
        // console.log(updatedProducts);
        // const productsList = await Product.find();
        // console.log(productsList);

        const updatedCart = await Cart.deleteMany({});
        // console.log(updatedCart);
        const cart = await Cart.find();
        // console.log(cart);
        res.json(cart);

    } catch (error) {
        next(error);
    }
};

// REGISTRATION BEFORE PAYING

const login = async (req, res, next) => {
    const { username } = req.body;
    const { password } = req.body;
    const userInDB = await User.findOne({ username });
    console.log(userInDB);

    try {
        if (userInDB) {
            if (userInDB.password === password) {
                res.send('Alright, welcome!')
            } else {
                res.send('Username or password incorrect')
            }
        } else {
            res.send('Username or password incorrect')
        }
    } catch (error) {
        next(error)
    }

};

const register = async (req, res, next) => {
    const newUser = await new User(
        {
            name: req.body.firstName,
            surname: req.body.lastName,
            address: req.body.address,
            number: req.body.addressNr,
            postcode: req.body.postCode,
            city: req.body.city,
            country: req.body.country,
            username: req.body.username,
            password: req.body.password
        }
    );
    await newUser.save();
    const users = await User.find();
    console.log(users);
    res.json(users)
};

module.exports = { getCart, insertProductInTheCart, deleteOneItem, deleteAllItems, login, register };