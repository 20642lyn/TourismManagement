var express = require("express");
var router = express.Router();
var db = require("../sql.js");
var multiparty = require("multiparty");
const async = require("async");
const crypto = require("crypto");
/* GET home page. */
//更新录播图数据
router.post("/updatebanner", function (req, res, next) {
  var form = new multiparty.Form();
  //上传的图片需要保存某一个目录,目录必须存在
  form.uploadDir = "./public/upload";
  form.parse(req, function (err, fields, files) {
    var upid = fields.upid[0];
    var imgName = fields.imgName[0];
    var imgUrl = fields.imgUrl[0];

    db.query(
      `update banner set id=?, bannername=?,bannerurl=? where id=${upid}`,
      [upid, imgName, imgUrl],
      function (err, data) {
        if (err) {
          throw err;
        } else {
          db.query("select * from banner", function (err, data) {
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
              res.render("bannerList", {
                bannerList: dataList,
                pager: pager,
              });
            }
          });
        }
      }
    );
  });
});
//定时重新获取最新热门推荐数据
router.get("/getnewhotlist", function (req, res, next) {
  db.query("select * from hotlist", function (err, data) {
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
      res.render("hotlist", {
        hotList: dataList,
        pager: pager,
      });
    }
  });
});
//点击刷新热门数据
router.get("/checkhotlist", function (req, res, next) {
  db.query(`select * from commentlist`, function (err, data) {
    if (err) {
      throw err;
    } else if (data.length > 0) {
      var datalist = [];
      var hotdata = [];
      datalist = data;
      if (datalist.length <= 3) {
        var length = datalist.length;
        for (var i = 0; i < length; i++) {
          var sum = 0;
          var arrindex = 0;
          datalist.map((item, index) => {
            var suml = item.upvotesum + item.browsesum;
            if (sum <= suml) {
              sum = suml;
              arrindex = index;
            }
          });
          hotdata[i] = datalist[arrindex];
          datalist.splice(arrindex, 1);
        }
      } else {
        for (var i = 0; i <= 3; i++) {
          var sum = 0;
          var arrindex = 0;
          datalist.map((item, index) => {
            var suml = item.upvotesum + item.browsesum;
            if (sum <= suml) {
              sum = suml;
              arrindex = index;
            }
          });
          hotdata[i] = datalist[arrindex];
          datalist.splice(arrindex, 1);
        }
      }
      db.query(`delete from hotlist`, function (err, data) {
        if (err) {
          throw err;
        } else {
          async.forEachOf(
            hotdata,
            function (item, i, callback) {
              db.query(
                "insert into hotlist value (?,?,?,?,?,?,?)",
                [
                  0,
                  item.name,
                  item.pictrueurl,
                  item.introduction,
                  0,
                  item.areaid,
                  item.listid,
                ],
                function (err, data) {
                  if (err) {
                    throw err;
                  }
                  callback();
                }
              );
            },
            function (err) {
              if (err) {
                throw err;
              } else {
                db.query("select * from hotlist", function (err, data) {
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
                    res.render("hotlist", {
                      hotList: dataList,
                      pager: pager,
                    });
                  }
                });
              }
            }
          );
        }
      });
    } else {
      res.end;
    }
  });
});
//定时刷新热门数据
router.get("/autohotlist", function (req, res, next) {
  db.query(`select * from commentlist`, function (err, data) {
    if (err) {
      throw err;
    } else if (data.length > 0) {
      var datalist = [];
      var hotdata = [];
      datalist = data;
      if (datalist.length <= 3) {
        var length = datalist.length;
        for (var i = 0; i < length; i++) {
          var sum = 0;
          var arrindex = 0;
          datalist.map((item, index) => {
            var suml = item.upvotesum + item.browsesum;
            if (sum <= suml) {
              sum = suml;
              arrindex = index;
            }
          });
          hotdata[i] = datalist[arrindex];
          datalist.splice(arrindex, 1);
        }
      } else {
        for (var i = 0; i <= 3; i++) {
          var sum = 0;
          var arrindex = 0;
          datalist.map((item, index) => {
            var suml = item.upvotesum + item.browsesum;
            if (sum <= suml) {
              sum = suml;
              arrindex = index;
            }
          });
          hotdata[i] = datalist[arrindex];
          datalist.splice(arrindex, 1);
        }
      }
      db.query(`delete from hotlist`, function (err, data) {
        if (err) {
          throw err;
        } else {
          async.forEachOf(
            hotdata,
            function (item, i, callback) {
              db.query(
                "insert into hotlist value (?,?,?,?,?,?,?)",
                [
                  0,
                  item.name,
                  item.pictrueurl,
                  item.introduction,
                  0,
                  item.areaid,
                  item.listid,
                ],
                function (err, data) {
                  if (err) {
                    throw err;
                  }
                  callback();
                }
              );
            },
            function (err) {
              if (err) {
                throw err;
              } else {
                db.query("select * from hotlist", function (err, data) {
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
                    res.render("hotlist", {
                      hotList: dataList,
                      pager: pager,
                    });
                  }
                });
              }
            }
          );
        }
      });
    } else {
      res.end;
    }
  });
});
//更新热门数据
router.post("/updatehotlist", function (req, res, next) {
  var form = new multiparty.Form();
  //上传的图片需要保存某一个目录,目录必须存在
  form.uploadDir = "./public/upload";
  form.parse(req, function (err, fields, files) {
    var upid = fields.upid[0];
    var Name = fields.Name[0];
    var imgUrl = fields.imgUrl[0];
    var introduction = fields.introduction[0];
    //上传图片的路径
    // var pic = files.pic[0].path;

    db.query(
      `update hotlist set id=?,name=?,imgurl=? ,introduction=? where id=${upid}`,
      [upid, Name, imgUrl, introduction],
      function (err, data) {
        if (err) {
          throw err;
        } else {
          db.query("select * from hotlist", function (err, data) {
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
              res.render("hotlist", {
                hotList: dataList,
                pager: pager,
              });
            }
          });
        }
      }
    );
  });
});
//更新普通用户数据
router.post("/commonuser", function (req, res, next) {
  var form = new multiparty.Form();
  //上传的图片需要保存某一个目录,目录必须存在
  form.uploadDir = "./public/upload";
  form.parse(req, function (err, fields, files) {
    var upid = fields.upid[0];
    var username = fields.username[0];
    var password = crypto
      .createHash("md5")
      .update(fields.password[0])
      .digest("hex");
    // var password = fields.password[0];
    var nickname = fields.nickname[0];
    var phone = fields.phone[0];
    var headerurl = fields.headerurl[0];
    //上传图片的路径
    // var pic = files.pic[0].path;

    db.query(
      `update webuserinfo set id=?,username=?,password=?,nickname=?,phone=?,headerurl=? where id=${upid}`,
      [upid, username, password, nickname, phone, headerurl],
      function (err, data) {
        if (err) {
          throw err;
        } else {
          db.query("select * from webuserinfo", function (err, data) {
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
              res.render("admincommonuser", {
                commonuserList: dataList,
                pager: pager,
              });
            }
          });
        }
      }
    );
  });
});

//更新后台用户数据
router.post("/backgrounuser", function (req, res, next) {
  var form = new multiparty.Form();
  //上传的图片需要保存某一个目录,目录必须存在
  form.uploadDir = "./public/upload";
  form.parse(req, function (err, fields, files) {
    var upid = fields.upid[0];
    var username = fields.username[0];
    var password = crypto
      .createHash("md5")
      .update(fields.password[0])
      .digest("hex");
    // var password = fields.password[0];
    //上传图片的路径
    // var pic = files.pic[0].path;

    db.query(
      `update adminuserinfo set id=?,username=?,password=? where id=${upid}`,
      [upid, username, password],
      function (err, data) {
        if (err) {
          throw err;
        } else {
          db.query("select * from adminuserinfo", function (err, data) {
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
              res.render("adminbackgrounduser", {
                backgrounduserList: dataList,
                pager: pager,
              });
            }
          });
        }
      }
    );
  });
});

//更新景点数据
router.post("/updateviewdatalist", function (req, res, next) {
  var form = new multiparty.Form();
  //上传的图片需要保存某一个目录,目录必须存在
  form.uploadDir = "./public/upload";
  form.parse(req, function (err, fields, files) {
    var upid = fields.upid[0];
    var name = fields.name[0];
    var picture = fields.picture[0];
    var desc = fields.desc[0];
    var ticketprice = fields.ticketprice[0];
    var address = fields.address[0];
    var areaid = fields.areaid[0];
    var arr = areaid.toString().split("");
    switch (arr[1]) {
      case "1":
        db.query(
          `update zhanjianviewlist set id=?,name=?,picture=?,ticketprice=?,address=? where id=?`,
          [upid, name, picture, ticketprice, address, upid],
          function (err, data) {
            if (err) {
              throw err;
            } else {
              db.query(
                "select * from zhanjianviewlist union select * from leizhouviewlist union select * from lianjianviewlist union select * from suixiviewlist union select * from wuchuanviewlist ",
                function (err, data) {
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
                }
              );
            }
          }
        );
        break;
      case "2":
        db.query(
          `update leizhouviewlist set id=?,name=?,picture=?,ticketprice=?,address=? where id=?`,
          [upid, name, picture, ticketprice, address, upid],
          function (err, data) {
            if (err) {
              throw err;
            } else {
              db.query(
                "select * from zhanjianviewlist union select * from leizhouviewlist union select * from lianjianviewlist union select * from suixiviewlist union select * from wuchuanviewlist ",
                function (err, data) {
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
                }
              );
            }
          }
        );
        break;
      case "3":
        db.query(
          `update lianjianviewlist set id=?,name=?,picture=?, ticketprice=?, address=?  where id=?`,
          [upid, name, picture, ticketprice, address, upid],
          function (err, data) {
            if (err) {
              throw err;
            } else {
              db.query(
                "select * from zhanjianviewlist union select * from leizhouviewlist union select * from lianjianviewlist union select * from suixiviewlist union select * from wuchuanviewlist ",
                function (err, data) {
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
                }
              );
            }
          }
        );
        break;
      case "4":
        db.query(
          `update suixiviewlist set id=?,name=?,picture=?, ticketprice=?, address=?  where id=?`,
          [upid, name, picture, ticketprice, address, upid],
          function (err, data) {
            if (err) {
              throw err;
            } else {
              db.query(
                "select * from zhanjianviewlist union select * from leizhouviewlist union select * from lianjianviewlist union select * from suixiviewlist union select * from wuchuanviewlist ",
                function (err, data) {
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
                }
              );
            }
          }
        );
        break;
      case "5":
        db.query(
          `update wuchuanviewlist set id=?,name=?,picture=?, desc=?, ticketprice=?, address=?  where id=?`,
          [upid, name, picture, ticketprice, address, upid],
          function (err, data) {
            if (err) {
              throw err;
            } else {
              db.query(
                "select * from zhanjianviewlist union select * from leizhouviewlist union select * from lianjianviewlist union select * from suixiviewlist union select * from wuchuanviewlist ",
                function (err, data) {
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
                }
              );
            }
          }
        );
        break;
    }
  });
});

//更新美食数据
router.post("/updatefooddatalist", function (req, res, next) {
  var form = new multiparty.Form();
  form.parse(req, function (err, fields, files) {
    var upid = fields.upid[0];
    var name = fields.name[0];
    var picture = fields.picture[0];
    var desc = fields.desc[0];
    var ticketprice = fields.ticketprice[0];
    var address = fields.address[0];
    var areaid = fields.areaid[0];
    var arr = areaid.toString().split("");
    switch (arr[1]) {
      case "1":
        db.query(
          `update zhanjianfoodlist set id=?,name=?,picture=?,ticketprice=?, address=?  where id=?`,
          [upid, name, picture, ticketprice, address, upid],
          function (err, data) {
            if (err) {
              throw err;
            } else {
              db.query(
                "select * from zhanjianfoodlist union select * from leizhoufoodlist union select * from lianjianfoodlist union select * from suixifoodlist union select * from wuchuanfoodlist ",
                function (err, data) {
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
                }
              );
            }
          }
        );
        break;
      case "2":
        db.query(
          `update leizhoufoodlist set id=?,name=?,picture=?,ticketprice=?, address=?  where id=?`,
          [upid, name, picture, ticketprice, address, upid],
          function (err, data) {
            if (err) {
              throw err;
            } else {
              db.query(
                "select * from zhanjianfoodlist union select * from leizhoufoodlist union select * from lianjianfoodlist union select * from suixifoodlist union select * from wuchuanfoodlist ",
                function (err, data) {
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
                }
              );
            }
          }
        );
        break;
      case "3":
        db.query(
          `update lianjianfoodlist set id=?,name=?,picture=?, ticketprice=?, address=?  where id=?`,
          [upid, name, picture, ticketprice, address, upid],
          function (err, data) {
            if (err) {
              throw err;
            } else {
              db.query(
                "select * from zhanjianfoodlist union select * from leizhoufoodlist union select * from lianjianfoodlist union select * from suixifoodlist union select * from wuchuanfoodlist ",
                function (err, data) {
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
                }
              );
            }
          }
        );
        break;
      case "4":
        db.query(
          `update suixifoodlist set id=?,name=?,picture=?,ticketprice=?, address=?  where id=?`,
          [upid, name, picture, ticketprice, address, upid],
          function (err, data) {
            if (err) {
              throw err;
            } else {
              db.query(
                "select * from zhanjianfoodlist union select * from leizhoufoodlist union select * from lianjianfoodlist union select * from suixifoodlist union select * from wuchuanfoodlist ",
                function (err, data) {
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
                }
              );
            }
          }
        );
        break;
      case "5":
        db.query(
          `update wuchuanfoodlist set id=?,name=?,picture=?, ticketprice=?, address=?  where id=?`,
          [upid, name, picture, ticketprice, address, upid],
          function (err, data) {
            if (err) {
              throw err;
            } else {
              db.query(
                "select * from zhanjianfoodlist union select * from leizhoufoodlist union select * from lianjianfoodlist union select * from suixifoodlist union select * from wuchuanfoodlist ",
                function (err, data) {
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
                }
              );
            }
          }
        );
        break;
    }
  });
});

//更新酒店数据
router.post("/updatehoteldatalist", function (req, res, next) {
  var form = new multiparty.Form();
  form.parse(req, function (err, fields, files) {
    var upid = fields.upid[0];
    var name = fields.name[0];
    var picture = fields.picture[0];
    var desc = fields.desc[0];
    var ticketprice = fields.ticketprice[0];
    var address = fields.address[0];
    var areaid = fields.areaid[0];
    var arr = areaid.toString().split("");
    switch (arr[1]) {
      case "1":
        db.query(
          `update zhanjianhotellist set id=?,name=?,picture=?, ticketprice=?, address=?  where id=?`,
          [upid, name, picture, ticketprice, address, upid],
          function (err, data) {
            if (err) {
              throw err;
            } else {
              db.query(
                "select * from zhanjianhotellist union select * from leizhouhotellist union select * from lianjianhotellist union select * from suixihotellist union select * from wuchuanhotellist ",
                function (err, data) {
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
                }
              );
            }
          }
        );
        break;
      case "2":
        db.query(
          `update leizhouhotellist set id=?,name=?,picture=?, ticketprice=?, address=?  where id=?`,
          [upid, name, picture, ticketprice, address, upid],
          function (err, data) {
            if (err) {
              throw err;
            } else {
              db.query(
                "select * from zhanjianhotellist union select * from leizhouhotellist union select * from lianjianhotellist union select * from suixihotellist union select * from wuchuanhotellist ",
                function (err, data) {
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
                }
              );
            }
          }
        );
        break;
      case "3":
        db.query(
          `update lianjianhotellist set id=?,name=?,picture=?, ticketprice=?, address=?  where id=?`,
          [upid, name, picture, ticketprice, address, upid],
          function (err, data) {
            if (err) {
              throw err;
            } else {
              db.query(
                "select * from zhanjianhotellist union select * from leizhouhotellist union select * from lianjianhotellist union select * from suixihotellist union select * from wuchuanhotellist ",
                function (err, data) {
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
                }
              );
            }
          }
        );
        break;
      case "4":
        db.query(
          `update suixihotellist set id=?,name=?,picture=?,ticketprice=?, address=?  where id=?`,
          [upid, name, picture, ticketprice, address, upid],
          function (err, data) {
            if (err) {
              throw err;
            } else {
              db.query(
                "select * from zhanjianhotellist union select * from leizhouhotellist union select * from lianjianhotellist union select * from suixihotellist union select * from wuchuanhotellist ",
                function (err, data) {
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
                }
              );
            }
          }
        );
        break;
      case "5":
        db.query(
          `update wuchuanhotellist set id=?,name=?,picture=?, ticketprice=?, address=?  where id=?`,
          [upid, name, picture, ticketprice, address, upid],
          function (err, data) {
            if (err) {
              throw err;
            } else {
              db.query(
                "select * from zhanjianhotellist union select * from leizhouhotellist union select * from lianjianhotellist union select * from suixihotellist union select * from wuchuanhotellist ",
                function (err, data) {
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
                }
              );
            }
          }
        );
        break;
    }
  });
});
module.exports = router;
