const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const jwtMiddleware = (req, res, next) => {
  let token = req.headers.authtoken;
  console.log(token)

  if (token != 'null' && token != '') {
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
      console.log(err)
      
      req.body.tokenPayload = decoded;
      console.log(decoded)
      req.body.tokenValid = decoded != null && decoded.id != null;
    });
  } else {
    req.body.tokenPayload = {};
    req.body.tokenValid = false;
  }

  next();
};

module.exports = jwtMiddleware;