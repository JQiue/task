const { SuccessModel, ErrorModel } = require('../model/resModel');
const { getList } = require('../controller/weather');

module.exports = (req, res) => {
  if (req.pathname == '/api/weather/get' && req.method == 'GET') {
    return getList().then(data => {
      console.log(data);
      return new SuccessModel(data);
    });
  }
}