const fs = require('fs');
const url = require('url');
const path = require('path')

const taskRouter = require('./src/router/task');
const weatherRouter = require('./src/router/weather');

const getPostData = (req) => {
  return new Promise((resolve, reject) => {
    if (req.method != 'POST') {
      resolve({});
      return;
    }
    let data = '';
    req.on('data', chunk => {
      data += chunk.toString();
    });
    req.on('end', () => {
      if (!data) {
        resolve({});
        return;
      }
      resolve(JSON.parse(data));
    });
  });
};

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const { pathname } = url.parse(req.url);
  req.pathname = pathname;
  if (pathname == '/' || pathname == '/favicon.ico' || pathname == '/task' || pathname.includes('static') || pathname.includes('asserts')) {
    let filepath = path.resolve(__dirname, `../task-react/build/index.html`);
    if (pathname == '/favicon.ico') {
      filepath = path.resolve(__dirname, `../task-react/build${pathname}`);
    }
    if (pathname.includes('static')) {
      filepath = path.resolve(__dirname, `../task-react/build${pathname}`);
    }
    if (pathname.includes('asserts')) {
      filepath = path.resolve(__dirname, `../task-react/build${pathname}`);
    }
    fs.readFile(filepath, (err, data) => {
      res.end(data);
    });
    return;
  }
  getPostData(req).then(data => {
    res.setHeader('Content-Type', 'application/json');
    req.body = data;
    const taskResult = taskRouter(req, res);
    const weatherResult = weatherRouter(req, res);

    if (taskResult) {
      taskResult.then(data => {
        res.end(JSON.stringify(data));
      });
    } else if (weatherResult) {
      weatherResult.then(data => {
        res.end(JSON.stringify(data));
      });
    } else {
      res.end('404');
    }
  })
}