const router = require('express').Router();
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();

router.route('/login').post(async (req, res) => {
  //generate new session token
  jwt.sign({name: req.body.username}, process.env.TOKEN_SECRET, {expiresIn: '1h'}, function(err, tok)
  {
    res.send({token:tok});
  });

  //...
});

router.route('/verify-token').post(async (req, res) => {
  jwt.verify(req.body.token, process.env.TOKEN_SECRET, function(err, decoded)
  {
    if(err)
      res.status(401).send(err);
    else
      res.send(decoded);
  })
});

module.exports = router;
