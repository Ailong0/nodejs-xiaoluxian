var express = require('express');
var router = express.Router();
var db = require('../sql.js');
router.get('/', function(req, res, next) {
    var id = req.query.id;
    console.log(id);
    db.query(`delete from banner where id=${id}`,function (err,data){
        db.query('select * from banner',function (err,data){
            var pager = {};
            pager.maxNum = data.length;
            pager.Current =  1;
            pager.pageSize = 5;
            pager.pageCount = parseInt(Math.ceil(pager.maxNum/pager.pageSize));
            var dataList = data.slice( (pager.Current-1)*pager.pageSize,(pager.Current-1) * pager.pageSize + pager.pageSize);
            if(err){
                throw err;
            }else{
                res.render('bannerList',{
                    bannerList:dataList,
                    pager:pager
                });
            }
        })
    })
});
module.exports = router;