const User = require('../models/User');
const jwt = require('jsonwebtoken');

//create jwt token 
const maxAge = 3 * 24 * 60 * 60; // 3 days in seconds
const createToken = (id) => {
    return jwt.sign({ id }, 'secret', { expiresIn: maxAge })
};

module.exports.signup_post = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await User.create({ name, email, password });
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({ user: user._id });
    } catch (error) {
        console.log(error);
    }
};

module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({ user: user._id });
    } catch (error) {
        console.log(error);
    }
};