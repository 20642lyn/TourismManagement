var express = require("express");
var router = express.Router();
var db = require("../sql.js");
var multiparty = require("multiparty");
const crypto = require("crypto");
/* GET home page. */
router.post("/addbanner", function (req, res, next) {
  var form = new multiparty.Form();
  //上传的图片需要保存某一个目录,目录必须存在
  form.uploadDir = "./public/upload";
  form.parse(req, function (err, fields, files) {
    var imgName = fields.imgName[0];
    var categoryName = fields.categoryName[0];
    var categoryId = 0;
    var imgUrl = fields.imgUrl[0];
    if (categoryName == "firstpage") {
      categoryId = 0;
    } else if (categoryName == "viewpage") {
      categoryId = 1;
    } else if (categoryName == "foodpage") {
      categoryId = 2;
    } else if (categoryName == "hotelpage") {
      categoryId = 3;
    }
    db.query(
      "insert into banner value (?,?,?,?,?)",
      [0, imgName, imgUrl, categoryName, categoryId],
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
//添加热门推荐数据
router.post("/addhotlist", function (req, res, next) {
  var form = new multiparty.Form();
  //上传的图片需要保存某一个目录,目录必须存在
  form.uploadDir = "./public/upload";
  form.parse(req, function (err, fields, files) {
    var imgName = fields.imgName[0];
    var categoryName = fields.categoryName[0];
    var categoryId = 0;
    var imgUrl = fields.imgUrl[0];
    if (categoryName == "firstpage") {
      categoryId = 0;
    } else if (categoryName == "viewpage") {
      categoryId = 1;
    } else if (categoryName == "foodpage") {
      categoryId = 2;
    } else if (categoryName == "hotelpage") {
      categoryId = 3;
    }
    db.query(
      "insert into banner value (?,?,?,?,?)",
      [0, imgName, imgUrl, categoryName, categoryId],
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

//添加普通用户数据
router.post("/addcommonuser", function (req, res, next) {
  var form = new multiparty.Form();
  //上传的图片需要保存某一个目录,目录必须存在
  form.uploadDir = "./public/upload";
  form.parse(req, function (err, fields, files) {
    var username = fields.username[0];
    var password = crypto
      .createHash("md5")
      .update(fields.password[0])
      .digest("hex");
    // var password = fields.password[0];
    var nickname = fields.nickname[0];
    var phone = fields.phone[0];
    var headerurl = fields.headerurl[0];
    db.query(
      "insert into webuserinfo value (?,?,?,?,?,?,?)",
      [0, username, password, nickname, null, phone, headerurl],
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

//添加后台用户数据
router.post("/addbackgrounduser", function (req, res, next) {
  var form = new multiparty.Form();
  //上传的图片需要保存某一个目录,目录必须存在
  form.uploadDir = "./public/upload";
  form.parse(req, function (err, fields, files) {
    var username = fields.username[0];
    var password = crypto
      .createHash("md5")
      .update(fields.password[0])
      .digest("hex");
    // var password = fields.password[0];
    db.query(
      "insert into adminuserinfo value (?,?,?)",
      [0, username, password],
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
//添加景点数据
router.post("/addviewdatalist", function (req, res, next) {
  var form = new multiparty.Form();
  form.parse(req, function (err, fields, files) {
    var name = fields.name[0];
    var picture = fields.picture[0];
    var desc = fields.desc[0];
    var areaname = fields.areaname[0];
    var speciesname = fields.speciesname[0];
    var ticketprice = fields.ticketprice[0];
    var address = fields.address[0];
    var areaid = 0;
    var speciesid = 0;
    switch (speciesname) {
      case "自然旅游类":
        speciesid = 11;
        break;
      case "人文旅游类":
        speciesid = 12;
        break;
      case "主题公园类":
        speciesid = 13;
        break;
    }
    switch (areaname) {
      case "湛江":
        areaid = 11;
        break;
      case "雷州":
        areaid = 12;
        break;
      case "廉江":
        areaid = 13;
        break;
      case "遂溪":
        areaid = 14;
        break;
      case "吴川":
        areaid = 15;
        break;
    }
    switch (areaid) {
      case 11:
        db.query(
          `insert into zhanjianviewlist value (?,?,?,?,?,?,?,?,?)`,
          [0, name, picture, desc, areaid, 3, speciesid, ticketprice, address],
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
      case 12:
        db.query(
          "insert into leizhouviewlist value (?,?,?,?,?,?,?,?,?)",
          [0, name, picture, desc, areaid, 3, speciesid, ticketprice, address],
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
      case 13:
        db.query(
          "insert into lianjianviewlist value (?,?,?,?,?,?,?,?,?)",
          [0, name, picture, desc, areaid, 3, speciesid, ticketprice, address],
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
      case 14:
        db.query(
          "insert into suixiviewlist value (?,?,?,?,?,?,?,?,?)",
          [0, name, picture, desc, areaid, 3, speciesid, ticketprice, address],
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
      case 15:
        db.query(
          "insert into suixiviewlist value (?,?,?,?,?,?,?,?,?)",
          [0, name, picture, desc, areaid, 3, speciesid, ticketprice, address],
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
//添加美食数据
router.post("/addfooddatalist", function (req, res, next) {
  var form = new multiparty.Form();
  form.parse(req, function (err, fields, files) {
    var name = fields.name[0];
    var picture = fields.picture[0];
    var desc = fields.desc[0];
    var areaname = fields.areaname[0];
    var speciesname = fields.speciesname[0];
    var ticketprice = fields.ticketprice[0];
    var address = fields.address[0];
    var areaid = 0;
    var speciesid = 0;
    switch (speciesname) {
      case "糕点小吃类":
        speciesid = 21;
        break;
      case "火锅类":
        speciesid = 22;
        break;
      case "粉面汤类":
        speciesid = 23;
        break;
      case "鸡鸭鹅类":
        speciesid = 24;
        break;
    }
    switch (areaname) {
      case "湛江":
        areaid = 21;
        break;
      case "雷州":
        areaid = 22;
        break;
      case "廉江":
        areaid = 23;
        break;
      case "遂溪":
        areaid = 24;
        break;
      case "吴川":
        areaid = 25;
        break;
    }
    switch (areaid) {
      case 21:
        db.query(
          "insert into zhanjianfoodlist value (?,?,?,?,?,?,?,?,?)",
          [0, name, picture, desc, areaid, 3, speciesid, address, ticketprice],
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
      case 22:
        db.query(
          "insert into leizhoufoodlist value (?,?,?,?,?,?,?,?,?)",
          [0, name, picture, desc, areaid, 3, speciesid, address, ticketprice],
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
      case 23:
        db.query(
          "insert into lianjianfoodlist value (?,?,?,?,?,?,?,?,?)",
          [0, name, picture, desc, areaid, 3, speciesid, address, ticketprice],
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
      case 24:
        db.query(
          "insert into suixifoodlist value (?,?,?,?,?,?,?,?,?)",
          [0, name, picture, desc, areaid, 3, speciesid,address, ticketprice],
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
      case 25:
        db.query(
          "insert into suixifoodlist value (?,?,?,?,?,?,?,?,?)",
          [0, name, picture, desc, areaid, 3, speciesid, address, ticketprice],
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
//添加酒店数据
router.post("/addhoteldatalist", function (req, res, next) {
  var form = new multiparty.Form();
  form.parse(req, function (err, fields, files) {
    var name = fields.name[0];
    var picture = fields.picture[0];
    var desc = fields.desc[0];
    var areaname = fields.areaname[0];
    var speciesname = fields.speciesname[0];
    var ticketprice = fields.ticketprice[0];
    var address = fields.address[0];
    var areaid = 0;
    var speciesid = 0;
    switch (speciesname) {
      case "商务酒店类":
        speciesid = 31;
        break;
      case "度假酒店类":
        speciesid = 32;
        break;
      case "公寓式酒店类":
        speciesid = 33;
        break;
    }
    switch (areaname) {
      case "湛江":
        areaid = 31;
        break;
      case "雷州":
        areaid = 32;
        break;
      case "廉江":
        areaid = 33;
        break;
      case "遂溪":
        areaid = 34;
        break;
      case "吴川":
        areaid = 35;
        break;
    }
    switch (areaid) {
      case 31:
        db.query(
          "insert into zhanjianhotellist value (?,?,?,?,?,?,?,?,?)",
          [0, name, picture, desc, areaid, 3, speciesid,address, ticketprice],
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
      case 32:
        db.query(
          "insert into leizhouhotellist value (?,?,?,?,?,?,?,?,?)",
          [0, name, picture, desc, areaid, 3, speciesid,address, ticketprice],
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
      case 33:
        db.query(
          "insert into lianjianhotellist value (?,?,?,?,?,?,?,?,?)",
          [0, name, picture, desc, areaid, 3, speciesid,address, ticketprice],
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
      case 34:
        db.query(
          "insert into suixihotellist value (?,?,?,?,?,?,?,?,?)",
          [0, name, picture, desc, areaid, 3, speciesid,address, ticketprice],
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
      case 35:
        db.query(
          "insert into suixihotellist value (?,?,?,?,?,?,?,?,?)",
          [0, name, picture, desc, areaid, 3, speciesid,address, ticketprice],
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
