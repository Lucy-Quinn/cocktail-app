const validator = require('../helpers/validate');

const validation = (req, res, next) => {

    const validationRule = {
        "email": "required|email",
        "name": "required|string",
        "password": "required|string|min:6",
    };

    validator(
        req.body,
        validationRule,
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

module.exports = { validation };