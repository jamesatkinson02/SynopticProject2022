const db = require('../../db');

const NUM_WEEKS = 6;
const NUM_MONTHS = 6;

const getDataWithFrequency = async (deviceId, field, frequency, aggregate) => {
  let startTime = new Date();
  let endTime = new Date();
  startTime.setHours(0, 0, 0, 0);
  endTime.setHours(0, 0, 0, 0);

  let freqSelect = 'day';

  switch (frequency) {
    case 'Weekly':
      endTime.setDate(endTime.getDate() + 1 - endTime.getDay());
      startTime.setDate(endTime.getDate() - (7 * NUM_WEEKS));
      freqSelect = 'week';
      break;
    case 'Monthly':
      startTime.setMonth(endTime.getMonth() - NUM_MONTHS);
      startTime.setDate(1);
      endTime.setDate(0);
      freqSelect = 'month';
      break;
    default:
      startTime.setDate(startTime.getDate() - 7);
      break;
  }

  console.log(startTime);
  console.log(endTime);
  
  const query = `SELECT date_trunc('${freqSelect}', entry_timestamp) AS timestamp, ${aggregate === 'SUM' ? 'SUM' : 'AVG'}(value) AS data
  FROM device_data
  WHERE device_id=$1 AND field_name=$2 AND entry_timestamp > $3 AND entry_timestamp < $4
  GROUP BY timestamp
  ORDER BY timestamp`;

  let data = [];
  let labels = [];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  return new Promise((resolve, reject) => {
    db.query(query, [deviceId, field, startTime, endTime], (err, dbRes) => {
      if (err) {
        reject(err);
        return;
      }

      dbRes.rows.map(entry => {
        data.push(entry.data.toFixed(2));
        
        let timestamp = new Date(entry.timestamp);
        let label = days[timestamp.getDay()];

        if (frequency === 'Weekly') {
          let date = timestamp.getDate().toString().padStart(2, 0);
          let month = timestamp.getMonth().toString().padStart(2, 0);
          label = `${date}/${month}`;
        } else if (frequency === 'Monthly') {
          label = months[timestamp.getMonth()]
        }

        labels.push(label);
      });

      resolve({ data, labels });
    });
  });
};

const getCurrentData = async (deviceId, field) => {
  const query = `SELECT value AS data
  FROM device_data
  WHERE device_id=$1 AND field_name=$2
  ORDER BY entry_timestamp DESC
  LIMIT 1`;

  return new Promise((resolve, reject) => {
    db.query(query, [deviceId, field], (err, dbRes) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(dbRes.rows[0]);
    });
  });
};

module.exports = { getDataWithFrequency, getCurrentData };
