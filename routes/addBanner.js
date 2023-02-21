var express = require('express');
var router = express.Router();
var db = require('../sql.js');
var multiparty = require('multiparty');
router.post('/', function(req, res, next) {
    var form = new multiparty.Form();
    form.uploadDir='./public/upload';
    form.parse(req,function (err,fields,files){
        var imgName = fields.imgName[0];
        var pic = files.pic[0].path;
        console.log(imgName);
        db.query('insert into banner value (?,?,?)' ,[0,imgName,pic],function (err,data){
            if (err){
                throw err;
            }else{
                db.query('select * from banner',function (err,data){
                    if(err){
                        throw err;
                    }else{
                        res.render('bannerList',{bannerList:data});
                    }
                })
            }
        })
    })
});
module.exports = router;