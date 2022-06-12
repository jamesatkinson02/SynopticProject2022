const db = require('./db');
const deviceInterval = 30000;

// Water dummy data
setInterval(() => {
  // db.query('INSERT INTO device_data', (err, res) => {
  //   if (err) {
  //       console.error(err);
  //       return;
  //   }

  //   console.log(res.rows[0]);
  // });
}, deviceInterval)

// Electricity dummy data
setInterval(() => {

}, deviceInterval)

// Crop quality dummy data
setInterval(() => {

}, deviceInterval)
