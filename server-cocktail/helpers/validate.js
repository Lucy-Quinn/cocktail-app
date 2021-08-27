const Validator = require('validatorjs');
const User = require('../models/User');
const bcrypt = require('bcrypt');

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

Validator.registerAsync('incorrectEmail', function async(value, attribute, req, passes) {
    if (value === null) {
        passes(false, 'Email required');
    };

    if (!attribute) throw new Error('Specify Requirements');

    let msg = `${req} does not exist`;
    // validation.fails();

    User.find({ email: value })
        .then(foundUser => {
            if (!foundUser) {
                passes(false, msg);
                return;
            }
            passes();
        })
        .catch(err => {
            console.log('ERR', err);
        })
});


Validator.registerAsync('incorrectPassword', function async(value, attribute, req, passes) {
    console.log('value, attribute, req', value, attribute, req)
    if (value === null){
        passes(false, 'Password required');
    };

    if (!attribute) throw new Error('Specify Requirements');

    let msg = `${req} is incorrect`;
    // // validation.fails();

    User.find({ email: value })
        .then(foundUser => {
            // console.log(foundUser)
            // const auth = bcrypt.compare(value, foundUser.password)
            // return auth
            //     .then(isUser => {
            //         console.log('isUser', isUser)
            //         if (isUser) {
            //             passes(false, msg);
            //             return;
            //         }
            //         passes();
            //     })
        })
        .catch(err => {
            console.log('ERR', err);
        })
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