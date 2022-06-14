const router = require('express').Router();
const dotenv = require('dotenv');
const { getCurrentData } = require('./shared');

dotenv.config();

router.route('/current-data').post(async (req, res) => {
  let deviceId = req.body.deviceId;

  let contentData = await getCurrentData(deviceId, 'content');
  let phData = await getCurrentData(deviceId, 'ph');
  let clarityData = await getCurrentData(deviceId, 'clarity');
  
  res.send({ content: contentData, ph: phData, clarity: clarityData });
});

module.exports = router;
