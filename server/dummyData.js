const db = require('./db');
const deviceInterval = 30000;

const insertDeviceData = (deviceId, field, value) => {
  db.query('INSERT INTO device_data(device_id, field_name, value) VALUES($1, $2, $3)',
  [deviceId, field, value],
  (err, res) => {});
};

let waterDeviceId = '';
let electricityDeviceId = '';
let cqDeviceId = '';

setInterval(() => {
  // Water
  let waterPH = 3 + Math.round(Math.random() * 8);
  insertDeviceData(waterDeviceId, "ph", waterPH)

  // Electricity
  let usage = Math.round(Math.random() * 1000);
  let generation = 500 + Math.round(Math.random() * 1500);
  insertDeviceData(electricityDeviceId, "usage", usage)
  insertDeviceData(electricityDeviceId, "generation", generation)

  // Crop quality
  let cqPH = 3 + Math.round(Math.random() * 8);
  let moisture = 0 + Math.round(Math.random() * 100);
  insertDeviceData(cqDeviceId, "ph", cqPH)
  insertDeviceData(cqDeviceId, "moisture", moisture)
}, deviceInterval)
