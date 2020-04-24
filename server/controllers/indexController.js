const getIndex = (req, res, next) => {
    res.send('This is the landing page');
};

module.exports = { getIndex };