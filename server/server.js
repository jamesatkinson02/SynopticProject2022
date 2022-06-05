const express = require("express");
const jwt = require('jsonwebtoken');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();

app.post('/login', (req, res) => {
    //generate new session token
    jwt.sign({name: req.body.username}, process.env.TOKEN_SECRET, {expiresIn: '1h'}, function(err, tok)
    {
      res.send({token:tok});
    });

    //...
})

app.post('/verify-token', (req,res) => {
    jwt.verify(req.body.token, process.env.TOKEN_SECRET, function(err, decoded)
    {
        if(err)
            res.status(401).send(err);
        else
            res.send(decoded);
    })
})

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
})
