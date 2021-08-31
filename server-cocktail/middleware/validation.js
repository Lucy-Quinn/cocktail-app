const validator = require("../helpers/validate");

const register = (req, res, next) => {
  const registerValidationRule = {
    name: "required|string",
    email: "required|email|exist:email",
    password: "required|string|min:6|alpha_num",
  };

  validator(req.body, registerValidationRule, {}, (error, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: error,
      });
    } else {
      next();
    }
  });
};

const checkEmail = (req, res, next) => {
  const loginValidationRule = {
    email: "required|email|incorrectEmail:email",
  };

  validator(req.body, loginValidationRule, {}, (error, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: error,
      });
    } else {
      next();
    }
  });
};

module.exports = { register, checkEmail };
