var express = require("express");
var router = express.Router();
var db = require("../../sql");
const async = require("async");
const crypto = require('crypto');
/* GET home page. */
router.post("/frontlogin", function (req, res, next) {
  if (req.url !== "/member/cart/merge") {
    //获取到用户输入的内容
    var val = req.body;
    var userName = val.account;
    // var userPwd = val.password;
    const userPwd = crypto.createHash('md5').update(val.password).digest('hex');
    //查询数据
    db.query(
      "select * from webuserinfo where username = ? and password = ?",
      [userName, userPwd],
      function (err, data) {
        if (err) {
          throw err;
        } else if (data.length > 0) {
          res.send({
            data,
            code: "200",
            message: "成功登录",
          });
        } else {
          res.send({
            code: "401",
            message: "登录失败",
          });
        }
      }
    );
  }
});

//注册
router.post("/frontregsiter", function (req, res, next) {
  if (req.url !== "/member/cart/merge") {
    //获取到用户输入的内容
    var val = req.body;
    var userName = val.account;
    const userPwd = crypto.createHash('md5').update(val.password).digest('hex');
    // var userPwd = val.password;
    var userNickName = val.nickname;
    var userPhone = val.phone;
    var headerurl =
      "https://img2.baidu.com/it/u=1649555334,1689335242&fm=253&fmt=auto&app=138&f=JPEG?w=380&h=380";
    //更新用户数据
    db.query(
      "insert into webuserinfo value (?,?,?,?,?,?,?)",
      [0, userName, userPwd, userNickName, "", userPhone, headerurl],
      function (err, data) {
        if (err) {
          res.send({
            code: "401",
            message: "注册失败",
          });
          throw err;
        } else {
          res.send({
            data,
            code: "200",
            message: "成功注册",
          });
        }
      }
    );
  }
});

//找回密码
router.post("/frontfindpassword", function (req, res, next) {
  if (req.url !== "/member/cart/merge") {
    //获取到用户输入的内容
    var val = req.body;
    var userName = val.account;
    var userPhone = val.phone;
    const userPwd = crypto.createHash('md5').update(val.password).digest('hex');
    // var userPwd = val.password;
    //查询数据
    db.query(
      "select * from webuserinfo where username = ? and phone = ?",
      [userName, userPhone],
      function (err, data) {
        if (err) {
          throw err;
        } else if (data.length > 0) {
          var updateid = data[0].id;
          db.query(
            `update webuserinfo set password=? where id=${updateid}`,
            [userPwd],
            function (err, data) {
              if (err) {
                throw err;
              } else {
                res.send({
                  code: "200",
                  message: "成功修改密码",
                });
              }
            }
          );
        } else {
          res.send({
            code: "401",
            message: "密码找回失败",
          });
        }
      }
    );
  }
});

//更新用户数据
router.post("/frontalteruserinfo", function (req, res, next) {
  if (req.url !== "/member/cart/merge") {
    //获取到用户输入的内容
    var val = req.body;

    var updateinfo = val.updateinfo;
    var userId = val.userId;
    var updateId = val.updateid;
    var updatePwd= val.updateinfo;
    //查询数据
    switch (updateId) {
      case 1:
        db.query(
          `update webuserinfo set username=? where id=${userId}`,
          [updateinfo],
          function (err, data) {
            if (err) {
              res.send({
                code: "401",
                message: "修改失败",
              });
              throw err;
            } else {
              res.send({
                code: "200",
                message: "成功修改用户名",
              });
            }
          }
        );
        break;
      case 2:;
        db.query(
          `update webuserinfo set password=? where id=${userId}`,
          [updatePwd],
          function (err, data) {
            if (err) {
              res.send({
                code: "401",
                message: "修改失败",
              });
              throw err;
            } else {
              res.send({
                code: "200",
                message: "成功修改密码",
              });
            }
          }
        );
        break;
      case 3:
        db.query(
          `update webuserinfo set nickname=? where id=${userId}`,
          [updateinfo],
          function (err, data) {
            if (err) {
              res.send({
                code: "401",
                message: "修改失败",
              });
              throw err;
            } else {
              res.send({
                code: "200",
                message: "成功修改昵称",
              });
            }
          }
        );
        break;
      case 4:
        db.query(
          `update webuserinfo set phone=? where id=${userId}`,
          [updateinfo],
          function (err, data) {
            if (err) {
              res.send({
                code: "401",
                message: "修改失败",
              });
              throw err;
            } else {
              res.send({
                code: "200",
                message: "成功修改电话号码",
              });
            }
          }
        );
        break;
      case 5:
        db.query(
          `update webuserinfo set headerurl=? where id=${userId}`,
          [updateinfo],
          function (err, data) {
            if (err) {
              res.send({
                code: "401",
                message: "修改失败",
              });
              throw err;
            } else {
              res.send({
                code: "200",
                message: "成功修改头像",
              });
            }
          }
        );
        break;
    }
  }
});

//获取用户收藏数据
router.get("/frontusercollectinfo", function (req, res, next) {
  var userId = req.query.userId;
  var collectId = req.query.collectId;
  switch (collectId) {
    case "1":
      db.query(
        "select * from collectlist where userid=?",
        [userId],
        function (err, data) {
          if (err) {
            throw err;
          } else if (data.length > 0) {
            var datalist = [];
            async.forEachOf(
              data,
              function (item, i, callback) {
                db.query(
                  `select * from commentlist where id=?`,
                  [item.commentid],
                  function (err, data) {
                    if (err) {
                      throw err;
                    } else {
                      datalist.push(data[0]);
                    }
                    callback();
                  }
                );
              },
              function (err) {
                if (err) {
                  throw err;
                } else {
                  res.send({
                    data: datalist,
                    code: "200",
                    message: "成功获取",
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
        "select * from likelist where userid=?",
        [userId],
        function (err, data) {
          if (err) {
            throw err;
          } else if (data.length > 0) {
            var datalist = [];
            async.forEachOf(
              data,
              function (item, i, callback) {
                db.query(
                  `select * from commentlist where id=?`,
                  [item.commentid],
                  function (err, data) {
                    if (err) {
                      throw err;
                    } else {
                      datalist.push(data[0]);
                    }
                    callback();
                  }
                );
              },
              function (err) {
                if (err) {
                  throw err;
                } else {
                  res.send({
                    data: datalist,
                    code: "200",
                    message: "成功获取",
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
    case "3":
      db.query(
        "select * from categorycollectlist where userid=?",
        [userId],
        function (err, data) {
          if (err) {
            throw err;
          } else if (data.length > 0) {
            var datalist = [];
            async.forEachOf(
              data,
              function (item, i, callback) {
                switch (item.categoryid) {
                  case "1":
                    switch (item.areaid) {
                      case "1":
                        db.query(
                          `select * from zhanjianviewlist where id=?`,
                          [item.listid],
                          function (err, data) {
                            if (err) {
                              throw err;
                            } else {
                              datalist.push(data[0]);
                            }
                            callback();
                          }
                        );
                        break;
                      case "2":
                        db.query(
                          `select * from leizhouviewlist where id=?`,
                          [item.listid],
                          function (err, data) {
                            if (err) {
                              throw err;
                            } else {
                              datalist.push(data[0]);
                            }
                            callback();
                          }
                        );
                        break;
                      case "3":
                        db.query(
                          `select * from lianjianviewlist where id=?`,
                          [item.listid],
                          function (err, data) {
                            if (err) {
                              throw err;
                            } else {
                              datalist.push(data[0]);
                            }
                            callback();
                          }
                        );
                        break;
                      case "4":
                        db.query(
                          `select * from suixiviewlist where id=?`,
                          [item.listid],
                          function (err, data) {
                            if (err) {
                              throw err;
                            } else {
                              datalist.push(data[0]);
                            }
                            callback();
                          }
                        );
                        break;
                      case "5":
                        db.query(
                          `select * from wuchuanviewlist where id=?`,
                          [item.listid],
                          function (err, data) {
                            if (err) {
                              throw err;
                            } else {
                              datalist.push(data[0]);
                            }
                            callback();
                          }
                        );
                        break;
                    }
                    break;
                  case "2":
                    switch (item.areaid) {
                      case "1":
                        db.query(
                          `select * from zhanjianfoodlist where id=?`,
                          [item.listid],
                          function (err, data) {
                            if (err) {
                              throw err;
                            } else {
                              datalist.push(data[0]);
                            }
                            callback();
                          }
                        );
                        break;
                      case "2":
                        db.query(
                          `select * from leizhoufoodlist where id=?`,
                          [item.listid],
                          function (err, data) {
                            if (err) {
                              throw err;
                            } else {
                              datalist.push(data[0]);
                            }
                            callback();
                          }
                        );

                        break;
                      case "3":
                        db.query(
                          `select * from lianjianfoodlist where id=?`,
                          [item.listid],
                          function (err, data) {
                            if (err) {
                              throw err;
                            } else {
                              datalist.push(data[0]);
                            }
                            callback();
                          }
                        );

                        break;
                      case "4":
                        db.query(
                          `select * from suixifoodlist where id=?`,
                          [item.listid],
                          function (err, data) {
                            if (err) {
                              throw err;
                            } else {
                              datalist.push(data[0]);
                            }
                            callback();
                          }
                        );
                        break;
                      case "5":
                        db.query(
                          `select * from wuchuanfoodlist where id=?`,
                          [item.listid],
                          function (err, data) {
                            if (err) {
                              throw err;
                            } else {
                              datalist.push(data[0]);
                            }
                            callback();
                          }
                        );

                        break;
                    }
                    break;
                  case "3":
                    switch (item.areaid) {
                      case "1":
                        db.query(
                          `select * from zhanjianhotellist where id=?`,
                          [item.listid],
                          function (err, data) {
                            if (err) {
                              throw err;
                            } else {
                              datalist.push(data[0]);
                            }
                            callback();
                          }
                        );
                        break;
                      case "2":
                        db.query(
                          `select * from leizhouhotellist where id=?`,
                          [item.listid],
                          function (err, data) {
                            if (err) {
                              throw err;
                            } else {
                              datalist.push(data[0]);
                            }
                            callback();
                          }
                        );
                        break;
                      case "3":
                        db.query(
                          `select * from lianjianhotellist where id=?`,
                          [item.listid],
                          function (err, data) {
                            if (err) {
                              throw err;
                            } else {
                              datalist.push(data[0]);
                            }
                            callback();
                          }
                        );
                        break;
                      case "4":
                        db.query(
                          `select * from suixihotellist where id=?`,
                          [item.listid],
                          function (err, data) {
                            if (err) {
                              throw err;
                            } else {
                              datalist.push(data[0]);
                            }
                            callback();
                          }
                        );

                        break;
                      case "5":
                        db.query(
                          `select * from wuchuanhotellist where id=?`,
                          [item.listid],
                          function (err, data) {
                            if (err) {
                              throw err;
                            } else {
                              datalist.push(data[0]);
                            }
                            callback();
                          }
                        );
                        break;
                    }
                    break;
                }
              },
              function (err) {
                if (err) {
                  throw err;
                } else {
                  res.send({
                    data: datalist,
                    code: "200",
                    message: "成功获取",
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
    case "4":
      db.query("select * from collectlist where userid=?", [userId], function (err, data) {
        if (err) {
          throw err;
        } else if (data.length > 0) {
          res.send({
            data,
            code: "200",
            message: "成功获取",
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
      db.query("select * from likelist where userid=?", [userId], function (err, data) {
        if (err) {
          throw err;
        } else if (data.length > 0) {
          res.send({
            data,
            code: "200",
            message: "成功获取",
          });
        } else {
          res.send({
            code: "401",
            message: "获取失败",
          });
        }
      });
      break;
    case "6":
      db.query(
        "select * from categorycollectlist",
        function (err, data) {
          if (err) {
            throw err;
          } else if (data.length > 0) {
            res.send({
              data,
              code: "200",
              message: "成功获取",
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
});

//删除用户收藏数据
router.get("/frontdeletecollectinfo", function (req, res, next) {
  var id = req.query.id;
  var collectId = req.query.collectId;
  var userid = req.query.userid;
  var arr = req.query.areaid.split("");
  switch (collectId) {
    case "1":
      db.query(
        `delete from collectlist where commentid=${id} and userid=${userid}`,
        function (err, data) {
          if (err) {
            res.send({
              code: "401",
              message: "删除失败",
            });
            throw err;
          } else {
            res.send({
              code: "200",
              message: "成功删除",
            });
          }
        }
      );
      break;
    case "2":
      db.query(
        `delete from likelist where commentid=${id} and userid=${userid}`,
        function (err, data) {
          if (err) {
            res.send({
              code: "401",
              message: "删除失败",
            });
            throw err;
          } else {
            res.send({
              code: "200",
              message: "成功删除",
            });
          }
        }
      );
      break;
    case "3":
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
            res.send({
              code: "200",
              message: "成功删除",
            });
          }
        }
      );
      break;
  }
});

module.exports = router;
