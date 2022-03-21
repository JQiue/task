const env = process.env.NODE_ENV;

console.log(process.env.NODE_DEMO_DATABASE);

let MYSQL_CONF;

// 获取生产环境的数据库配置
function getProductionDBConfig() {
  let config = {};
  process.env.NODE_DEMO_DATABASE.split(';').forEach(value => {
    const arr = value.split('=');
    config[arr[0]] = arr[1];
  })
  return config
}

if (env == 'dev') {
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: '123546',
    port: '3306',
    database: 'db_demo'
  }
}

if (env == 'production') {
  MYSQL_CONF = getProductionDBConfig();
}

module.exports = {
  MYSQL_CONF
}