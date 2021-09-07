const Validator = require('validatorjs');
const User = require('../models/User');
const _ = require('lodash');

Validator.registerAsync('exist', function (value, attribute, req, passes) {
  if (value === null) {
    passes(false, 'Email required');
  }

  if (!attribute) throw new Error('Specify Requirements');

  let msg = `This ${req} address has already been taken`;

  User.find({ email: value }).then((founduser) => {
    if (founduser.length) {
      passes(false, msg);
      return;
    }
    passes();
  });
});

Validator.registerAsync(
  'incorrectEmail',
  function async(value, attribute, req, passes) {
    if (value === null) {
      passes(false, 'Email required');
    }

    if (!attribute) throw new Error('Specify Requirements');

    let msg = `Incorrect email or password`;

    User.find({ email: value })
      .then((foundUser) => {
        if (_.isEmpty(foundUser)) {
          passes(false, msg);
          return;
        }
        passes();
      })
      .catch((error) => {
        console.log('error', errr);
      });
  },
);

const validator = (body, rules, customMessages, callback, passes, fails) => {
  const validation = new Validator(body, rules, customMessages);
  validation.passes(() => callback(null, true));
  validation.fails(() => callback(validation.errors.errors, false));
  function passes() {
    console.log('Validation passed!');
  }
  function fails() {
    console.log('Validation failed!');
  }
  validation.checkAsync(passes, fails);
};

module.exports = validator;
