const router = require('express').Router();
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');

dotenv.config();

router.route('/sign-up').post(async (req, res) => {
  let username = req.body.username;
  let firstName = req.body.fname;
  let lastName = req.body.lname;
  let phoneNumber = req.body.phone;
  let password = req.body.password;

  if (username.length === 0) {
    res.send({ err: "Please enter a username" });
    return;
  }

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

  db.query('SELECT * FROM accounts WHERE username=$1', [username])
  .then(existingAccount => {
    if (existingAccount.rowCount > 0) {
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
  let username = req.body.username;
  let password = req.body.password;

  if (username.length === 0) {
    res.send({ err: "Please enter a username" });
    return;
  }

  if (password.length === 0) {
    res.send({ err: "Please enter a password" });
    return;
  }

  db.query('SELECT * FROM accounts WHERE username=$1', [username])
  .then(account => {
    if (account.rowCount == 0) {
      res.send({ err: "Couldn't find an account with that username and password combination" });
      return;
    }

    let accData = account.rows[0];

    bcrypt.compare(password, accData.password, (err, correct) => {
      if (err) {
        console.error(err);
        res.send({ err: "Something went wrong" });
        return;
      }

      if (correct) {
        const token = jwt.sign(
          { username: accData.username },
          process.env.TOKEN_SECRET,
          { expiresIn: "1h" }
        );

        db.query('SELECT * FROM devices WHERE owner=$1',
        [accData.username])
        .then(devices => {
          res.send({
            token: token,
            username: accData.username,
            devices: devices.rows
          });
        })
        .catch(err => {
          console.error(err);
          res.send({ err: "Database error" });
        });
      } else {
        res.send({ err: "Couldn't find an account with that username and password combination" });
      }
    });
  })
  .catch(err => {
    console.error(err);
    res.send({ err: "Database error" });
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
