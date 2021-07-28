const User = require('../models/User');
const jwt = require('jsonwebtoken');

//create jwt token 
const maxAge = 3 * 24 * 60 * 60; // 3 days in seconds
const createToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: maxAge })
};

module.exports.register_post = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await User.create({ name, email, password });
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: false, maxAge: maxAge * 1000, sameSite: 'none', secure: true });
        res.status(201).json({ user: user._id, token });
    } catch (error) {
        res.status(400).json({ error });
    }
};

module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: false, maxAge: maxAge * 1000, sameSite: 'none', secure: true });
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error });
    }
};

module.exports.me_get = async (req, res) => {
    const token = req.cookies.jwt;
    if (token) {
        const currentUserId = await jwt.verify(token, process.env.SECRET_KEY, async (error, decodedToken) => { return decodedToken.id });
        const user = await User.findById(currentUserId)

        res.status(200).json(user);

    } else {
        res.status(401).json()
    }
}

module.exports.logout_get = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
}