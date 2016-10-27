var path = require('path');

var site = 'http://tinypay.xkd-test.kuaidiantong.cn';

var config = {
  debug: false,
  name: 'tinypay',
  session_secret: 'A45A511C-420C-484E-8384-276045191A89',
  auth_cookie_name: 'tinypay_ck',
  apiAccessTokenLifetime: 60 * 60,
  apiRefreshTokenLifetime: 1209600,
  alipay_api: {
    gateway: 'https://openapi.alipay.com/gateway.do',
    precreate: 'alipay.trade.precreate',
    pay: 'alipay.trade.pay',
    notify: site + '/api/v1/transaction/alipay/pre/notify'
  },
  weixin_api: {
    appid: 'wx6f38b684087b31c2',
    auth_redirect: site + '/oauth2/notify/weixin',
    order: 'https://api.mch.weixin.qq.com/pay/unifiedorder',
    query_order: 'https://api.mch.weixin.qq.com/pay/orderquery',
    micropay: 'https://api.mch.weixin.qq.com/pay/micropay',
    notify_url: site + '/api/v1/transaction/weixin/notify'
  },
  skus: [
    {
      id: 860001,
      price: 0.01,
      name: '薛定谔猫',
      desc: "薛定谔猫（英语：Schrödinger's Cat）是奥地利物理学者埃尔温·薛定谔于1935年提出的一个思想实验。通过这思想实验，薛定谔指出了应用量子力学的哥本哈根诠释于宏观物体会产生的问题，以及这问题与物理常识之间的矛盾。在这思想实验里，由于先前发生事件的随机性质，猫会处于生存与死亡的叠加态。"
    },
    {
      id: 860002,
      price: 0.02,
      name: '黄油猫',
      desc: "如果我们确定两条定律“猫永远用脚着陆”；“黄油吐司永远在涂上黄油的一面落地”皆是真确和有证据证明的。那么，把黄油吐司没有涂上黄油的一面黏着猫的背部（下文简称黄油猫）之时，会发生什么反应呢？"
    }
  ]
};

module.exports = config;
