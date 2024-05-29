var express = require("express");
var router = express.Router();
var db = require("../../../sql");
var url = require("url");

//获取全部评论数据
router.get("/getcomment", function (req, res, next) {
  //获取分类id
  const reqUrl = req.url;
  const parseUrl = url.parse(reqUrl, true);
  const categoryId = parseUrl.query.id;
  //查询数据
  db.query("select * from commentlist", function (err, data) {
    if (err) {
      throw err;
    } else if (data.length > 0) {
      res.send({
        data,
        code: "200",
        message: "成功获取数据",
      });
    } else {
      res.send({
        code: "401",
        message: "获取数据失败",
      });
    }
  });
});

//删除评论数据
router.get("/deletecomment", function (req, res, next) {
  //获取分类id
  const reqUrl = req.url;
  const parseUrl = url.parse(reqUrl, true);
  const Id = parseUrl.query.id;
  //查询数据
  db.query("delete from commentlist where id=?", [Id], function (err, data) {
    if (err) {
      res.send({
        code: "401",
        message: "删除数据失败",
      });
      throw err;
    } else {
      db.query(
        `delete from collectlist where commentid=? `,
        [Id],
        function (err, data) {
          if (err) {
            res.send({
              code: "401",
              message: "获取数据失败",
            });
            throw err;
          } else {
            db.query(
              `delete from likelist where commentid=? `,
              [Id],
              function (err, data) {
                if (err) {
                  res.send({
                    code: "401",
                    message: "获取数据失败",
                  });
                  throw err;
                } else {
                  db.query(
                    `delete from commentreplylist where commentid=?`,
                    [Id],
                    function (err, data) {
                      if (err) {
                        res.send({
                          code: "401",
                          message: "获取数据失败",
                        });
                        throw err;
                      } else {
                        db.query(
                          "select * from commentlist",
                          function (err, data) {
                            if (err) {
                              throw err;
                            } else if (data.length > 0) {
                              res.send({
                                data,
                                code: "200",
                                message: "成功删除并获取数据",
                              });
                            } else {
                              res.send({
                                code: "401",
                                message: "获取数据失败",
                              });
                            }
                          }
                        );
                      }
                    }
                  );
                }
              }
            );
          }
        }
      );
    }
  });
});

//添加评论数据
router.post("/addcomment", function (req, res, next) {
  var val = req.body;
  var userId = val.userId;
  var name = val.name;
  var comment = val.comment;
  var areaId = val.areaId;
  var categoryId = val.categoryId;
  var pictureurl = "";
  var introduction = "";
  var listid = 0;
  var nickname = "";
  var headerurl = " ";
  db.query(
    `select * from webuserinfo where id=?`,
    [userId],
    function (err, data) {
      if (err) {
        throw err;
      } else if (data.length > 0) {
        nickname = data[0].nickname;
        headerurl = data[0].headerurl;
        switch (categoryId) {
          case "1":
            switch (areaId) {
              case "1":
                db.query(
                  "select * from zhanjianviewlist ",
                  function (err, data) {
                    if (err) {
                      throw err;
                    } else if (data.length > 0) {
                      data.map((item) => {
                        if (item.name == name) {
                          pictureurl = item.picture;
                          introduction = item.desc;
                          listid = item.id;
                        }
                      });
                      var areaid = parseInt(categoryId + areaId);
                      db.query(
                        "insert into commentlist value (?,?,?,?,?,?,?,?,?,?,?,?,?)",
                        [
                          0,
                          userId,
                          name,
                          pictureurl,
                          comment,
                          nickname,
                          headerurl,
                          0,
                          0,
                          0,
                          areaid,
                          introduction,
                          listid,
                        ],
                        function (err, data) {
                          if (err) {
                            res.send({
                              code: "401",
                              message: "添加评论失败",
                            });
                            throw err;
                          } else {
                            db.query(
                              "select * from commentlist",
                              function (err, data) {
                                if (err) {
                                  throw err;
                                } else if (data.length > 0) {
                                  res.send({
                                    data,
                                    code: "200",
                                    message: "添加评论成功，并重新获取数据",
                                  });
                                } else {
                                  res.send({
                                    code: "401",
                                    message: "重新获取数据失败",
                                  });
                                }
                              }
                            );
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
                  "select * from leizhouviewlist ",
                  function (err, data) {
                    if (err) {
                      throw err;
                    } else if (data.length > 0) {
                      data.map((item) => {
                        if (item.name == name) {
                          pictureurl = item.picture;
                          introduction = item.desc;
                          listid = item.id;
                        }
                      });
                      var areaid = parseInt(categoryId + areaId);
                      db.query(
                        "insert into commentlist value (?,?,?,?,?,?,?,?,?,?,?,?,?)",
                        [
                          0,
                          userId,
                          name,
                          pictureurl,
                          comment,
                          nickname,
                          headerurl,
                          0,
                          0,
                          0,
                          areaid,
                          introduction,
                          listid,
                        ],
                        function (err, data) {
                          if (err) {
                            res.send({
                              code: "401",
                              message: "添加评论失败",
                            });
                            throw err;
                          } else {
                            db.query(
                              "select * from commentlist",
                              function (err, data) {
                                if (err) {
                                  throw err;
                                } else if (data.length > 0) {
                                  res.send({
                                    data,
                                    code: "200",
                                    message: "添加评论成功，并重新获取数据",
                                  });
                                } else {
                                  res.send({
                                    code: "401",
                                    message: "重新获取数据失败",
                                  });
                                }
                              }
                            );
                          }
                        }
                      );
                    } else {
                      res.send({
                        code: "401",
                        message: "雷州美景获取失败",
                      });
                    }
                  }
                );
                break;
              case "3":
                db.query(
                  "select * from lianjianviewlist ",
                  function (err, data) {
                    if (err) {
                      throw err;
                    } else if (data.length > 0) {
                      data.map((item) => {
                        if (item.name == name) {
                          pictureurl = item.picture;
                          introduction = item.desc;
                          listid = item.id;
                        }
                      });
                      var areaid = parseInt(categoryId + areaId);
                      db.query(
                        "insert into commentlist value (?,?,?,?,?,?,?,?,?,?,?,?,?)",
                        [
                          0,
                          userId,
                          name,
                          pictureurl,
                          comment,
                          nickname,
                          headerurl,
                          0,
                          0,
                          0,
                          areaid,
                          introduction,
                          listid,
                        ],
                        function (err, data) {
                          if (err) {
                            res.send({
                              code: "401",
                              message: "添加评论失败",
                            });
                            throw err;
                          } else {
                            db.query(
                              "select * from commentlist",
                              function (err, data) {
                                if (err) {
                                  throw err;
                                } else if (data.length > 0) {
                                  res.send({
                                    data,
                                    code: "200",
                                    message: "添加评论成功，并重新获取数据",
                                  });
                                } else {
                                  res.send({
                                    code: "401",
                                    message: "重新获取数据失败",
                                  });
                                }
                              }
                            );
                          }
                        }
                      );
                    } else {
                      res.send({
                        code: "401",
                        message: "廉江美景获取失败",
                      });
                    }
                  }
                );
                break;
              case "4":
                db.query("select * from suixiviewlist ", function (err, data) {
                  if (err) {
                    throw err;
                  } else if (data.length > 0) {
                    data.map((item) => {
                      if (item.name == name) {
                        pictureurl = item.picture;
                        introduction = item.desc;
                        listid = item.id;
                      }
                    });
                    var areaid = parseInt(categoryId + areaId);
                    db.query(
                      "insert into commentlist value (?,?,?,?,?,?,?,?,?,?,?,?,?)",
                      [
                        0,
                        userId,
                        name,
                        pictureurl,
                        comment,
                        nickname,
                        headerurl,
                        0,
                        0,
                        0,
                        areaid,
                        introduction,
                        listid,
                      ],
                      function (err, data) {
                        if (err) {
                          res.send({
                            code: "401",
                            message: "添加评论失败",
                          });
                          throw err;
                        } else {
                          db.query(
                            "select * from commentlist",
                            function (err, data) {
                              if (err) {
                                throw err;
                              } else if (data.length > 0) {
                                res.send({
                                  data,
                                  code: "200",
                                  message: "添加评论成功，并重新获取数据",
                                });
                              } else {
                                res.send({
                                  code: "401",
                                  message: "重新获取数据失败",
                                });
                              }
                            }
                          );
                        }
                      }
                    );
                  } else {
                    res.send({
                      code: "401",
                      message: "湛江美景获取失败",
                    });
                  }
                });
                break;
              case "5":
                db.query(
                  "select * from wuchuanviewlist ",
                  function (err, data) {
                    if (err) {
                      throw err;
                    } else if (data.length > 0) {
                      data.map((item) => {
                        if (item.name == name) {
                          pictureurl = item.picture;
                          introduction = item.desc;
                          listid = item.id;
                        }
                      });
                      var areaid = parseInt(categoryId + areaId);
                      db.query(
                        "insert into commentlist value (?,?,?,?,?,?,?,?,?,?,?,?,?)",
                        [
                          0,
                          userId,
                          name,
                          pictureurl,
                          comment,
                          nickname,
                          headerurl,
                          0,
                          0,
                          0,
                          areaid,
                          introduction,
                          listid,
                        ],
                        function (err, data) {
                          if (err) {
                            res.send({
                              code: "401",
                              message: "添加评论失败",
                            });
                            throw err;
                          } else {
                            db.query(
                              "select * from commentlist",
                              function (err, data) {
                                if (err) {
                                  throw err;
                                } else if (data.length > 0) {
                                  res.send({
                                    data,
                                    code: "200",
                                    message: "添加评论成功，并重新获取数据",
                                  });
                                } else {
                                  res.send({
                                    code: "401",
                                    message: "重新获取数据失败",
                                  });
                                }
                              }
                            );
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
            switch (areaId) {
              case "1":
                db.query(
                  "select * from zhanjianfoodlist ",
                  function (err, data) {
                    if (err) {
                      throw err;
                    } else if (data.length > 0) {
                      data.map((item) => {
                        if (item.name == name) {
                          pictureurl = item.picture;
                          introduction = item.desc;
                          listid = item.id;
                        }
                      });
                      var areaid = parseInt(categoryId + areaId);
                      db.query(
                        "insert into commentlist value (?,?,?,?,?,?,?,?,?,?,?,?,?)",
                        [
                          0,
                          userId,
                          name,
                          pictureurl,
                          comment,
                          nickname,
                          headerurl,
                          0,
                          0,
                          0,
                          areaid,
                          introduction,
                          listid,
                        ],
                        function (err, data) {
                          if (err) {
                            res.send({
                              code: "401",
                              message: "添加评论失败",
                            });
                            throw err;
                          } else {
                            db.query(
                              "select * from commentlist",
                              function (err, data) {
                                if (err) {
                                  throw err;
                                } else if (data.length > 0) {
                                  res.send({
                                    data,
                                    code: "200",
                                    message: "添加评论成功，并重新获取数据",
                                  });
                                } else {
                                  res.send({
                                    code: "401",
                                    message: "重新获取数据失败",
                                  });
                                }
                              }
                            );
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
                  "select * from leizhoufoodlist ",
                  function (err, data) {
                    if (err) {
                      throw err;
                    } else if (data.length > 0) {
                      data.map((item) => {
                        if (item.name == name) {
                          pictureurl = item.picture;
                          introduction = item.desc;
                          listid = item.id;
                        }
                      });
                      var areaid = parseInt(categoryId + areaId);
                      db.query(
                        "insert into commentlist value (?,?,?,?,?,?,?,?,?,?,?,?,?)",
                        [
                          0,
                          userId,
                          name,
                          pictureurl,
                          comment,
                          nickname,
                          headerurl,
                          0,
                          0,
                          0,
                          areaid,
                          introduction,
                          listid,
                        ],
                        function (err, data) {
                          if (err) {
                            res.send({
                              code: "401",
                              message: "添加评论失败",
                            });
                            throw err;
                          } else {
                            db.query(
                              "select * from commentlist",
                              function (err, data) {
                                if (err) {
                                  throw err;
                                } else if (data.length > 0) {
                                  res.send({
                                    data,
                                    code: "200",
                                    message: "添加评论成功，并重新获取数据",
                                  });
                                } else {
                                  res.send({
                                    code: "401",
                                    message: "重新获取数据失败",
                                  });
                                }
                              }
                            );
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
                  "select * from lianjianfoodlist ",
                  function (err, data) {
                    if (err) {
                      throw err;
                    } else if (data.length > 0) {
                      data.map((item) => {
                        if (item.name == name) {
                          pictureurl = item.picture;
                          introduction = item.desc;
                          listid = item.id;
                        }
                      });
                      var areaid = parseInt(categoryId + areaId);
                      db.query(
                        "insert into commentlist value (?,?,?,?,?,?,?,?,?,?,?,?,?)",
                        [
                          0,
                          userId,
                          name,
                          pictureurl,
                          comment,
                          nickname,
                          headerurl,
                          0,
                          0,
                          0,
                          areaid,
                          introduction,
                          listid,
                        ],
                        function (err, data) {
                          if (err) {
                            res.send({
                              code: "401",
                              message: "添加评论失败",
                            });
                            throw err;
                          } else {
                            db.query(
                              "select * from commentlist",
                              function (err, data) {
                                if (err) {
                                  throw err;
                                } else if (data.length > 0) {
                                  res.send({
                                    data,
                                    code: "200",
                                    message: "添加评论成功，并重新获取数据",
                                  });
                                } else {
                                  res.send({
                                    code: "401",
                                    message: "重新获取数据失败",
                                  });
                                }
                              }
                            );
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
                db.query("select * from suixifoodlist ", function (err, data) {
                  if (err) {
                    throw err;
                  } else if (data.length > 0) {
                    data.map((item) => {
                      if (item.name == name) {
                        pictureurl = item.picture;
                        introduction = item.desc;
                        listid = item.id;
                      }
                    });
                    var areaid = parseInt(categoryId + areaId);
                    db.query(
                      "insert into commentlist value (?,?,?,?,?,?,?,?,?,?,?,?,?)",
                      [
                        0,
                        userId,
                        name,
                        pictureurl,
                        comment,
                        nickname,
                        headerurl,
                        0,
                        0,
                        0,
                        areaid,
                        introduction,
                        listid,
                      ],
                      function (err, data) {
                        if (err) {
                          res.send({
                            code: "401",
                            message: "添加评论失败",
                          });
                          throw err;
                        } else {
                          db.query(
                            "select * from commentlist",
                            function (err, data) {
                              if (err) {
                                throw err;
                              } else if (data.length > 0) {
                                res.send({
                                  data,
                                  code: "200",
                                  message: "添加评论成功，并重新获取数据",
                                });
                              } else {
                                res.send({
                                  code: "401",
                                  message: "重新获取数据失败",
                                });
                              }
                            }
                          );
                        }
                      }
                    );
                  } else {
                    res.send({
                      code: "401",
                      message: "湛江美食获取失败",
                    });
                  }
                });

                break;
              case "5":
                db.query(
                  "select * from wuchuanfoodlist ",
                  function (err, data) {
                    if (err) {
                      throw err;
                    } else if (data.length > 0) {
                      data.map((item) => {
                        if (item.name == name) {
                          pictureurl = item.picture;
                          introduction = item.desc;
                          listid = item.id;
                        }
                      });
                      var areaid = parseInt(categoryId + areaId);
                      db.query(
                        "insert into commentlist value (?,?,?,?,?,?,?,?,?,?,?,?,?)",
                        [
                          0,
                          userId,
                          name,
                          pictureurl,
                          comment,
                          nickname,
                          headerurl,
                          0,
                          0,
                          0,
                          areaid,
                          introduction,
                          listid,
                        ],
                        function (err, data) {
                          if (err) {
                            res.send({
                              code: "401",
                              message: "添加评论失败",
                            });
                            throw err;
                          } else {
                            db.query(
                              "select * from commentlist",
                              function (err, data) {
                                if (err) {
                                  throw err;
                                } else if (data.length > 0) {
                                  res.send({
                                    data,
                                    code: "200",
                                    message: "添加评论成功，并重新获取数据",
                                  });
                                } else {
                                  res.send({
                                    code: "401",
                                    message: "重新获取数据失败",
                                  });
                                }
                              }
                            );
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
            switch (areaId) {
              case "1":
                db.query(
                  "select * from zhanjianhotellist ",
                  function (err, data) {
                    if (err) {
                      throw err;
                    } else if (data.length > 0) {
                      data.map((item) => {
                        if (item.name == name) {
                          pictureurl = item.picture;
                          introduction = item.desc;
                          listid = item.id;
                        }
                      });
                      var areaid = parseInt(categoryId + areaId);
                      db.query(
                        "insert into commentlist value (?,?,?,?,?,?,?,?,?,?,?,?,?)",
                        [
                          0,
                          userId,
                          name,
                          pictureurl,
                          comment,
                          nickname,
                          headerurl,
                          0,
                          0,
                          0,
                          areaid,
                          introduction,
                          listid,
                        ],
                        function (err, data) {
                          if (err) {
                            res.send({
                              code: "401",
                              message: "添加评论失败",
                            });
                            throw err;
                          } else {
                            db.query(
                              "select * from commentlist",
                              function (err, data) {
                                if (err) {
                                  throw err;
                                } else if (data.length > 0) {
                                  res.send({
                                    data,
                                    code: "200",
                                    message: "添加评论成功，并重新获取数据",
                                  });
                                } else {
                                  res.send({
                                    code: "401",
                                    message: "重新获取数据失败",
                                  });
                                }
                              }
                            );
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
                  "select * from leizhouhotellist ",
                  function (err, data) {
                    if (err) {
                      throw err;
                    } else if (data.length > 0) {
                      data.map((item) => {
                        if (item.name == name) {
                          pictureurl = item.picture;
                          introduction = item.desc;
                          listid = item.id;
                        }
                      });
                      var areaid = parseInt(categoryId + areaId);
                      db.query(
                        "insert into commentlist value (?,?,?,?,?,?,?,?,?,?,?,?,?)",
                        [
                          0,
                          userId,
                          name,
                          pictureurl,
                          comment,
                          nickname,
                          headerurl,
                          0,
                          0,
                          0,
                          areaid,
                          introduction,
                          listid,
                        ],
                        function (err, data) {
                          if (err) {
                            res.send({
                              code: "401",
                              message: "添加评论失败",
                            });
                            throw err;
                          } else {
                            db.query(
                              "select * from commentlist",
                              function (err, data) {
                                if (err) {
                                  throw err;
                                } else if (data.length > 0) {
                                  res.send({
                                    data,
                                    code: "200",
                                    message: "添加评论成功，并重新获取数据",
                                  });
                                } else {
                                  res.send({
                                    code: "401",
                                    message: "重新获取数据失败",
                                  });
                                }
                              }
                            );
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
              case "3":
                db.query(
                  "select * from lianjianhotellist ",
                  function (err, data) {
                    if (err) {
                      throw err;
                    } else if (data.length > 0) {
                      data.map((item) => {
                        if (item.name == name) {
                          pictureurl = item.picture;
                          introduction = item.desc;
                          listid = item.id;
                        }
                      });
                      var areaid = parseInt(categoryId + areaId);
                      db.query(
                        "insert into commentlist value (?,?,?,?,?,?,?,?,?,?,?,?,?)",
                        [
                          0,
                          userId,
                          name,
                          pictureurl,
                          comment,
                          nickname,
                          headerurl,
                          0,
                          0,
                          0,
                          areaid,
                          introduction,
                          listid,
                        ],
                        function (err, data) {
                          if (err) {
                            res.send({
                              code: "401",
                              message: "添加评论失败",
                            });
                            throw err;
                          } else {
                            db.query(
                              "select * from commentlist",
                              function (err, data) {
                                if (err) {
                                  throw err;
                                } else if (data.length > 0) {
                                  res.send({
                                    data,
                                    code: "200",
                                    message: "添加评论成功，并重新获取数据",
                                  });
                                } else {
                                  res.send({
                                    code: "401",
                                    message: "重新获取数据失败",
                                  });
                                }
                              }
                            );
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
                db.query("select * from suixihotellist ", function (err, data) {
                  if (err) {
                    throw err;
                  } else if (data.length > 0) {
                    data.map((item) => {
                      if (item.name == name) {
                        pictureurl = item.picture;
                        introduction = item.desc;
                        listid = item.id;
                      }
                    });
                    var areaid = parseInt(categoryId + areaId);
                    db.query(
                      "insert into commentlist value (?,?,?,?,?,?,?,?,?,?,?,?,?)",
                      [
                        0,
                        userId,
                        name,
                        pictureurl,
                        comment,
                        nickname,
                        headerurl,
                        0,
                        0,
                        0,
                        areaid,
                        introduction,
                        listid,
                      ],
                      function (err, data) {
                        if (err) {
                          res.send({
                            code: "401",
                            message: "添加评论失败",
                          });
                          throw err;
                        } else {
                          db.query(
                            "select * from commentlist",
                            function (err, data) {
                              if (err) {
                                throw err;
                              } else if (data.length > 0) {
                                res.send({
                                  data,
                                  code: "200",
                                  message: "添加评论成功，并重新获取数据",
                                });
                              } else {
                                res.send({
                                  code: "401",
                                  message: "重新获取数据失败",
                                });
                              }
                            }
                          );
                        }
                      }
                    );
                  } else {
                    res.send({
                      code: "401",
                      message: "酒店获取失败",
                    });
                  }
                });

                break;
              case "5":
                db.query(
                  "select * from wuchuanhotellist ",
                  function (err, data) {
                    if (err) {
                      throw err;
                    } else if (data.length > 0) {
                      data.map((item) => {
                        if (item.name == name) {
                          pictureurl = item.picture;
                          introduction = item.desc;
                          listid = item.id;
                        }
                      });
                      var areaid = parseInt(categoryId + areaId);
                      db.query(
                        "insert into commentlist value (?,?,?,?,?,?,?,?,?,?,?,?,?)",
                        [
                          0,
                          userId,
                          name,
                          pictureurl,
                          comment,
                          nickname,
                          headerurl,
                          0,
                          0,
                          0,
                          areaid,
                          introduction,
                          listid,
                        ],
                        function (err, data) {
                          if (err) {
                            res.send({
                              code: "401",
                              message: "添加评论失败",
                            });
                            throw err;
                          } else {
                            db.query(
                              "select * from commentlist",
                              function (err, data) {
                                if (err) {
                                  throw err;
                                } else if (data.length > 0) {
                                  res.send({
                                    data,
                                    code: "200",
                                    message: "添加评论成功，并重新获取数据",
                                  });
                                } else {
                                  res.send({
                                    code: "401",
                                    message: "重新获取数据失败",
                                  });
                                }
                              }
                            );
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
      } else {
        res.send({
          code: "401",
          message: "当前用户不存在",
        });
      }
    }
  );
  //   if (err) {
  //     throw err;
  //   } else if(data.length > 0) {
  //     nickname =data[0].nickname;
  //     headerurl=data[0].headerurl;
  //     db.query(
  //   "insert into commentlist value (?,?,?,?,?,?,?,?,?,?)",
  //   [0, userId, name, pictureurl, comment, nickname, headerurl, 1, 2, 3],
  //   function (err, data) {
  //     if (err) {
  //       res.send({
  //         code: "401",
  //         message: "添加评论失败",
  //       });
  //       throw err;
  //     } else {
  //       db.query("select * from commentlist", function (err, data) {
  //         if (err) {
  //           throw err;
  //         } else if (data.length > 0) {
  //           res.send({
  //             data,
  //             code: "200",
  //             message: "添加评论成功，并重新获取数据",
  //           });
  //         } else {
  //           res.send({
  //             code: "401",
  //             message: "重新获取数据失败",
  //           });
  //         }
  //       });
  //     }
  //   }
  // );
  //   }else{
  //     res.send({
  //       code: "401",
  //       message: "添加评论失败",
  //     });
  //   }
  // } )
  //查询数据
});
//评论页点赞、收藏、评论
router.post("/addhandleaction", function (req, res, next) {
  var val = req.body;
  var typeid = val.typeid;
  var data = val.data;
  var listid = val.listid;
  var userid = val.userid;
  var visible = val.visible;
  if (typeid == 1) {
    db.query(
      `update commentlist set browsesum=? where id=?`,
      [data, listid],
      function (err, data) {
        if (err) {
          res.send({
            code: "401",
            message: "更新数据失败",
          });
          throw err;
        } else if (visible == true) {
          db.query(
            "insert into collectlist value (?,?,?)",
            [0, userid, listid],
            function (err, data) {
              if (err) {
                res.send({
                  code: "401",
                  message: "添加收藏失败",
                });
                throw err;
              } else {
                res.send({
                  code: "200",
                  message: "添加收藏成功",
                });
              }
            }
          );
        } else if (visible == false) {
          db.query(
            "delete from collectlist where userid=? and commentid=?",
            [userid, listid],
            function (err, data) {
              if (err) {
                res.send({
                  code: "401",
                  message: "删除收藏失败",
                });
                throw err;
              } else {
                res.send({
                  code: "200",
                  message: "删除收藏成功",
                });
              }
            }
          );
        }
      }
    );
  } else if (typeid == 2) {
    db.query(
      `update commentlist set upvotesum=? where id=?`,
      [data, listid],
      function (err, data) {
        if (err) {
          res.send({
            code: "401",
            message: "更新数据失败",
          });
          throw err;
        } else if (visible == true) {
          db.query(
            "insert into likelist value (?,?,?)",
            [0, userid, listid],
            function (err, data) {
              if (err) {
                res.send({
                  code: "401",
                  message: "添加点赞失败",
                });
                throw err;
              } else {
                res.send({
                  code: "200",
                  message: "添加点赞成功",
                });
              }
            }
          );
        } else {
          db.query(
            "delete from likelist where userid=? and commentid=?",
            [userid, listid],
            function (err, data) {
              if (err) {
                res.send({
                  code: "401",
                  message: "删除点赞失败",
                });
                throw err;
              } else {
                res.send({
                  code: "200",
                  message: "删除点赞成功",
                });
              }
            }
          );
        }
      }
    );
  } else {
    db.query(
      `update commentlist set replysum=? where id=?`,
      [data, listid],
      function (err, data) {
        if (err) {
          res.send({
            code: "401",
            message: "更新数据失败",
          });
          throw err;
        } else {
          res.send({
            code: "200",
            message: "成功更新数据",
          });
        }
      }
    );
  }
});

//获取评论回复数据
router.get("/getcommentreplylist", function (req, res, next) {
  //获取分类id
  const reqUrl = req.url;
  const parseUrl = url.parse(reqUrl, true);
  const commentid = parseUrl.query.id;
  //查询数据
  db.query(
    "select * from commentreplylist where commentid=?",
    [commentid],
    function (err, data) {
      if (err) {
        throw err;
      } else if (data.length > 0) {
        res.send({
          data,
          code: "200",
          message: "成功获取数据",
        });
      } else {
        res.send({
          code: "401",
          message: "获取数据失败",
        });
      }
    }
  );
});

//添加评论回复数据
router.post("/addcommentreplydata", function (req, res, next) {
  var val = req.body;
  var userid = val.userid;
  var headerurl = val.headerurl;
  var commentreply = val.commentreply;
  var commentid = val.commentid;
  var nickname = val.nickname;
  db.query(
    "insert into commentreplylist value (?,?,?,?,?,?)",
    [0, commentid, nickname, headerurl, userid, commentreply],
    function (err, data) {
      if (err) {
        res.send({
          code: "401",
          message: "添加评论失败",
        });
        throw err;
      } else {
        db.query(
          "select * from commentreplylist where commentid=?",
          [commentid],
          function (err, data) {
            if (err) {
              throw err;
            } else if (data.length > 0) {
              res.send({
                data,
                code: "200",
                message: "添加评论回复成功，并重新获取数据",
              });
            } else {
              res.send({
                code: "401",
                message: "重新获取数据失败",
              });
            }
          }
        );
      }
    }
  );
});

//删除评论回复数据
router.get("/deletecommentreplydata", function (req, res, next) {
  const reqUrl = req.url;
  const parseUrl = url.parse(reqUrl, true);
  const Id = parseUrl.query.id;
  var userid=parseUrl.query.userid;
  db.query(
    "delete from commentreplylist where id=? and userid=?",
    [Id,userid],
    function (err, data) {
      if (err) {
        res.send({
          code: "401",
          message: "删除数据失败",
        });
        throw err;
      } else {
        res.send({
          code: "200",
          message: "删除数据成功",
        });
      }
    }
  );
});
module.exports = router;
