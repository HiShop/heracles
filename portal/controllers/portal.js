//var Merchant = require('../modules/merchant')

var config = require('../config');

var navis = [
  {
    name: 'index',
    title: '首页',
    link: '/',
  },
  {
    name: 'transactions',
    title: '交易',
    link: '/tr',
  },
  {
    name: 'settings',
    title: '设置',
    link: '/st',
  }
];

exports.index = function (req, res, next) {
  res.render('dashboard', {
    navis: navis,
    current: 'index'
  });
};
