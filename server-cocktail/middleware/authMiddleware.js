const jwt = require('jsonwebtoken');
require('dotenv').config();

//check user is authorized
const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  //check json web token exists and is verified
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, (error, decodedToken) => {
      if (error) {
        res.status(401).json({ errorMessage: 'Unauthorized' });
      } else {
        next();
      }
    });
  } else {
    res.status(401).json({ errorMessage: 'Unauthorized' });
  }
};

module.exports = { requireAuth };
