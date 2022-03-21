const mysql = require('mysql2');
const {
  MYSQL_CONF
} = require('../conf/db');
const conn = mysql.createConnection(MYSQL_CONF);


console.log(MYSQL_CONF);

conn.connect(err => {
  if (err) {
    console.log(err);
  }
});

function exec(sql) {
  return new Promise((resolve, reject) => {
    conn.query(sql, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      resolve(result);
    });
  });
}

module.exports = {
  exec
}