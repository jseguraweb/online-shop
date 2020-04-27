const User = require('../models/user');

const login = async (req, res, next) => {
    const { username } = req.body;
    const { password } = req.body;
    const userInDB = await User.findOne({ username });
    console.log(userInDB);

    try {
        if (userInDB) {
            if (userInDB.password === password) {
                console.log('Username and password correct');
                res.json({ status: 'Username and password correct', data: userInDB });
            } else {
                console.log('Username or password incorrect');
                res.json({ status: 'Username or password incorrect' });
            }
        } else {
            console.log('Username or password incorrect');
            res.json({ status: 'Username or password incorrect' });
        }
    } catch (error) {
        next(error);
    }

};

module.exports = { login };