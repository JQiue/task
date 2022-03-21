const { SuccessModel, ErrorModel } = require('../model/resModel');
const { getList, newTask, updateTask, deleteTask } = require('../controller/task');


module.exports = (req, res) => {
  if (req.pathname == '/api/task/list' && req.method == 'GET') {
    return getList().then(data => {
      return new SuccessModel(data);
    });
  }

  if (req.pathname == '/api/task/new' && req.method == 'POST') {
    return newTask(req.body.content, req.body.type).then(data => {
      return new SuccessModel(data);
    });
  }

  if (req.pathname == '/api/task/update' && req.method == 'POST') {
    return updateTask(req.body.id, req.body.type).then(data => {
      if(data) {
        return new SuccessModel('更新成功');
      } else {
        return new ErrorModel('更新失败');
      }
    })
  }

  if (req.pathname == '/api/task/delete' && req.method == 'POST') {
    return deleteTask(req.body.id).then(data => {
      if(data) {
        return new SuccessModel('删除成功');
      } else {
        return new ErrorModel('删除失败');
      }
    });
  }
}