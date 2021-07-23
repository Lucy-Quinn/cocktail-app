const User = require('../models/User');
const jwt = require('jsonwebtoken');

//handle errors function
const handleErrors = (err) => {
    const { message } = err;
    const errors = { email: '', password: '' }

    //incorrect email
    if (message === 'Incorrect email') {
        errors.email = 'Invalid email';
    };

    //incorrect password
    if (message === 'Incorrect password') {
        errors.password = 'Invalid password';
    };

    //duplicate error = 11000
    if (err.code === 11000) {
        errors.email = 'That email is already registered';
        return errors;
    }

    //validation errors
    if (message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        })
    };
    return errors;
}

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
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
};

module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: false, maxAge: maxAge * 1000, sameSite: 'none', secure: true });
        res.status(200).json(user);
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
};

module.exports.me_get = async (req, res) => {
    const token = req.cookies.jwt;
    if (token) {
        const currentUserId = await jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => { return decodedToken.id });
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