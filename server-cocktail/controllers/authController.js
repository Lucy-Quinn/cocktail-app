const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
//create jwt token 
const maxAge = 3 * 24 * 60 * 60; // 3 days in seconds
const createToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: maxAge })
};

module.exports.register_post = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const salt = await bcrypt.genSalt();
        let hashedPassword = await bcrypt.hash(password, salt);
        const user = await User.create({ name, email, password: hashedPassword });
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: false, maxAge: maxAge * 1000, sameSite: 'none', secure: true });
        res.status(201).json({ user });
    } catch (error) {
        res.status(400).json({ error });
    }
};
module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            const auth = await bcrypt.compare(password, user.password)
            if (!auth) {
                res.status(412).json({ success: false, data: { 'password': ['Incorrect username or password.'] } });
            } else {
                const token = createToken(user._id);
                res.cookie('jwt', token, { httpOnly: false, maxAge: maxAge * 1000, sameSite: 'none', secure: true });
                res.status(200).json(user);
            }
        }
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