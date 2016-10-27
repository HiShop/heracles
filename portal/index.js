require('oneapm');
var path = require('path');
var express = require('express');

// 引用swig模板引擎
var swig = require('swig');

// 将POST请求中的数据转换成JSON对象（ExpressJs模块）
var bodyParser = require('body-parser');

// 自动压缩响应数据（ExpressJs模块）
var compress = require('compression');

// 会话管理器（ExpressJs模块）
var session = require('express-session');

console.log("加载网站设置...");
var config = require('./config');

console.log("加载HTTP路由...");
var router = require('./router');

var app = express();
app.engine('html', swig.renderFile);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.set('view cache', false);

swig.setDefaults({ cache: false });

app.use(bodyParser.urlencoded({
  type: function(req) {
    return /x-www-form-urlencoded/.test(req.headers['content-type']);
  },
  extended: false
}));
app.use(bodyParser.json());

console.log("加载Cookie处理及签名中间件...");
app.use(require('cookie-parser')(config.session_secret));
app.use(compress());

app.use(session({
  secret: config.session_secret,
//  cookie: { secure: true },
  resave: true,
  saveUninitialized: true
}));

// 保存设置信息到应用程序本地变量中
app.locals.config = config;

console.log("设置静态资源路径...");
var assets = path.join(__dirname, 'assets');
app.use('/assets', express.static(assets));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

var images = path.join(__dirname, 'images');
app.use('/images', express.static(images));


var files = path.join(__dirname, 'files');
app.use('/files', express.static(files));

app.use(function(req, res, next) {
   var err = {
    name: '收到HTTP请求',
    path: req.path,
    params: req.params,
    method: req.method,
    action: req.params[0],
    query: req.query,
    headers: req.headers,
    body: req.body
  };

  if (req.path.indexOf('favicon.ico') == -1) {
    console.log(JSON.stringify(err, null, 2));
  }
  next();
});

app.use('/', router);

var server = app.listen(11180, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('heracles 运行于 http://%s:%s', host, port);
});
