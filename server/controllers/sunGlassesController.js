const getSunGlasses = (req, res, next) => {
    res.send('This is the sunglasses page');
};

const getInfoSunGlasses = (req, res, next) => {
    res.send(`This is the info page of the ${req.params.name} sunglasses`);
};

module.exports = { getSunGlasses, getInfoSunGlasses };