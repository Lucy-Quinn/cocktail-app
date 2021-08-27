const validator = require('../helpers/validate');

const register = (req, res, next) => {

    const registerValidationRule = {
        "name": "required|string",
        "email": "required|email|exist:email",
        "password": "required|string|min:6|alpha_num",
    };

    const registerCustomErrorMessages = {
        "name": "Please enter your name",
        "email": "Please enter your email address",
        "password": "The minimum length is 6 characters",
    };

    validator(
        req.body,
        registerValidationRule,
        registerCustomErrorMessages,
        (error, status) => {
            if (!status) {
                res.status(412)
                    .send({
                        success: false,
                        message: 'Validation failed',
                        data: error
                    });
            } else {
                next();
            }
        }
    );

};

const checkEmail = (req, res, next) => {

    const loginValidationRule = {
        "email": "required|email|incorrectEmail:email",
    };

    const checkEmailCustomErrorMessages = {
        "email": "Incorrect email address",
    };

    validator(
        req.body,
        loginValidationRule,
        checkEmailCustomErrorMessages,
        (error, status) => {
            if (!status) {
                res.status(412)
                    .send({
                        success: false,
                        message: 'Validation failed',
                        data: error
                    });
            } else {
                next();
            }
        }
    )

};


const checkPassword = (req, res, next) => {
    // console.log('reqqqqq', req.body.email)
    const loginValidationRule = {
        "password": "required|string|min:6|alpha_num|incorrectPassword:password",
    };

    const checkPasswordCustomErrorMessages = {
        "password": "Incorrect password",
    };

    validator(
        req.body,
        loginValidationRule,
        checkPasswordCustomErrorMessages,
        (error, status) => {
            if (!status) {
                res.status(412)
                    .send({
                        success: false,
                        message: 'Validation failed',
                        data: error
                    });
            } else {
                next();
            }
        }
    )

};

module.exports = { register, checkEmail, checkPassword };