var express = require('express');
var config = require('./config');
var P = require('./controllers/portal');

var r = express.Router();

// 页面呈现路由
r.get('/', P.index);

r.all('/*', function (req, res) {
  var err = {
    error: '未知的HTTP请求',
    method: req.method,
    action: req.params[0],
    query: req.query,
    headers: req.headers,
    body: req.body
  };

  //console.log(JSON.stringify(err, null, 2));
  res.status(400).send(JSON.stringify(err, null, 2));
})

var errorHandler = function (err, req, res, next) {
  res.status(err.code).json({
    message: err.toString(),
    inner: err
  });
};
r.use(errorHandler);

module.exports = r;
