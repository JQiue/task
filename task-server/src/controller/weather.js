const path = require('path');
const fs = require('fs');


const getList = () => {
  const data = fs.readFileSync(path.resolve(__dirname, '../mock/weather.json')).toString('utf-8');
  return Promise.resolve(JSON.parse(data));
}

module.exports = {
  getList,
}