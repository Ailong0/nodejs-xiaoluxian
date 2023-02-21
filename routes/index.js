var express = require('express');
var router = express.Router();
var db = require('../sql.js');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.post('/main',function (req, res, next){
  var val=req.body;
  var userName = val.userName;
  var userPwd = val.userPwd;

  db.query('select * from user where userName = ? and userPwd = ?',[userName,userPwd],function (err,data){
    if (err){
      throw err;
    }else if(data.length>0){
      res.render('main');
    }else{
      res.write('<head><meta charset="utf-8"/></head>');
      res.end('密码错误');
    }
  })
});
module.exports = router;
