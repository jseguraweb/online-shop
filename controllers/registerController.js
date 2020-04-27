const User = require('../models/user');

const register = async (req, res, next) => {
    try {

        const newUser = await new User(req.body);
        await newUser.save();
        res.json({ status: 'New user successfully registered', data: newUser });

    } catch (error) {
        next(error);
    }
};

module.exports = { register };