const router = require('express').Router();
const dotenv = require('dotenv');
const { getDataWithFrequency } = require('./shared');

dotenv.config();

getDataWithFrequency('f021d188ae2ba5ad', 'content', 'Monthly').then(res => {
  res.dbPromise.then(dbRes => {
    console.log(dbRes.rows)
  })
});

router.route('/content-data').get(async (req, res) => {
  
});

module.exports = router;
