const {
  exec
} = require('../db/mysql');

const getList = () => {
  let sql = `select * from t_task`;
  return exec(sql).then(result => {
    return result
  });
}

const newTask = (content, type) => {
  let sql = `insert into t_task (content, type)
  values ('${content}', '${type}');`
  return exec(sql).then(result => {
    return result.insertId;
  });
}

const updateTask = (id, type) => {
  let sql = `update t_task set type='${type}' where id=${id}`;
  return exec(sql).then(result => {
    if (result.affectedRows > 0) {
      return true;
    }
    return false;
  });
};

const deleteTask = (id) => {
  let sql = `DELETE FROM t_task where id=${id};`;
  return exec(sql).then(result => {
    if (result.affectedRows > 0) {
      return true;
    }
    return false;
  })
};

module.exports = {
  getList,
  newTask,
  updateTask,
  deleteTask
}