const router = require('express').Router();
const dotenv = require('dotenv');
const { getDataWithFrequency, getCurrentData } = require('./shared')

dotenv.config();

// getDataWithFrequency('f021d188ae2ba5ad', 'content', 'Daily').then(rRes => {
//   rRes.dbPromise.then(dbRes => {
//     console.log(dbRes.rows);
//   });
// });
// getDataWithFrequency('f021d188ae2ba5ad', 'ph', 'Daily').then(rRes => {
//   rRes.dbPromise.then(dbRes => {
//     console.log(dbRes.rows);
//   });
// });
// getDataWithFrequency('f021d188ae2ba5ad', 'clarity', 'Daily').then(rRes => {
//   rRes.dbPromise.then(dbRes => {
//     console.log(dbRes.rows);
//   });
// });

// getDataWithFrequency('ea30d16ee48ffda8', 'usage', 'Daily').then(rRes => {
//   rRes.dbPromise.then(dbRes => {
//     console.log(dbRes.rows);
//   });
// });
// getDataWithFrequency('ea30d16ee48ffda8', 'generation', 'Daily').then(rRes => {
//   rRes.dbPromise.then(dbRes => {
//     console.log(dbRes.rows);
//   });
// });

router.route('/chart-data').post(async (req, res) => {
  let deviceId = req.body.deviceId;
  let frequency = req.body.frequency;

  let moistureData = await getDataWithFrequency(deviceId, 'moisture', frequency);

  res.send({ moisture: moistureData });
});

router.route('/current-data').post(async (req, res) => {
  let deviceId = req.body.deviceId;

  let moistureData = await getCurrentData(deviceId, 'moisture');
  let phData = await getCurrentData(deviceId, 'ph');
  
  res.send({ moisture: moistureData, ph: phData });
});

module.exports = router;
