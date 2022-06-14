const router = require('express').Router();
const dotenv = require('dotenv');
const { getCurrentData } = require('./shared');

dotenv.config();

router.route('/current-data').post(async (req, res) => {
  let deviceId = req.body.deviceId;

  let usageData = await getCurrentData(deviceId, 'usage');
  let generationData = await getCurrentData(deviceId, 'generation');
  
  res.send({ usage: usageData, generation: generationData });
});

module.exports = router;
