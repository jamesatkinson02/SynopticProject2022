const db = require('../../db');

const NUM_WEEKS = 6;
const NUM_MONTHS = 6;

const getDataWithFrequency = async (deviceId, field, frequency) => {
  let startTime = new Date();
  let endTime = new Date();
  startTime.setHours(0, 0, 0, 0);
  endTime.setHours(0, 0, 0, 0);

  let freqSelect = `date_trunc('day', entry_timestamp) AS day`;
  let freqGroup = `day`;

  let freqLabels = [];

  switch (frequency) {
    case 'Weekly':
      endTime.setDate(endTime.getDate() + 1 - endTime.getDay());
      startTime.setDate(endTime.getDate() - (7 * NUM_WEEKS));
      freqSelect = `date_trunc('week', entry_timestamp) AS week`;
      freqGroup = `week`;
      break;
    case 'Monthly':
      startTime.setMonth(endTime.getMonth() - NUM_MONTHS);
      startTime.setDate(1);
      freqSelect = `date_trunc('month', entry_timestamp) AS month`;
      freqGroup = `month`;
      break;
    default:
      startTime.setDate(startTime.getDate() - 7);
      break;
  }

  console.log(startTime);
  console.log(endTime);
  
  const query = `SELECT ${freqSelect}, SUM(value)
  FROM device_data
  WHERE device_id=$1 AND field_name=$2 AND entry_timestamp > $3 AND entry_timestamp < $4
  GROUP BY ${freqGroup}`;

  return { dbPromise: db.query(query,
    [deviceId, field, startTime, endTime]), labels: freqLabels };
};

module.exports = { getDataWithFrequency };
