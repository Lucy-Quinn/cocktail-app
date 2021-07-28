const Validator = require('validatorjs');
const User = require('../models/User');

Validator.registerAsync('exist', function (value, attribute, req, passes) {

    if (!attribute) throw new Error('Specify Requirements');

    let msg = `${req} has already been taken `

    User.find({ email: value })
        .then(founduser => {
            if (founduser.length) {
                passes(false, msg);
                return;
            }
            passes();
        });
});

Validator.registerAsync('incorrect', function async(value, attribute, req, passes) {

    console.log(value, attribute, req, passes)
    if (!attribute) throw new Error('Specify Requirements');

    let msg = (req == "email") ? `${req} does not exist` : `${req} is incorrect`

    User.find({ [req]: value })
        .then(founduser => {
            console.log(founduser)
            if (!founduser) {
                passes(false, msg);
                return;
            }
            passes();
        });
});

const validator = (body, rules, customMessages, callback, passes, fails) => {

    const validation = new Validator(body, rules, customMessages);
    validation.passes(() => callback(null, true));
    validation.fails(() => callback(validation.errors, false));
    function passes() {
        console.log('Validation passed!');
    }
    function fails() {
        console.log('Validation failed!');
    }
    validation.checkAsync(passes, fails);
};

module.exports = validator;