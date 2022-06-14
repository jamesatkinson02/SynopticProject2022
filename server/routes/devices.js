const router = require('express').Router();
const dotenv = require('dotenv');
const db = require('../db');
const { getDataWithFrequency } = require('./modules/shared');

dotenv.config();

router.route('/chart-data').post(async (req, res) => {
  let deviceId = req.body.deviceId;
  let field = req.body.field;
  let frequency = req.body.frequency;

  let data = await getDataWithFrequency(deviceId, field, frequency);

  res.send(data);
});

router.route('/register-device').get(async (req, res) => {
  let deviceId = req.body.deviceId;
  let username = req.body.tokenPayload.username;

  console.log(username)
  console.log(deviceId)

  if (deviceId.length == 0) {
    res.send({ err: "Please enter a device ID" });
    return;
  }

  db.query('SELECT * FROM devices WHERE device_id=$1', [deviceId])
  .then(device => {
    if (device.rowCount == 0) {
      res.send({ err: "Device ID not found" });
      return;
    }

    let deviceData = device.rows[0];

    if (deviceData.owner != null) {
      res.send({ err: "Device already registered" });
      return;
    }

    db.query('UPDATE devices SET owner=$1 WHERE device_id=$2 RETURNING *', [username, deviceId])
    .then(updatedDevice => {
      res.send({ newDevice: updatedDevice.rows[0] });
    })
    .catch(err => {
      res.send({ err: "Database error" });
    });
  })
  .catch(err => {
    res.send({ err: "Database error" });
  });
  
});

module.exports = router;
