const jwt = require('jsonwebtoken');
const User = require('../models/User');

//check user is authorized 
const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    //check json web token exists and is verified
    if (token) {
        jwt.verify(token, 'lucy secret', (err, decodedToken) => {
            if (err) {
                res.redirect('/login');
            } else {
                next();
            }
        })
    } else {
        res.redirect('/login');
    }
};

// check current user
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt; //grabbing the token
    if (token) {
        jwt.verify(token, 'lucy secret', async (err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                next();
            } else {
                let user = await User.findById(decodedToken.id);
                res.locals.user = user; //locals property allows something to be available in the views
                next();
            }
        })
    } else {
        res.locals.user = null;
        next();
    }
}

module.exports = { requireAuth, checkUser };