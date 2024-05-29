var express = require("express");
var router = express.Router();
var db = require("../../../sql");
/* GET home page. */
router.post("/", function (req, res, next) {
  //获取内容
  var val = req.body;
  var categoryid = val.categoryid;
  var areaid = val.areaid;
  var like = val.value;
  //   res.send({
  //     data:[],
  //     code: "200",
  //     message: "获取失败",
  //   });
  //查询数据
  if (categoryid != 0 && areaid != 0) {
    switch (categoryid) {
      case 1:
        switch (areaid) {
          case 1:
            db.query("select * from zhanjianviewlist ", function (err, data) {
              if (err) {
                throw err;
              } else if (data.length > 0) {
                res.send({
                  data,
                  code: "200",
                  message: "获取成功",
                });
              } else {
                res.send({
                  code: "401",
                  message: "湛江美景获取失败",
                });
              }
            });
            break;
          case 2:
            db.query("select * from leizhouviewlist ", function (err, data) {
              if (err) {
                throw err;
              } else if (data.length > 0) {
                res.send({
                  data,
                  code: "200",
                  message: "获取成功",
                });
              } else {
                res.send({
                  code: "401",
                  message: "湛江美景获取失败",
                });
              }
            });
            break;
          case 3:
            db.query("select * from lianjianviewlist ", function (err, data) {
              if (err) {
                throw err;
              } else if (data.length > 0) {
                res.send({
                  data,
                  code: "200",
                  message: "获取成功",
                });
              } else {
                res.send({
                  code: "401",
                  message: "湛江美景获取失败",
                });
              }
            });
            break;
          case 4:
            db.query("select * from suixiviewlist ", function (err, data) {
              if (err) {
                throw err;
              } else if (data.length > 0) {
                res.send({
                  data,
                  code: "200",
                  message: "获取成功",
                });
              } else {
                res.send({
                  code: "401",
                  message: "湛江美景获取失败",
                });
              }
            });
            break;
          case 5:
            db.query("select * from wuchuanviewlist ", function (err, data) {
              if (err) {
                throw err;
              } else if (data.length > 0) {
                res.send({
                  data,
                  code: "200",
                  message: "获取成功",
                });
              } else {
                res.send({
                  code: "401",
                  message: "湛江美景获取失败",
                });
              }
            });
            break;
        }
        break;
      case 2:
        switch (areaid) {
          case 1:
            db.query("select * from zhanjianfoodlist ", function (err, data) {
              if (err) {
                throw err;
              } else if (data.length > 0) {
                res.send({
                  data,
                  code: "200",
                  message: "获取成功",
                });
              } else {
                res.send({
                  code: "401",
                  message: "湛江美食获取失败",
                });
              }
            });
            break;
          case 2:
            db.query("select * from leizhoufoodlist ", function (err, data) {
              if (err) {
                throw err;
              } else if (data.length > 0) {
                res.send({
                  data,
                  code: "200",
                  message: "获取成功",
                });
              } else {
                res.send({
                  code: "401",
                  message: "湛江美食获取失败",
                });
              }
            });
            break;
          case 3:
            db.query("select * from lianjianfoodlist ", function (err, data) {
              if (err) {
                throw err;
              } else if (data.length > 0) {
                res.send({
                  data,
                  code: "200",
                  message: "获取成功",
                });
              } else {
                res.send({
                  code: "401",
                  message: "湛江美食获取失败",
                });
              }
            });
            break;
          case 4:
            db.query("select * from suixifoodlist ", function (err, data) {
              if (err) {
                throw err;
              } else if (data.length > 0) {
                res.send({
                  data,
                  code: "200",
                  message: "获取成功",
                });
              } else {
                res.send({
                  code: "401",
                  message: "湛江美食获取失败",
                });
              }
            });
            break;
          case 5:
            db.query("select * from wuchuanfoodlist ", function (err, data) {
              if (err) {
                throw err;
              } else if (data.length > 0) {
                res.send({
                  data,
                  code: "200",
                  message: "获取成功",
                });
              } else {
                res.send({
                  code: "401",
                  message: "湛江美食获取失败",
                });
              }
            });
            break;
        }
        break;
      case 3:
        switch (areaid) {
          case 1:
            db.query("select * from zhanjianhotellist ", function (err, data) {
              if (err) {
                throw err;
              } else if (data.length > 0) {
                res.send({
                  data,
                  code: "200",
                  message: "获取成功",
                });
              } else {
                res.send({
                  code: "401",
                  message: "获取失败",
                });
              }
            });
            break;
          case 2:
            db.query("select * from leizhouhotellist ", function (err, data) {
              if (err) {
                throw err;
              } else if (data.length > 0) {
                res.send({
                  data,
                  code: "200",
                  message: "获取成功",
                });
              } else {
                res.send({
                  code: "401",
                  message: "酒店获取失败",
                });
              }
            });
            break;
          case 3:
            db.query("select * from lianjianhotellist ", function (err, data) {
              if (err) {
                throw err;
              } else if (data.length > 0) {
                res.send({
                  data,
                  code: "200",
                  message: "获取成功",
                });
              } else {
                res.send({
                  code: "401",
                  message: "酒店获取失败",
                });
              }
            });
            break;
          case 4:
            db.query("select * from suixihotellist ", function (err, data) {
              if (err) {
                throw err;
              } else if (data.length > 0) {
                res.send({
                  data,
                  code: "200",
                  message: "获取成功",
                });
              } else {
                res.send({
                  code: "401",
                  message: "酒店获取失败",
                });
              }
            });
            break;
          case 5:
            db.query("select * from wuchuanhotellist ", function (err, data) {
              if (err) {
                throw err;
              } else if (data.length > 0) {
                res.send({
                  data,
                  code: "200",
                  message: "获取成功",
                });
              } else {
                res.send({
                  code: "401",
                  message: "湛江酒店获取失败",
                });
              }
            });
            break;
        }
        break;
    }
  } else if (categoryid != 0 && areaid == 0) {
    switch (categoryid) {
      case 1:
        db.query(
          "select * from zhanjianviewlist union select * from leizhouviewlist union select * from lianjianviewlist union select * from suixiviewlist union select * from wuchuanviewlist ",
          function (err, data) {
            if (err) {
              throw err;
            } else if (data.length > 0) {
              res.send({
                data,
                code: "200",
                message: "获取成功",
              });
            } else {
              res.send({
                code: "401",
                message: "获取失败",
              });
            }
          }
        );
        break;
      case 2:
        db.query(
          "select * from zhanjianfoodlist union select * from leizhoufoodlist union select * from lianjianfoodlist union select * from suixifoodlist union select * from wuchuanfoodlist ",
          function (err, data) {
            if (err) {
              throw err;
            } else if (data.length > 0) {
              res.send({
                data,
                code: "200",
                message: "获取成功",
              });
            } else {
              res.send({
                code: "401",
                message: "获取失败",
              });
            }
          }
        );
        break;
      case 3:
        db.query(
          "select * from zhanjianhotellist union select * from leizhouhotellist union select * from lianjianhotellist union select * from suixihotellist union select * from wuchuanhotellist ",
          function (err, data) {
            if (err) {
              throw err;
            } else if (data.length > 0) {
              res.send({
                data,
                code: "200",
                message: "获取成功",
              });
            } else {
              res.send({
                code: "401",
                message: "获取失败",
              });
            }
          }
        );
        break;
    }
  } else if (categoryid == 0 && areaid != 0) {
    switch (areaid) {
      case 1:
        db.query(
          "select * from zhanjianviewlist union select * from zhanjianfoodlist union select * from zhanjianhotellist",
          function (err, data) {
            if (err) {
              throw err;
            } else if (data.length > 0) {
              res.send({
                data,
                code: "200",
                message: "获取成功",
              });
            } else {
              res.send({
                code: "401",
                message: "获取失败",
              });
            }
          }
        );
        break;
      case 2:
        db.query(
          "select * from leizhouviewlist union select * from leizhoufoodlist union select * from leizhouhotellist ",
          function (err, data) {
            if (err) {
              throw err;
            } else if (data.length > 0) {
              res.send({
                data,
                code: "200",
                message: "获取成功",
              });
            } else {
              res.send({
                code: "401",
                message: "获取失败",
              });
            }
          }
        );
        break;
      case 3:
        db.query(
          "select * from lianjianviewlist union select * from lianjianfoodlist union select * from lianjianhotellist ",
          function (err, data) {
            if (err) {
              throw err;
            } else if (data.length > 0) {
              res.send({
                data,
                code: "200",
                message: "获取成功",
              });
            } else {
              res.send({
                code: "401",
                message: "获取失败",
              });
            }
          }
        );
        break;
      case 4:
        db.query(
          "select * from suixiviewlist union select * from suixifoodlist union select * from suixihotellist ",
          function (err, data) {
            if (err) {
              throw err;
            } else if (data.length > 0) {
              res.send({
                data,
                code: "200",
                message: "获取成功",
              });
            } else {
              res.send({
                code: "401",
                message: "获取失败",
              });
            }
          }
        );
        break;
      case 5:
        db.query(
          "select * from wuchuanviewlist union select * from wuchuanfoodlist union select * from wuchuanhotellist ",
          function (err, data) {
            if (err) {
              throw err;
            } else if (data.length > 0) {
              res.send({
                data,
                code: "200",
                message: "获取成功",
              });
            } else {
              res.send({
                code: "401",
                message: "获取失败",
              });
            }
          }
        );
        break;
    }
  } else if (categoryid == 0 && areaid == 0) {
    db.query(
      `select * from zhanjianviewlist where name like '%${like}%' union select * from leizhouviewlist where name like '%${like}%' union select * from lianjianviewlist where name like '%${like}%'  union select * from suixiviewlist where name like '%${like}%' union select * from wuchuanviewlist where name like '%${like}%' union select * from zhanjianfoodlist where name like '%${like}%' union select * from leizhoufoodlist where name like '%${like}%' union select * from lianjianfoodlist where name like '%${like}%' union select * from suixifoodlist where name like '%${like}%' union select * from wuchuanfoodlist where name like '%${like}%' union select * from zhanjianhotellist where name like '%${like}%' union select * from leizhouhotellist where name like '%${like}%' union select * from lianjianhotellist where name like '%${like}%' union select * from suixihotellist where name like '%${like}%' union select * from wuchuanhotellist where name like '%${like}%'`,
      function (err, data) {
        if (err) {
          throw err;
        } else if (data.length > 0) {
          res.send({
            data,
            code: "200",
            message: "获取成功",
          });
        } else {
          res.send({
            code: "401",
            message: "获取失败",
          });
        }
      }
    );
  }
});

//按id查询分类页数据
router.post("/morelist", function (req, res, next) {
  var val = req.body;
  var categoryId = val.categoryid.toString();
  var areaId = val.areaid.toString();
  switch (categoryId) {
    case "1":
      switch (areaId) {
        case "1":
          db.query("select * from zhanjianviewlist ", function (err, data) {
            if (err) {
              res.send({
                code: "401",
                message: "获取失败",
              });
              throw err;
            } else if (data.length > 0) {
              res.send({
                data,
                code: "200",
                message: "获取成功",
              });
            } else {
              res.send({
                code: "401",
                message: "获取失败",
              });
            }
          });
          break;
        case "2":
          db.query("select * from leizhouviewlist ", function (err, data) {
            if (err) {
              res.send({
                code: "401",
                message: "获取失败",
              });
              throw err;
            } else if (data.length > 0) {
              res.send({
                data,
                code: "200",
                message: "获取成功",
              });
            } else {
              res.send({
                code: "401",
                message: "获取失败",
              });
            }
          });
          break;
        case "3":
          db.query("select * from lianjianviewlist ", function (err, data) {
            if (err) {
              res.send({
                code: "401",
                message: "获取失败",
              });
              throw err;
            } else if (data.length > 0) {
              res.send({
                data,
                code: "200",
                message: "获取成功",
              });
            } else {
              res.send({
                code: "401",
                message: "获取失败",
              });
            }
          });
          break;
        case "4":
          db.query("select * from suixiviewlist ", function (err, data) {
            if (err) {
              res.send({
                code: "401",
                message: "获取失败",
              });
              throw err;
            } else if (data.length > 0) {
              res.send({
                data,
                code: "200",
                message: "获取成功",
              });
            } else {
              res.send({
                code: "401",
                message: "获取失败",
              });
            }
          });
          break;
        case "5":
          db.query("select * from wuchuanviewlist ", function (err, data) {
            if (err) {
              res.send({
                code: "401",
                message: "获取失败",
              });
              throw err;
            } else if (data.length > 0) {
              res.send({
                data,
                code: "200",
                message: "获取成功",
              });
            } else {
              res.send({
                code: "401",
                message: "获取失败",
              });
            }
          });
          break;
      }
      break;
    case "2":
      switch (areaId) {
        case "1":
          db.query("select * from zhanjianfoodlist ", function (err, data) {
            if (err) {
              res.send({
                code: "401",
                message: "获取失败",
              });
              throw err;
            } else if (data.length > 0) {
              res.send({
                data,
                code: "200",
                message: "获取成功",
              });
            } else {
              res.send({
                code: "401",
                message: "获取失败",
              });
            }
          });
          break;
        case "2":
          db.query("select * from leizhoufoodlist ", function (err, data) {
            if (err) {
              res.send({
                code: "401",
                message: "获取失败",
              });
              throw err;
            } else if (data.length > 0) {
              res.send({
                data,
                code: "200",
                message: "获取成功",
              });
            } else {
              res.send({
                code: "401",
                message: "获取失败",
              });
            }
          });
          break;
        case "3":
          db.query("select * from lianjianfoodlist ", function (err, data) {
            if (err) {
              res.send({
                code: "401",
                message: "获取失败",
              });
              throw err;
            } else if (data.length > 0) {
              res.send({
                data,
                code: "200",
                message: "获取成功",
              });
            } else {
              res.send({
                code: "401",
                message: "获取失败",
              });
            }
          });
          break;
        case "4":
          db.query("select * from suixifoodlist ", function (err, data) {
            if (err) {
              res.send({
                code: "401",
                message: "获取失败",
              });
              throw err;
            } else if (data.length > 0) {
              res.send({
                data,
                code: "200",
                message: "获取成功",
              });
            } else {
              res.send({
                code: "401",
                message: "获取失败",
              });
            }
          });
          break;
        case "5":
          db.query("select * from wuchuanfoodlist ", function (err, data) {
            if (err) {
              res.send({
                code: "401",
                message: "获取失败",
              });
              throw err;
            } else if (data.length > 0) {
              res.send({
                data,
                code: "200",
                message: "获取成功",
              });
            } else {
              res.send({
                code: "401",
                message: "获取失败",
              });
            }
          });
          break;
      }
      break;
    case "3":
      switch (areaId) {
        case "1":
          db.query("select * from zhanjianhotellist ", function (err, data) {
            if (err) {
              res.send({
                code: "401",
                message: "获取失败",
              });
              throw err;
            } else if (data.length > 0) {
              res.send({
                data,
                code: "200",
                message: "获取成功",
              });
            } else {
              res.send({
                code: "401",
                message: "获取失败",
              });
            }
          });
          break;
        case "2":
          db.query("select * from leizhouhotellist ", function (err, data) {
            if (err) {
              res.send({
                code: "401",
                message: "获取失败",
              });
              throw err;
            } else if (data.length > 0) {
              res.send({
                data,
                code: "200",
                message: "获取成功",
              });
            } else {
              res.send({
                code: "401",
                message: "获取失败",
              });
            }
          });
          break;
        case "3":
          db.query("select * from lianjianhotellist ", function (err, data) {
            if (err) {
              res.send({
                code: "401",
                message: "获取失败",
              });
              throw err;
            } else if (data.length > 0) {
              res.send({
                data,
                code: "200",
                message: "获取成功",
              });
            } else {
              res.send({
                code: "401",
                message: "获取失败",
              });
            }
          });
          break;
        case "4":
          db.query("select * from suixihotellist ", function (err, data) {
            if (err) {
              res.send({
                code: "401",
                message: "获取失败",
              });
              throw err;
            } else if (data.length > 0) {
              res.send({
                data,
                code: "200",
                message: "获取成功",
              });
            } else {
              res.send({
                code: "401",
                message: "获取失败",
              });
            }
          });
          break;
        case "5":
          db.query("select * from wuchuanhotellist ", function (err, data) {
            if (err) {
              res.send({
                code: "401",
                message: "获取失败",
              });
              throw err;
            } else if (data.length > 0) {
              res.send({
                data,
                code: "200",
                message: "获取成功",
              });
            } else {
              res.send({
                code: "401",
                message: "获取失败",
              });
            }
          });
          break;
      }
      break;
  }
});
module.exports = router;
