var express = require("express");
var router = express.Router();
var db = require("../../../sql");
var url = require("url");

//获取详情数据
router.post("/getdetaildata", function (req, res, next) {
  var val = req.body;
  var fullid = val.fullid;
  var listid = val.listid;
  var name = val.name;
  var arr = fullid.split().toString();
  var commentdata = [];
  var categoryonedata = [];

  // db.query(
  //   `select * from zhanjianviewlist where id=?`,
  //   [listid],
  //   function (err, data) {
  //     if (err) {
  //       throw err;
  //     } else if (data.length > 0) {
  //       data.map((item) => {
  //         categoryonedata.push(item);
  //       });
  //       db.query(
  //         `select * from commentlist where name=?`,
  //         [name],
  //         function (err, data) {
  //           if (err) {
  //             res.send({
  //               code: "401",
  //               message: "获取数据失败",
  //             });
  //             throw err;
  //           } else {
  //             if (data.length > 0) {
  //               data.map((item) => {
  //                 commentdata.push(item);
  //               });
  //             }
  //             res.send({
  //               data: {
  //                 commentdata: commentdata,
  //                 categoryonedata: categoryonedata,
  //               },
  //               code: "200",
  //               message: "获取数据成功",
  //             });
  //           }
  //         }
  //       );
  //     } else {
  //       res.send({
  //         code: "401",
  //         message: "湛江美景获取失败",
  //       });
  //     }
  //   }
  // );

  switch (arr[0]) {
    case "1":
      switch (arr[1]) {
        case "1":
          db.query(
            `select * from zhanjianviewlist where id=?`,
            [listid],
            function (err, data) {
              if (err) {
                throw err;
              } else if (data.length > 0) {
                data.map((item) => {
                  categoryonedata.push(item);
                });
                db.query(
                  `select * from commentlist where name=?`,
                  [name],
                  function (err, data) {
                    if (err) {
                      res.send({
                        code: "401",
                        message: "获取数据失败",
                      });
                      throw err;
                    } else {
                      if (data.length > 0) {
                        data.map((item) => {
                          commentdata.push(item);
                        });
                      }
                      res.send({
                        data: {
                          commentdata: commentdata,
                          categoryonedata: categoryonedata,
                        },
                        code: "200",
                        message: "获取数据成功",
                      });
                    }
                  }
                );
              } else {
                res.send({
                  code: "401",
                  message: "湛江美景获取失败",
                });
              }
            }
          );
          break;
        case "2":
          db.query(
            "select * from leizhouviewlist where id=? ",
            [listid],
            function (err, data) {
              if (err) {
                throw err;
              } else if (data.length > 0) {
                data.map((item) => {
                  categoryonedata.push(item);
                });
                db.query(
                  `select * from commentlist where name=?`,
                  [name],
                  function (err, data) {
                    if (err) {
                      res.send({
                        code: "401",
                        message: "获取数据失败",
                      });
                      throw err;
                    } else {
                      if (data.length > 0) {
                        data.map((item) => {
                          commentdata.push(item);
                        });
                      }
                      res.send({
                        data: {
                          commentdata: commentdata,
                          categoryonedata: categoryonedata,
                        },
                        code: "200",
                        message: "获取数据成功",
                      });
                    }
                  }
                );
              } else {
                res.send({
                  code: "401",
                  message: "湛江美景获取失败",
                });
              }
            }
          );
          break;
        case "3":
          db.query(
            "select * from lianjianviewlist where id=? ",
            [listid],
            function (err, data) {
              if (err) {
                throw err;
              } else if (data.length > 0) {
                data.map((item) => {
                  categoryonedata.push(item);
                });
                db.query(
                  `select * from commentlist where name=?`,
                  [name],
                  function (err, data) {
                    if (err) {
                      res.send({
                        code: "401",
                        message: "获取数据失败",
                      });
                      throw err;
                    } else {
                      if (data.length > 0) {
                        data.map((item) => {
                          commentdata.push(item);
                        });
                      }
                      res.send({
                        data: {
                          commentdata: commentdata,
                          categoryonedata: categoryonedata,
                        },
                        code: "200",
                        message: "获取数据成功",
                      });
                    }
                  }
                );
              } else {
                res.send({
                  code: "401",
                  message: "湛江美景获取失败",
                });
              }
            }
          );
          break;
        case "4":
          db.query(
            "select * from suixiviewlist where id=? ",
            [listid],
            function (err, data) {
              if (err) {
                throw err;
              } else if (data.length > 0) {
                data.map((item) => {
                  categoryonedata.push(item);
                });
                db.query(
                  `select * from commentlist where name=?`,
                  [name],
                  function (err, data) {
                    if (err) {
                      res.send({
                        code: "401",
                        message: "获取数据失败",
                      });
                      throw err;
                    } else {
                      if (data.length > 0) {
                        data.map((item) => {
                          commentdata.push(item);
                        });
                      }
                      res.send({
                        data: {
                          commentdata: commentdata,
                          categoryonedata: categoryonedata,
                        },
                        code: "200",
                        message: "获取数据成功",
                      });
                    }
                  }
                );
              } else {
                res.send({
                  code: "401",
                  message: "湛江美景获取失败",
                });
              }
            }
          );
          break;
        case "5":
          db.query(
            "select * from wuchuanviewlist where id=? ",
            [listid],
            function (err, data) {
              if (err) {
                throw err;
              } else if (data.length > 0) {
                data.map((item) => {
                  categoryonedata.push(item);
                });
                db.query(
                  `select * from commentlist where name=?`,
                  [name],
                  function (err, data) {
                    if (err) {
                      res.send({
                        code: "401",
                        message: "获取数据失败",
                      });
                      throw err;
                    } else {
                      if (data.length > 0) {
                        data.map((item) => {
                          commentdata.push(item);
                        });
                      }
                      res.send({
                        data: {
                          commentdata: commentdata,
                          categoryonedata: categoryonedata,
                        },
                        code: "200",
                        message: "获取数据成功",
                      });
                    }
                  }
                );
              } else {
                res.send({
                  code: "401",
                  message: "湛江美景获取失败",
                });
              }
            }
          );
          break;
      }
      break;
    case "2":
      switch (arr[1]) {
        case "1":
          db.query(
            "select * from zhanjianfoodlist where id=? ",
            [listid],
            function (err, data) {
              if (err) {
                throw err;
              } else if (data.length > 0) {
                data.map((item) => {
                  categoryonedata.push(item);
                });
                db.query(
                  `select * from commentlist where name=?`,
                  [name],
                  function (err, data) {
                    if (err) {
                      res.send({
                        code: "401",
                        message: "获取数据失败",
                      });
                      throw err;
                    } else {
                      if (data.length > 0) {
                        data.map((item) => {
                          commentdata.push(item);
                        });
                      }
                      res.send({
                        data: {
                          commentdata: commentdata,
                          categoryonedata: categoryonedata,
                        },
                        code: "200",
                        message: "获取数据成功",
                      });
                    }
                  }
                );
              } else {
                res.send({
                  code: "401",
                  message: "湛江美食获取失败",
                });
              }
            }
          );
          break;
        case "2":
          db.query(
            "select * from leizhoufoodlist where id=? ",
            [listid],
            function (err, data) {
              if (err) {
                throw err;
              } else if (data.length > 0) {
                data.map((item) => {
                  categoryonedata.push(item);
                });
                db.query(
                  `select * from commentlist where name=?`,
                  [name],
                  function (err, data) {
                    if (err) {
                      res.send({
                        code: "401",
                        message: "获取数据失败",
                      });
                      throw err;
                    } else {
                      if (data.length > 0) {
                        data.map((item) => {
                          commentdata.push(item);
                        });
                      }
                      res.send({
                        data: {
                          commentdata: commentdata,
                          categoryonedata: categoryonedata,
                        },
                        code: "200",
                        message: "获取数据成功",
                      });
                    }
                  }
                );
              } else {
                res.send({
                  code: "401",
                  message: "湛江美食获取失败",
                });
              }
            }
          );
          break;
        case "3":
          db.query(
            "select * from lianjianfoodlist where id=? ",
            [listid],
            function (err, data) {
              if (err) {
                throw err;
              } else if (data.length > 0) {
                data.map((item) => {
                  categoryonedata.push(item);
                });
                db.query(
                  `select * from commentlist where name=?`,
                  [name],
                  function (err, data) {
                    if (err) {
                      res.send({
                        code: "401",
                        message: "获取数据失败",
                      });
                      throw err;
                    } else {
                      if (data.length > 0) {
                        data.map((item) => {
                          commentdata.push(item);
                        });
                      }
                      res.send({
                        data: {
                          commentdata: commentdata,
                          categoryonedata: categoryonedata,
                        },
                        code: "200",
                        message: "获取数据成功",
                      });
                    }
                  }
                );
              } else {
                res.send({
                  code: "401",
                  message: "湛江美食获取失败",
                });
              }
            }
          );
          break;
        case "4":
          db.query(
            "select * from suixifoodlist where id=? ",
            [listid],
            function (err, data) {
              if (err) {
                throw err;
              } else if (data.length > 0) {
                data.map((item) => {
                  categoryonedata.push(item);
                });
                db.query(
                  `select * from commentlist where name=?`,
                  [name],
                  function (err, data) {
                    if (err) {
                      res.send({
                        code: "401",
                        message: "获取数据失败",
                      });
                      throw err;
                    } else {
                      if (data.length > 0) {
                        data.map((item) => {
                          commentdata.push(item);
                        });
                      }
                      res.send({
                        data: {
                          commentdata: commentdata,
                          categoryonedata: categoryonedata,
                        },
                        code: "200",
                        message: "获取数据成功",
                      });
                    }
                  }
                );
              } else {
                res.send({
                  code: "401",
                  message: "湛江美食获取失败",
                });
              }
            }
          );
          break;
        case "5":
          db.query(
            "select * from wuchuanfoodlist where id=? ",
            [listid],
            function (err, data) {
              if (err) {
                throw err;
              } else if (data.length > 0) {
                data.map((item) => {
                  categoryonedata.push(item);
                });
                db.query(
                  `select * from commentlist where name=?`,
                  [name],
                  function (err, data) {
                    if (err) {
                      res.send({
                        code: "401",
                        message: "获取数据失败",
                      });
                      throw err;
                    } else {
                      if (data.length > 0) {
                        data.map((item) => {
                          commentdata.push(item);
                        });
                      }
                      res.send({
                        data: {
                          commentdata: commentdata,
                          categoryonedata: categoryonedata,
                        },
                        code: "200",
                        message: "获取数据成功",
                      });
                    }
                  }
                );
              } else {
                res.send({
                  code: "401",
                  message: "湛江美食获取失败",
                });
              }
            }
          );
          break;
      }
      break;
    case "3":
      switch (arr[1]) {
        case "1":
          db.query(
            "select * from zhanjianhotellist where id=? ",
            [listid],
            function (err, data) {
              if (err) {
                throw err;
              } else if (data.length > 0) {
                data.map((item) => {
                  categoryonedata.push(item);
                });
                db.query(
                  `select * from commentlist where name=?`,
                  [name],
                  function (err, data) {
                    if (err) {
                      res.send({
                        code: "401",
                        message: "获取数据失败",
                      });
                      throw err;
                    } else {
                      if (data.length > 0) {
                        data.map((item) => {
                          commentdata.push(item);
                        });
                      }
                      res.send({
                        data: {
                          commentdata: commentdata,
                          categoryonedata: categoryonedata,
                        },
                        code: "200",
                        message: "获取数据成功",
                      });
                    }
                  }
                );
              } else {
                res.send({
                  code: "401",
                  message: "获取失败",
                });
              }
            }
          );
          break;
        case "2":
          db.query(
            "select * from leizhouhotellist where id=? ",
            [listid],
            function (err, data) {
              if (err) {
                throw err;
              } else if (data.length > 0) {
                const categorylist = {
                  categorydata: allcategory,
                  children: data,
                };
                res.send({
                  data: categorylist,
                  code: "200",
                  message: "获取成功",
                });
              } else {
                res.send({
                  code: "401",
                  message: "酒店获取失败",
                });
              }
            }
          );
          break;
        case "3":
          db.query(
            "select * from lianjianhotellist where id=? ",
            [listid],
            function (err, data) {
              if (err) {
                throw err;
              } else if (data.length > 0) {
                data.map((item) => {
                  categoryonedata.push(item);
                });
                db.query(
                  `select * from commentlist where name=?`,
                  [name],
                  function (err, data) {
                    if (err) {
                      res.send({
                        code: "401",
                        message: "获取数据失败",
                      });
                      throw err;
                    } else {
                      if (data.length > 0) {
                        data.map((item) => {
                          commentdata.push(item);
                        });
                      }
                      res.send({
                        data: {
                          commentdata: commentdata,
                          categoryonedata: categoryonedata,
                        },
                        code: "200",
                        message: "获取数据成功",
                      });
                    }
                  }
                );
              } else {
                res.send({
                  code: "401",
                  message: "酒店获取失败",
                });
              }
            }
          );
          break;
        case "4":
          db.query(
            "select * from suixihotellist where id=? ",
            [listid],
            function (err, data) {
              if (err) {
                throw err;
              } else if (data.length > 0) {
                data.map((item) => {
                  categoryonedata.push(item);
                });
                db.query(
                  `select * from commentlist where name=?`,
                  [name],
                  function (err, data) {
                    if (err) {
                      res.send({
                        code: "401",
                        message: "获取数据失败",
                      });
                      throw err;
                    } else {
                      if (data.length > 0) {
                        data.map((item) => {
                          commentdata.push(item);
                        });
                      }
                      res.send({
                        data: {
                          commentdata: commentdata,
                          categoryonedata: categoryonedata,
                        },
                        code: "200",
                        message: "获取数据成功",
                      });
                    }
                  }
                );
              } else {
                res.send({
                  code: "401",
                  message: "酒店获取失败",
                });
              }
            }
          );
          break;
        case "5":
          db.query(
            "select * from wuchuanhotellist where id=? ",
            [listid],
            function (err, data) {
              if (err) {
                throw err;
              } else if (data.length > 0) {
                data.map((item) => {
                  categoryonedata.push(item);
                });
                db.query(
                  `select * from commentlist where name=?`,
                  [name],
                  function (err, data) {
                    if (err) {
                      res.send({
                        code: "401",
                        message: "获取数据失败",
                      });
                      throw err;
                    } else {
                      if (data.length > 0) {
                        data.map((item) => {
                          commentdata.push(item);
                        });
                      }
                      res.send({
                        data: {
                          commentdata: commentdata,
                          categoryonedata: categoryonedata,
                        },
                        code: "200",
                        message: "获取数据成功",
                      });
                    }
                  }
                );
              } else {
                res.send({
                  code: "401",
                  message: "湛江酒店获取失败",
                });
              }
            }
          );
          break;
      }
      break;
  }
});
//添加详情页收藏
router.post("/addcollectdetaildata", function (req, res, next) {
  var val = req.body;
  var categoryid = val.categoryid;
  var areaid = val.areaid;
  var listid = val.listid;
  var userid = val.userid;
  db.query(
    "insert into categorycollectlist value (?,?,?,?,?)",
    [0, userid, categoryid, areaid, listid],
    function (err, data) {
      if (err) {
        res.send({
          code: "401",
          message: "收藏失败",
        });
        throw err;
      } else {
        db.query(`select * from categorycollectlist`, function (err, data) {
          if (err) {
            res.send({
              code: "401",
              message: "获取数据失败",
            });
            throw err;
          } else {
            res.send({
              data,
              code: "200",
              message: "获取数据成功",
            });
          }
        });
      }
    }
  );
});

//删除详情页收藏的数据（）
router.get("/deletecollectdetaildata", function (req, res, next) {
  var id = req.query.id;
  var userid = req.query.userid;
  var arr = req.query.areaid.split("");
  db.query(
    `delete from categorycollectlist where userid=? and categoryid=? and areaid=? and listid=? `,
    [userid, arr[0], arr[1], id],
    function (err, data) {
      if (err) {
        res.send({
          code: "401",
          message: "删除失败",
        });
        throw err;
      } else {
        db.query(`select * from categorycollectlist`, function (err, data) {
          if (err) {
            res.send({
              code: "401",
              message: "获取数据失败",
            });
            throw err;
          } else {
            res.send({
              data,
              code: "200",
              message: "获取数据成功",
            });
          }
        });
      }
    }
  );
});

module.exports = router;
