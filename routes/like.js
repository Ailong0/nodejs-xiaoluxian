var express = require('express');
var router = express.Router();
var db = require('../sql.js');
router.get('/', function(req, res, next) {
    var like=req.query.like || req.query.selectVal;
    console.log(like);
    var pageNum = req.query.page;
    db.query(`select * from banner where name like '%${like}%'`,function (err,data){
        var pager = {};
        pager.maxNum = data.length;
        pager.Current = pageNum || 1;
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

});
module.exports = router;