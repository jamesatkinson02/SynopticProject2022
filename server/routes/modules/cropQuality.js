const router = require('express').Router();
const dotenv = require('dotenv');

dotenv.config();

router.route('/content-data').post(async (req, res) => {
  let frequency = req.body.frequency;

  
});

module.exports = router;
