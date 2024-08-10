const jwt = require('jsonwebtoken');
const CustomError = require('../utils/customError');

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if not token
  if (!token) {
    throw new CustomError(401, 'No token, authorization denied');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    throw new CustomError(401, 'Token is not valid');
  }
};
