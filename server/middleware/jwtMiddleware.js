const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const jwtMiddleware = (req, res, next) => {
  let token = req.headers.authtoken;
  let refreshToken = req.headers.refreshToken;

  if (token != 'null') {
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
      req.body.tokenPayload = decoded;
      req.body.tokenValid = decoded != null && decoded.id != null;
    });
  } else {
    jwt.verify(refreshToken, process.env.JWT_KEY, (err, decoded) => {
      req.body.tokenPayload = decoded;
      req.body.tokenValid = decoded != null && decided.id != null;
    });
  }

  next();
};

module.exports = jwtMiddleware;