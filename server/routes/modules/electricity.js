const router = require('express').Router();
const dotenv = require('dotenv');

dotenv.config();

router.route('/content-data').get(async (req, res) => {
  res.send("hi")
});

module.exports = router;
