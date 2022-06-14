const router = require('express').Router();
const dotenv = require('dotenv');
const { getCurrentData } = require('./shared');

dotenv.config();

router.route('/current-data').post(async (req, res) => {
  let deviceId = req.body.deviceId;

  let moistureData = await getCurrentData(deviceId, 'moisture');
  let phData = await getCurrentData(deviceId, 'ph');
  
  res.send({ moisture: moistureData, ph: phData });
});

module.exports = router;
