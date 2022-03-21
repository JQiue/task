import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import http from './utils/http'

global.http = http('http://localhost:8001');

ReactDOM.render(
  <App></App>,
  document.getElementById('root')
);
