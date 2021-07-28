const validator = require('../helpers/validate');

const register = (req, res, next) => {

    const registerValidationRule = {
        "name": "required|string",
        "email": "required|email|exist:User,email",
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


const login = (req, res, next) => {

    const loginValidationRule = {
        "email": "required|email|incorrect:User,email",
        "password": "required|string|min:6|alpha_num|incorrect:User,email",
    };

    validator(
        req.body,
        loginValidationRule,
        {},
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

module.exports = { register, login };