const router = require('express').Router();
const dotenv = require('dotenv');
const db = require('../db');

dotenv.config();

router.route('/content-data').get(async (req, res) => {
  let deviceId = req.body.deviceId;

  
});

module.exports = router;
