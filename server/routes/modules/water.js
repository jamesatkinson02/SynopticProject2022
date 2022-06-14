const router = require('express').Router();
const dotenv = require('dotenv');
const { getDataWithFrequency } = require('./shared');

dotenv.config();

router.route('/content-data').get(async (req, res) => {
  res.send("hi")
});

module.exports = router;
