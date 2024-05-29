var express = require('express');
var router = express.Router();
var db = require('../sql.js');


/* GET home page. */
router.get('/', function(req, res, next) {
    var pageNum = req.query.page;
    db.query("select * from zhanjianhotellist union select * from leizhouhotellist union select * from lianjianhotellist union select * from suixihotellist union select * from wuchuanhotellist ",function (err,data) {

        var pager = {};
        //当前第几页，默认第一页
        pager.pageCurrent = pageNum || 1;
        //总的记录数
        pager.maxNum = data.length;
        //每页显示多少条记录
        pager.pageSize = 5;
        //一共有多少页
        pager.pageCount = parseInt(Math.ceil(pager.maxNum / pager.pageSize));
        //修改了传递的数据数量
        var dataList = data.slice( (pager.pageCurrent-1) * pager.pageSize , (pager.pageCurrent-1) * pager.pageSize + pager.pageSize );

        if( err ){
            throw err;
        }else{
            res.render('hoteldatalist',{
                hoteldataList:dataList,
                pager:pager
            })
        }

    })

});


module.exports = router;