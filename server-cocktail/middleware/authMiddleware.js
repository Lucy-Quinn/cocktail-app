const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

//check user is authorized 
const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    //check json web token exists and is verified
    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
            if (err) {
                // res.redirect('/auth/login');
                console.log('not logged in')
            } else {
                console.log('logged in ')
                next();
            }
        })
    } else {
        // res.redirect('/auth/login');
        console.log('not logged in again')
    }
};


module.exports = { requireAuth };