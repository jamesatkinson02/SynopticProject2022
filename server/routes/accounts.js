const router = require('express').Router();
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

dotenv.config();

router.route('/sign-up').post(async (req, res) => {
  let username = sanitize(req.body.fname);
  let firstName = sanitize(req.body.fname);
  let lastName = sanitize(req.body.lname);
  let phoneNumber = sanitize(req.body.phone);
  let password = sanitize(req.body.pass);

  db.query('SELECT * FROM accounts WHERE username=$1', [username])
  .then(existingAccount => {
    if (firstName.length === 0) {
      res.send({ err: "Please enter a first name" });
      return;
    }
  
    if (lastName.length === 0) {
      res.send({ err: "Please enter a last name" });
      return;
    }
  
    if (phoneNumber.length === 0) {
      res.send({ err: "Please enter a phone number" });
      return;
    }
  
    if (password.length < 5 || password.length > 64) {
      res.send({ err: "Password must be between 5 and 64 characters" });
      return;
    }
  
    if (existingAccount.rows.length > 0) {
      res.send({ err: "Username already in use" });
      return;
    }
  
    bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS), (err, hashedPass) => {
      if (err) {
        res.send({ err: "Something went wrong" });
        return;
      }
  
      db.query('INSERT INTO accounts VALUES($1, $2, $3, $4, $5) RETURNING *',
      [ username, firstName, lastName, hashedPass, phoneNumber ])
      .then(newAccount => {
        let accData = newAccount.rows[0];
  
        const token = jwt.sign(
          { username: accData.username },
          process.env.TOKEN_SECRET,
          { expiresIn: "1h" }
        );
        
        res.send({ token: token, username: accData.username });
      })
      .catch(err => {
        console.error(err);
        res.send({ err: "Database error" });
      });
    });
  })
  .catch(err => {
    console.error(err);
    res.send({ err: "Database error" });
  });
});

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
