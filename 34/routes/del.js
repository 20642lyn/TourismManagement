var express = require('express');
var router = express.Router();
var db = require('../sql.js');
/* GET home page. */
router.get('/', function(req, res, next) {

   var id = req.query.id;
   db.query(`delete from banner where id=${id}`,function(err,data){

       db.query('select * from banner',function (err,data) {

           var pager = {};
           //当前第几页，默认第一页
           pager.pageCurrent = 1;
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

   })

});
//删除热门推荐数据
router.get('/deletehotlist', function(req, res, next) {

    var id = req.query.id;
    db.query(`delete from hotlist where id=${id}`,function(err,data){
 
        db.query('select * from hotlist',function (err,data) {
 
            var pager = {};
            //当前第几页，默认第一页
            pager.pageCurrent = 1;
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
 
    })
 
 });

//删除普通用户数据
router.get('/deletecommonuser', function(req, res, next) {

    var id = req.query.id;
    db.query(`delete from webuserinfo where id=${id}`,function(err,data){
 
        db.query('select * from webuserinfo',function (err,data) {
 
            var pager = {};
            //当前第几页，默认第一页
            pager.pageCurrent = 1;
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
 
    })
 
 });

 //删除后台用户数据
router.get('/deletebackgrounduser', function(req, res, next) {

    var id = req.query.id;
    db.query(`delete from adminuserinfo where id=${id}`,function(err,data){
 
        db.query('select * from adminuserinfo',function (err,data) {
 
            var pager = {};
            //当前第几页，默认第一页
            pager.pageCurrent = 1;
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
 
    })
 
 });

//删除景点数据
router.get('/deleteviewdatalist', function(req, res, next) {

    var upid = req.query.id;
    var areaid = req.query.areaid;
    var arr=areaid.toString().split('');
    switch(arr[1]){
        case '1': db.query(
            `delete from zhanjianviewlist where id=${upid}`,
          function (err, data) {
            if (err) {
              throw err;
            } else {
              db.query("select * from zhanjianviewlist union select * from leizhouviewlist union select * from lianjianviewlist union select * from suixiviewlist union select * from wuchuanviewlist ", function (err, data) {
                var pager = {};
                //当前第几页，默认第一页
                pager.pageCurrent = 1;
                //总的记录数
                pager.maxNum = data.length;
                //每页显示多少条记录
                pager.pageSize = 5;
                //一共有多少页
                pager.pageCount = parseInt(
                  Math.ceil(pager.maxNum / pager.pageSize)
                );
                //修改了传递的数据数量
                var dataList = data.slice(
                  (pager.pageCurrent - 1) * pager.pageSize,
                  (pager.pageCurrent - 1) * pager.pageSize + pager.pageSize
                );
    
                if (err) {
                  throw err;
                } else {
                  res.render("viewdatalist", {
                    viewdataList: dataList,
                    pager: pager,
                  });
                }
              });
            }
          }
        );break;
        case '2': db.query(
            `delete from leizhouviewlist where id=${upid}`,
          function (err, data) {
            if (err) {
              throw err;
            } else {
              db.query("select * from zhanjianviewlist union select * from leizhouviewlist union select * from lianjianviewlist union select * from suixiviewlist union select * from wuchuanviewlist ", function (err, data) {
                var pager = {};
                //当前第几页，默认第一页
                pager.pageCurrent = 1;
                //总的记录数
                pager.maxNum = data.length;
                //每页显示多少条记录
                pager.pageSize = 5;
                //一共有多少页
                pager.pageCount = parseInt(
                  Math.ceil(pager.maxNum / pager.pageSize)
                );
                //修改了传递的数据数量
                var dataList = data.slice(
                  (pager.pageCurrent - 1) * pager.pageSize,
                  (pager.pageCurrent - 1) * pager.pageSize + pager.pageSize
                );
    
                if (err) {
                  throw err;
                } else {
                  res.render("viewdatalist", {
                    viewdataList: dataList,
                    pager: pager,
                  });
                }
              });
            }
          }
        );break;
        case '3': db.query(
            `delete from lianjianviewlist where id=${upid}`,
          function (err, data) {
            if (err) {
              throw err;
            } else {
              db.query("select * from zhanjianviewlist union select * from leizhouviewlist union select * from lianjianviewlist union select * from suixiviewlist union select * from wuchuanviewlist ", function (err, data) {
                var pager = {};
                //当前第几页，默认第一页
                pager.pageCurrent = 1;
                //总的记录数
                pager.maxNum = data.length;
                //每页显示多少条记录
                pager.pageSize = 5;
                //一共有多少页
                pager.pageCount = parseInt(
                  Math.ceil(pager.maxNum / pager.pageSize)
                );
                //修改了传递的数据数量
                var dataList = data.slice(
                  (pager.pageCurrent - 1) * pager.pageSize,
                  (pager.pageCurrent - 1) * pager.pageSize + pager.pageSize
                );
    
                if (err) {
                  throw err;
                } else {
                  res.render("viewdatalist", {
                    viewdataList: dataList,
                    pager: pager,
                  });
                }
              });
            }
          }
        );break;
        case '4': db.query(
            `delete from suixiviewlist where id=${upid}`,
          function (err, data) {
            if (err) {
              throw err;
            } else {
              db.query("select * from zhanjianviewlist union select * from leizhouviewlist union select * from lianjianviewlist union select * from suixiviewlist union select * from wuchuanviewlist ", function (err, data) {
                var pager = {};
                //当前第几页，默认第一页
                pager.pageCurrent = 1;
                //总的记录数
                pager.maxNum = data.length;
                //每页显示多少条记录
                pager.pageSize = 5;
                //一共有多少页
                pager.pageCount = parseInt(
                  Math.ceil(pager.maxNum / pager.pageSize)
                );
                //修改了传递的数据数量
                var dataList = data.slice(
                  (pager.pageCurrent - 1) * pager.pageSize,
                  (pager.pageCurrent - 1) * pager.pageSize + pager.pageSize
                );
    
                if (err) {
                  throw err;
                } else {
                  res.render("viewdatalist", {
                    viewdataList: dataList,
                    pager: pager,
                  });
                }
              });
            }
          }
        );break;
        case '5': db.query(
          `delete from wuchuanviewlist where id=${upid}`,
          function (err, data) {
            if (err) {
              throw err;
            } else {
              db.query("select * from zhanjianviewlist union select * from leizhouviewlist union select * from lianjianviewlist union select * from suixiviewlist union select * from wuchuanviewlist ", function (err, data) {
                var pager = {};
                //当前第几页，默认第一页
                pager.pageCurrent = 1;
                //总的记录数
                pager.maxNum = data.length;
                //每页显示多少条记录
                pager.pageSize = 5;
                //一共有多少页
                pager.pageCount = parseInt(
                  Math.ceil(pager.maxNum / pager.pageSize)
                );
                //修改了传递的数据数量
                var dataList = data.slice(
                  (pager.pageCurrent - 1) * pager.pageSize,
                  (pager.pageCurrent - 1) * pager.pageSize + pager.pageSize
                );
    
                if (err) {
                  throw err;
                } else {
                  res.render("viewdatalist", {
                    viewdataList: dataList,
                    pager: pager,
                  });
                }
              });
            }
          }
        );break;
      }
 });

 //删除景点数据
 router.get('/deletefooddatalist', function(req, res, next) {

  var upid = req.query.id;
  var areaid = req.query.areaid;
  var arr=areaid.toString().split('');
  switch(arr[1]){
      case '1': db.query(
          `delete from zhanjianfoodlist where id=${upid}`,
        function (err, data) {
          if (err) {
            throw err;
          } else {
            db.query("select * from zhanjianfoodlist union select * from leizhoufoodlist union select * from lianjianfoodlist union select * from suixifoodlist union select * from wuchuanfoodlist ", function (err, data) {
              var pager = {};
              //当前第几页，默认第一页
              pager.pageCurrent = 1;
              //总的记录数
              pager.maxNum = data.length;
              //每页显示多少条记录
              pager.pageSize = 5;
              //一共有多少页
              pager.pageCount = parseInt(
                Math.ceil(pager.maxNum / pager.pageSize)
              );
              //修改了传递的数据数量
              var dataList = data.slice(
                (pager.pageCurrent - 1) * pager.pageSize,
                (pager.pageCurrent - 1) * pager.pageSize + pager.pageSize
              );
  
              if (err) {
                throw err;
              } else {
                res.render("fooddatalist", {
                  fooddataList: dataList,
                  pager: pager,
                });
              }
            });
          }
        }
      );break;
      case '2': db.query(
          `delete from leizhoufoodlist where id=${upid}`,
        function (err, data) {
          if (err) {
            throw err;
          } else {
            db.query("select * from zhanjianfoodlist union select * from leizhoufoodlist union select * from lianjianfoodlist union select * from suixifoodlist union select * from wuchuanfoodlist ", function (err, data) {
              var pager = {};
              //当前第几页，默认第一页
              pager.pageCurrent = 1;
              //总的记录数
              pager.maxNum = data.length;
              //每页显示多少条记录
              pager.pageSize = 5;
              //一共有多少页
              pager.pageCount = parseInt(
                Math.ceil(pager.maxNum / pager.pageSize)
              );
              //修改了传递的数据数量
              var dataList = data.slice(
                (pager.pageCurrent - 1) * pager.pageSize,
                (pager.pageCurrent - 1) * pager.pageSize + pager.pageSize
              );
  
              if (err) {
                throw err;
              } else {
                res.render("fooddatalist", {
                  fooddataList: dataList,
                  pager: pager,
                });
              }
            });
          }
        }
      );break;
      case '3': db.query(
          `delete from lianjianfoodlist where id=${upid}`,
        function (err, data) {
          if (err) {
            throw err;
          } else {
            db.query("select * from zhanjianfoodlist union select * from leizhoufoodlist union select * from lianjianfoodlist union select * from suixifoodlist union select * from wuchuanfoodlist ", function (err, data) {
              var pager = {};
              //当前第几页，默认第一页
              pager.pageCurrent = 1;
              //总的记录数
              pager.maxNum = data.length;
              //每页显示多少条记录
              pager.pageSize = 5;
              //一共有多少页
              pager.pageCount = parseInt(
                Math.ceil(pager.maxNum / pager.pageSize)
              );
              //修改了传递的数据数量
              var dataList = data.slice(
                (pager.pageCurrent - 1) * pager.pageSize,
                (pager.pageCurrent - 1) * pager.pageSize + pager.pageSize
              );
  
              if (err) {
                throw err;
              } else {
                res.render("fooddatalist", {
                  fooddataList: dataList,
                  pager: pager,
                });
              }
            });
          }
        }
      );break;
      case '4': db.query(
          `delete from suixifoodlist where id=${upid}`,
        function (err, data) {
          if (err) {
            throw err;
          } else {
            db.query("select * from zhanjianfoodlist union select * from leizhoufoodlist union select * from lianjianfoodlist union select * from suixifoodlist union select * from wuchuanfoodlist ", function (err, data) {
              var pager = {};
              //当前第几页，默认第一页
              pager.pageCurrent = 1;
              //总的记录数
              pager.maxNum = data.length;
              //每页显示多少条记录
              pager.pageSize = 5;
              //一共有多少页
              pager.pageCount = parseInt(
                Math.ceil(pager.maxNum / pager.pageSize)
              );
              //修改了传递的数据数量
              var dataList = data.slice(
                (pager.pageCurrent - 1) * pager.pageSize,
                (pager.pageCurrent - 1) * pager.pageSize + pager.pageSize
              );
  
              if (err) {
                throw err;
              } else {
                res.render("fooddatalist", {
                  fooddataList: dataList,
                  pager: pager,
                });
              }
            });
          }
        }
      );break;
      case '5': db.query(
        `delete from wuchuanfoodlist where id=${upid}`,
        function (err, data) {
          if (err) {
            throw err;
          } else {
            db.query("select * from zhanjianfoodlist union select * from leizhoufoodlist union select * from lianjianfoodlist union select * from suixifoodlist union select * from wuchuanfoodlist ", function (err, data) {
              var pager = {};
              //当前第几页，默认第一页
              pager.pageCurrent = 1;
              //总的记录数
              pager.maxNum = data.length;
              //每页显示多少条记录
              pager.pageSize = 5;
              //一共有多少页
              pager.pageCount = parseInt(
                Math.ceil(pager.maxNum / pager.pageSize)
              );
              //修改了传递的数据数量
              var dataList = data.slice(
                (pager.pageCurrent - 1) * pager.pageSize,
                (pager.pageCurrent - 1) * pager.pageSize + pager.pageSize
              );
  
              if (err) {
                throw err;
              } else {
                res.render("fooddatalist", {
                  fooddataList: dataList,
                  pager: pager,
                });
              }
            });
          }
        }
      );break;
    }
});

 //删除酒店数据
 router.get('/deletehoteldatalist', function(req, res, next) {

  var upid = req.query.id;
  var areaid = req.query.areaid;
  var arr=areaid.toString().split('');
  switch(arr[1]){
      case '1': db.query(
          `delete from zhanjianhotellist where id=${upid}`,
        function (err, data) {
          if (err) {
            throw err;
          } else {
            db.query("select * from zhanjianhotellist union select * from leizhouhotellist union select * from lianjianhotellist union select * from suixihotellist union select * from wuchuanhotellist ", function (err, data) {
              var pager = {};
              //当前第几页，默认第一页
              pager.pageCurrent = 1;
              //总的记录数
              pager.maxNum = data.length;
              //每页显示多少条记录
              pager.pageSize = 5;
              //一共有多少页
              pager.pageCount = parseInt(
                Math.ceil(pager.maxNum / pager.pageSize)
              );
              //修改了传递的数据数量
              var dataList = data.slice(
                (pager.pageCurrent - 1) * pager.pageSize,
                (pager.pageCurrent - 1) * pager.pageSize + pager.pageSize
              );
  
              if (err) {
                throw err;
              } else {
                res.render("hoteldatalist", {
                  hoteldataList: dataList,
                  pager: pager,
                });
              }
            });
          }
        }
      );break;
      case '2': db.query(
          `delete from leizhouhotellist where id=${upid}`,
        function (err, data) {
          if (err) {
            throw err;
          } else {
            db.query("select * from zhanjianhotellist union select * from leizhouhotellist union select * from lianjianhotellist union select * from suixihotellist union select * from wuchuanhotellist ", function (err, data) {
              var pager = {};
              //当前第几页，默认第一页
              pager.pageCurrent = 1;
              //总的记录数
              pager.maxNum = data.length;
              //每页显示多少条记录
              pager.pageSize = 5;
              //一共有多少页
              pager.pageCount = parseInt(
                Math.ceil(pager.maxNum / pager.pageSize)
              );
              //修改了传递的数据数量
              var dataList = data.slice(
                (pager.pageCurrent - 1) * pager.pageSize,
                (pager.pageCurrent - 1) * pager.pageSize + pager.pageSize
              );
  
              if (err) {
                throw err;
              } else {
                res.render("hoteldatalist", {
                  hoteldataList: dataList,
                  pager: pager,
                });
              }
            });
          }
        }
      );break;
      case '3': db.query(
          `delete from lianjianhotellist where id=${upid}`,
        function (err, data) {
          if (err) {
            throw err;
          } else {
            db.query("select * from zhanjianhotellist union select * from leizhouhotellist union select * from lianjianhotellist union select * from suixihotellist union select * from wuchuanhotellist ", function (err, data) {
              var pager = {};
              //当前第几页，默认第一页
              pager.pageCurrent = 1;
              //总的记录数
              pager.maxNum = data.length;
              //每页显示多少条记录
              pager.pageSize = 5;
              //一共有多少页
              pager.pageCount = parseInt(
                Math.ceil(pager.maxNum / pager.pageSize)
              );
              //修改了传递的数据数量
              var dataList = data.slice(
                (pager.pageCurrent - 1) * pager.pageSize,
                (pager.pageCurrent - 1) * pager.pageSize + pager.pageSize
              );
  
              if (err) {
                throw err;
              } else {
                res.render("hoteldatalist", {
                  hoteldataList: dataList,
                  pager: pager,
                });
              }
            });
          }
        }
      );break;
      case '4': db.query(
          `delete from suixihotellist where id=${upid}`,
        function (err, data) {
          if (err) {
            throw err;
          } else {
            db.query("select * from zhanjianhotellist union select * from leizhouhotellist union select * from lianjianhotellist union select * from suixihotellist union select * from wuchuanhotellist ", function (err, data) {
              var pager = {};
              //当前第几页，默认第一页
              pager.pageCurrent = 1;
              //总的记录数
              pager.maxNum = data.length;
              //每页显示多少条记录
              pager.pageSize = 5;
              //一共有多少页
              pager.pageCount = parseInt(
                Math.ceil(pager.maxNum / pager.pageSize)
              );
              //修改了传递的数据数量
              var dataList = data.slice(
                (pager.pageCurrent - 1) * pager.pageSize,
                (pager.pageCurrent - 1) * pager.pageSize + pager.pageSize
              );
  
              if (err) {
                throw err;
              } else {
                res.render("hoteldatalist", {
                  hoteldataList: dataList,
                  pager: pager,
                });
              }
            });
          }
        }
      );break;
      case '5': db.query(
        `delete from wuchuanhotellist where id=${upid}`,
        function (err, data) {
          if (err) {
            throw err;
          } else {
            db.query("select * from zhanjianhotellist union select * from leizhouhotellist union select * from lianjianhotellist union select * from suixihotellist union select * from wuchuanhotellist ", function (err, data) {
              var pager = {};
              //当前第几页，默认第一页
              pager.pageCurrent = 1;
              //总的记录数
              pager.maxNum = data.length;
              //每页显示多少条记录
              pager.pageSize = 5;
              //一共有多少页
              pager.pageCount = parseInt(
                Math.ceil(pager.maxNum / pager.pageSize)
              );
              //修改了传递的数据数量
              var dataList = data.slice(
                (pager.pageCurrent - 1) * pager.pageSize,
                (pager.pageCurrent - 1) * pager.pageSize + pager.pageSize
              );
  
              if (err) {
                throw err;
              } else {
                res.render("hoteldatalist", {
                  hoteldataList: dataList,
                  pager: pager,
                });
              }
            });
          }
        }
      );break;
    }
});
module.exports = router;