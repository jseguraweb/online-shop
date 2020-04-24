const getEyeGlasses = (req, res, next) => {
    res.send('This is the eyeglasses page');
};

const getInfoEyeGlasses = (req, res, next) => {
    res.send(`This is the info page of the ${req.params.name} eyeglasses`);
};

module.exports = { getEyeGlasses, getInfoEyeGlasses };