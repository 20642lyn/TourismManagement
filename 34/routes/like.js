var express = require('express');
var router = express.Router();
var db = require('../sql.js');

//搜索轮播图数据
router.get('/bannerlike', function(req, res, next) {
    //这是拿到的搜索value数据
    var like = req.query.like || req.query.selectVal;
    var pageNum = req.query.page;
    db.query(`select * from banner where bannername like '%${like}%'`,function(err,data){
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
            res.render('bannerList',{
                bannerList:dataList,
                pager:pager
            })
        }

    })

});

//搜索热门数据
router.get('/hotlistlike', function(req, res, next) {
    //这是拿到的搜索value数据
    var like = req.query.like || req.query.selectVal;
    var pageNum = req.query.page;
    db.query(`select * from hotlist where name like '%${like}%'`,function(err,data){
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
            res.render('hotlist',{
                hotList:dataList,
                pager:pager
            })
        }

    })

});
//搜索普通用户数据
router.get('/commonuserlike', function(req, res, next) {
    //这是拿到的搜索value数据
    var like = req.query.like || req.query.selectVal;
    var pageNum = req.query.page;
    db.query(`select * from webuserinfo where username like '%${like}%'`,function(err,data){
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
            res.render('admincommonuser',{
                commonuserList:dataList,
                pager:pager
            })
        }

    })

});
//搜索后台用户数据
router.get('/backgrounduserlike', function(req, res, next) {
    //这是拿到的搜索value数据
    var like = req.query.like || req.query.selectVal;
    var pageNum = req.query.page;
    db.query(`select * from adminuserinfo where username like '%${like}%'`,function(err,data){
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
            res.render('adminbackgrounduser',{
                backgrounduserList:dataList,
                pager:pager
            })
        }

    })

});

//搜索景点数据
router.get('/viewdatalistlike', function(req, res, next) {
    //这是拿到的搜索value数据
    var like = req.query.like || req.query.selectVal;
    var pageNum = req.query.page;
    db.query(`select * from zhanjianviewlist where name like '%${like}%' union select * from leizhouviewlist where name like '%${like}%' union select * from lianjianviewlist where name like '%${like}%'  union select * from suixiviewlist where name like '%${like}%' union select * from wuchuanviewlist where name like '%${like}%'`,function(err,data){
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
            res.render('viewdatalist',{
                viewdataList:dataList,
                pager:pager
            })
        }

    })

});
//搜索美食数据
router.get('/fooddatalistlike', function(req, res, next) {
    //这是拿到的搜索value数据
    var like = req.query.like || req.query.selectVal;
    var pageNum = req.query.page;
    db.query(`select * from zhanjianfoodlist where name like '%${like}%' union select * from leizhoufoodlist where name like '%${like}%' union select * from lianjianfoodlist where name like '%${like}%' union select * from suixifoodlist where name like '%${like}%' union select * from wuchuanfoodlist where name like '%${like}%'`,function(err,data){
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
            res.render('fooddatalist',{
                fooddataList:dataList,
                pager:pager
            })
        }

    })

});
//搜索酒店数据
router.get('/hoteldatalistlike', function(req, res, next) {
    //这是拿到的搜索value数据
    var like = req.query.like || req.query.selectVal;
    var pageNum = req.query.page;
    db.query(`select * from zhanjianhotellist where name like '%${like}%' union select * from leizhouhotellist where name like '%${like}%' union select * from lianjianhotellist where name like '%${like}%' union select * from suixihotellist where name like '%${like}%' union select * from wuchuanhotellist where name like '%${like}%'`,function(err,data){
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