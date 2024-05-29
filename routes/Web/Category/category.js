var express = require("express");
var router = express.Router();
var db = require("../../../sql");
var url = require("url");
//按id查询分类面包屑数据
router.get("/breadtitlelist", function (req, res, next) {
  //获取分类id
  const reqUrl = req.url;
  const parseUrl = url.parse(reqUrl, true);
  const categoryId = parseUrl.query.id;
  //查询数据
  db.query(
    "select * from breadtitlelist where id = ?",
    [categoryId],
    function (err, data) {
      if (err) {
        throw err;
      } else if (data.length > 0) {
        res.send({
          data,
          code: "200",
          message: "成功获取分类面包屑数据",
        });
      } else {
        res.send({
          code: "401",
          message: "获取失败",
        });
      }
    }
  );
});
//按id查询分类页数据
router.get("/categorylist", function (req, res, next) {
  const reqUrl = req.url;
  const parseUrl = url.parse(reqUrl, true);
  var Id = parseUrl.query.id;
  var IdArr = Id.split().toString();
  var categoryId = IdArr[0];
  var areaId = IdArr[2];
  var allcategory = [];
  var i = 0;
  switch (categoryId) {
    case "1":
      switch (areaId) {
        case "1":
          db.query("select * from viewallcategorylist ", function (err, data) {
            if (err) {
              throw err;
            } else if (data.length > 0) {
              data.map((item) => {
                allcategory[i] = item;
                i++;
              });
              db.query("select * from zhanjianviewlist ", function (err, data) {
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
                    message: "湛江美景获取失败",
                  });
                }
              });
            } else {
              res.send({
                code: "401",
                message: "湛江美景获取失败",
              });
            }
          });
          break;
        case "2":
          db.query("select * from viewallcategorylist ", function (err, data) {
            if (err) {
              throw err;
            } else if (data.length > 0) {
              data.map((item) => {
                allcategory[i] = item;
                i++;
              });
              db.query("select * from leizhouviewlist ", function (err, data) {
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
                    message: "湛江美景获取失败",
                  });
                }
              });
            } else {
              res.send({
                code: "401",
                message: "湛江美景获取失败",
              });
            }
          });
          break;
        case "3":
          db.query("select * from viewallcategorylist ", function (err, data) {
            if (err) {
              throw err;
            } else if (data.length > 0) {
              data.map((item) => {
                allcategory[i] = item;
                i++;
              });
              db.query("select * from lianjianviewlist ", function (err, data) {
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
                    message: "湛江美景获取失败",
                  });
                }
              });
            } else {
              res.send({
                code: "401",
                message: "湛江美景获取失败",
              });
            }
          });
          break;
        case "4":
          db.query("select * from viewallcategorylist ", function (err, data) {
            if (err) {
              throw err;
            } else if (data.length > 0) {
              data.map((item) => {
                allcategory[i] = item;
                i++;
              });
              db.query("select * from suixiviewlist ", function (err, data) {
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
                    message: "湛江美景获取失败",
                  });
                }
              });
            } else {
              res.send({
                code: "401",
                message: "湛江美景获取失败",
              });
            }
          });
          break;
        case "5":
          db.query("select * from viewallcategorylist ", function (err, data) {
            if (err) {
              throw err;
            } else if (data.length > 0) {
              data.map((item) => {
                allcategory[i] = item;
                i++;
              });
              db.query("select * from wuchuanviewlist ", function (err, data) {
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
                    message: "湛江美景获取失败",
                  });
                }
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
    case "2":
      switch (areaId) {
        case "1":
          db.query("select * from foodallcategorylist ", function (err, data) {
            if (err) {
              throw err;
            } else if (data.length > 0) {
              data.map((item) => {
                allcategory[i] = item;
                i++;
              });
              db.query("select * from zhanjianfoodlist ", function (err, data) {
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
                    message: "湛江美食获取失败",
                  });
                }
              });
            } else {
              res.send({
                code: "401",
                message: "湛江美shiwu获取失败",
              });
            }
          });
          break;
        case "2":
          db.query("select * from foodallcategorylist ", function (err, data) {
            if (err) {
              throw err;
            } else if (data.length > 0) {
              data.map((item) => {
                allcategory[i] = item;
                i++;
              });
              db.query("select * from leizhoufoodlist ", function (err, data) {
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
                    message: "湛江美食获取失败",
                  });
                }
              });
            } else {
              res.send({
                code: "401",
                message: "湛江美shiwu获取失败",
              });
            }
          });

          break;
        case "3":
          db.query("select * from foodallcategorylist ", function (err, data) {
            if (err) {
              throw err;
            } else if (data.length > 0) {
              data.map((item) => {
                allcategory[i] = item;
                i++;
              });
              db.query("select * from lianjianfoodlist ", function (err, data) {
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
                    message: "湛江美食获取失败",
                  });
                }
              });
            } else {
              res.send({
                code: "401",
                message: "湛江美shiwu获取失败",
              });
            }
          });

          break;
        case "4":
          db.query("select * from foodallcategorylist ", function (err, data) {
            if (err) {
              throw err;
            } else if (data.length > 0) {
              data.map((item) => {
                allcategory[i] = item;
                i++;
              });
              db.query("select * from suixifoodlist ", function (err, data) {
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
                    message: "湛江美食获取失败",
                  });
                }
              });
            } else {
              res.send({
                code: "401",
                message: "湛江美shiwu获取失败",
              });
            }
          });

          break;
        case "5":
          db.query("select * from foodallcategorylist ", function (err, data) {
            if (err) {
              throw err;
            } else if (data.length > 0) {
              data.map((item) => {
                allcategory[i] = item;
                i++;
              });
              db.query("select * from wuchuanfoodlist ", function (err, data) {
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
                    message: "湛江美食获取失败",
                  });
                }
              });
            } else {
              res.send({
                code: "401",
                message: "湛江美shiwu获取失败",
              });
            }
          });

          break;
      }
      break;
    case "3":
      switch (areaId) {
        case "1":
          db.query("select * from hotelallcategorylist ", function (err, data) {
            if (err) {
              throw err;
            } else if (data.length > 0) {
              data.map((item) => {
                allcategory[i] = item;
                i++;
              });
              db.query(
                "select * from zhanjianhotellist ",
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
                      message: "获取失败",
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
          });
          break;
        case "2":
          db.query("select * from hotelallcategorylist ", function (err, data) {
            if (err) {
              throw err;
            } else if (data.length > 0) {
              data.map((item) => {
                allcategory[i] = item;
                i++;
              });
              db.query("select * from leizhouhotellist ", function (err, data) {
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
              });
            } else {
              res.send({
                code: "401",
                message: "酒店获取失败",
              });
            }
          });

          break;
        case "3":
          db.query("select * from hotelallcategorylist ", function (err, data) {
            if (err) {
              throw err;
            } else if (data.length > 0) {
              data.map((item) => {
                allcategory[i] = item;
                i++;
              });
              db.query(
                "select * from lianjianhotellist ",
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
            } else {
              res.send({
                code: "401",
                message: "酒店获取失败",
              });
            }
          });
          break;
        case "4":
          db.query("select * from hotelallcategorylist ", function (err, data) {
            if (err) {
              throw err;
            } else if (data.length > 0) {
              data.map((item) => {
                allcategory[i] = item;
                i++;
              });
              db.query("select * from suixihotellist ", function (err, data) {
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
              });
            } else {
              res.send({
                code: "401",
                message: "酒店获取失败",
              });
            }
          });

          break;
        case "5":
          db.query("select * from hotelallcategorylist ", function (err, data) {
            if (err) {
              throw err;
            } else if (data.length > 0) {
              data.map((item) => {
                allcategory[i] = item;
                i++;
              });
              db.query("select * from wuchuanhotellist ", function (err, data) {
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
                    message: "湛江酒店获取失败",
                  });
                }
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

  // var pictureurl = "";
  // var val = req.body;
  // var userId = val.userId;
  // var name = val.name;
  // var comment = val.comment;
  // var nickname = "";
  // var headerurl = " ";
  // db.query(
  //   `select * from webuserinfo where id=?`,
  //   [userId],
  //   function (err, data) {
  //     if (err) {
  //       throw err;
  //     } else if (data.length > 0) {
  //       nickname = data[0].nickname;
  //       headerurl = data[0].headerurl;
  //       switch (categoryId) {
  //         case "1":
  //           switch (areaId) {
  //             case "1":
  //               db.query(
  //                 "select * from zhanjianviewlist ",
  //                 function (err, data) {
  //                   if (err) {
  //                     throw err;
  //                   } else if (data.length > 0) {
  //                     data.map((item) => {
  //                       if (item.name == name) {
  //                         pictureurl = item.picture;
  //                       }
  //                     });
  //                     db.query(
  //                       "insert into commentlist value (?,?,?,?,?,?,?,?,?,?)",
  //                       [
  //                         0,
  //                         userId,
  //                         name,
  //                         pictureurl,
  //                         comment,
  //                         nickname,
  //                         headerurl,
  //                         0,
  //                         0,
  //                         0,
  //                       ],
  //                       function (err, data) {
  //                         if (err) {
  //                           res.send({
  //                             code: "401",
  //                             message: "添加评论失败",
  //                           });
  //                           throw err;
  //                         } else {
  //                           db.query(
  //                             "select * from commentlist",
  //                             function (err, data) {
  //                               if (err) {
  //                                 throw err;
  //                               } else if (data.length > 0) {
  //                                 res.send({
  //                                   data,
  //                                   code: "200",
  //                                   message: "添加评论成功，并重新获取数据",
  //                                 });
  //                               } else {
  //                                 res.send({
  //                                   code: "401",
  //                                   message: "重新获取数据失败",
  //                                 });
  //                               }
  //                             }
  //                           );
  //                         }
  //                       }
  //                     );
  //                   } else {
  //                     res.send({
  //                       code: "401",
  //                       message: "湛江美景获取失败",
  //                     });
  //                   }
  //                 }
  //               );
  //               break;
  //             case "2":
  //               db.query(
  //                 "select * from leizhouviewlist ",
  //                 function (err, data) {
  //                   if (err) {
  //                     throw err;
  //                   } else if (data.length > 0) {
  //                     data.map((item) => {
  //                       if (item.name == name) {
  //                         pictureurl = item.picture;
  //                       }
  //                     });
  //                     db.query(
  //                       "insert into commentlist value (?,?,?,?,?,?,?,?,?,?)",
  //                       [
  //                         0,
  //                         userId,
  //                         name,
  //                         pictureurl,
  //                         comment,
  //                         nickname,
  //                         headerurl,
  //                         0,
  //                         0,
  //                         0,
  //                       ],
  //                       function (err, data) {
  //                         if (err) {
  //                           res.send({
  //                             code: "401",
  //                             message: "添加评论失败",
  //                           });
  //                           throw err;
  //                         } else {
  //                           db.query(
  //                             "select * from commentlist",
  //                             function (err, data) {
  //                               if (err) {
  //                                 throw err;
  //                               } else if (data.length > 0) {
  //                                 res.send({
  //                                   data,
  //                                   code: "200",
  //                                   message: "添加评论成功，并重新获取数据",
  //                                 });
  //                               } else {
  //                                 res.send({
  //                                   code: "401",
  //                                   message: "重新获取数据失败",
  //                                 });
  //                               }
  //                             }
  //                           );
  //                         }
  //                       }
  //                     );
  //                   } else {
  //                     res.send({
  //                       code: "401",
  //                       message: "雷州美景获取失败",
  //                     });
  //                   }
  //                 }
  //               );
  //               break;
  //             case "3":
  //               db.query(
  //                 "select * from lianjianviewlist ",
  //                 function (err, data) {
  //                   if (err) {
  //                     throw err;
  //                   } else if (data.length > 0) {
  //                     data.map((item) => {
  //                       if (item.name == name) {
  //                         pictureurl = item.picture;
  //                       }
  //                     });
  //                     db.query(
  //                       "insert into commentlist value (?,?,?,?,?,?,?,?,?,?)",
  //                       [
  //                         0,
  //                         userId,
  //                         name,
  //                         pictureurl,
  //                         comment,
  //                         nickname,
  //                         headerurl,
  //                         0,
  //                         0,
  //                         0,
  //                       ],
  //                       function (err, data) {
  //                         if (err) {
  //                           res.send({
  //                             code: "401",
  //                             message: "添加评论失败",
  //                           });
  //                           throw err;
  //                         } else {
  //                           db.query(
  //                             "select * from commentlist",
  //                             function (err, data) {
  //                               if (err) {
  //                                 throw err;
  //                               } else if (data.length > 0) {
  //                                 res.send({
  //                                   data,
  //                                   code: "200",
  //                                   message: "添加评论成功，并重新获取数据",
  //                                 });
  //                               } else {
  //                                 res.send({
  //                                   code: "401",
  //                                   message: "重新获取数据失败",
  //                                 });
  //                               }
  //                             }
  //                           );
  //                         }
  //                       }
  //                     );
  //                   } else {
  //                     res.send({
  //                       code: "401",
  //                       message: "廉江美景获取失败",
  //                     });
  //                   }
  //                 }
  //               );
  //               break;
  //             case "4":
  //               db.query("select * from suixiviewlist ", function (err, data) {
  //                 if (err) {
  //                   throw err;
  //                 } else if (data.length > 0) {
  //                   data.map((item) => {
  //                     if (item.name == name) {
  //                       pictureurl = item.picture;
  //                     }
  //                   });
  //                   db.query(
  //                     "insert into commentlist value (?,?,?,?,?,?,?,?,?,?)",
  //                     [
  //                       0,
  //                       userId,
  //                       name,
  //                       pictureurl,
  //                       comment,
  //                       nickname,
  //                       headerurl,
  //                       0,
  //                       0,
  //                       0,
  //                     ],
  //                     function (err, data) {
  //                       if (err) {
  //                         res.send({
  //                           code: "401",
  //                           message: "添加评论失败",
  //                         });
  //                         throw err;
  //                       } else {
  //                         db.query(
  //                           "select * from commentlist",
  //                           function (err, data) {
  //                             if (err) {
  //                               throw err;
  //                             } else if (data.length > 0) {
  //                               res.send({
  //                                 data,
  //                                 code: "200",
  //                                 message: "添加评论成功，并重新获取数据",
  //                               });
  //                             } else {
  //                               res.send({
  //                                 code: "401",
  //                                 message: "重新获取数据失败",
  //                               });
  //                             }
  //                           }
  //                         );
  //                       }
  //                     }
  //                   );
  //                 } else {
  //                   res.send({
  //                     code: "401",
  //                     message: "湛江美景获取失败",
  //                   });
  //                 }
  //               });
  //               break;
  //             case "5":
  //               db.query(
  //                 "select * from wuchuanviewlist ",
  //                 function (err, data) {
  //                   if (err) {
  //                     throw err;
  //                   } else if (data.length > 0) {
  //                     data.map((item) => {
  //                       if (item.name == name) {
  //                         pictureurl = item.picture;
  //                       }
  //                     });
  //                     db.query(
  //                       "insert into commentlist value (?,?,?,?,?,?,?,?,?,?)",
  //                       [
  //                         0,
  //                         userId,
  //                         name,
  //                         pictureurl,
  //                         comment,
  //                         nickname,
  //                         headerurl,
  //                         0,
  //                         0,
  //                         0,
  //                       ],
  //                       function (err, data) {
  //                         if (err) {
  //                           res.send({
  //                             code: "401",
  //                             message: "添加评论失败",
  //                           });
  //                           throw err;
  //                         } else {
  //                           db.query(
  //                             "select * from commentlist",
  //                             function (err, data) {
  //                               if (err) {
  //                                 throw err;
  //                               } else if (data.length > 0) {
  //                                 res.send({
  //                                   data,
  //                                   code: "200",
  //                                   message: "添加评论成功，并重新获取数据",
  //                                 });
  //                               } else {
  //                                 res.send({
  //                                   code: "401",
  //                                   message: "重新获取数据失败",
  //                                 });
  //                               }
  //                             }
  //                           );
  //                         }
  //                       }
  //                     );
  //                   } else {
  //                     res.send({
  //                       code: "401",
  //                       message: "湛江美景获取失败",
  //                     });
  //                   }
  //                 }
  //               );
  //               break;
  //           }
  //           break;
  //         case "2":
  //           switch (areaId) {
  //             case "1":
  //               db.query(
  //                 "select * from zhanjianfoodlist ",
  //                 function (err, data) {
  //                   if (err) {
  //                     throw err;
  //                   } else if (data.length > 0) {
  //                     data.map((item) => {
  //                       if (item.name == name) {
  //                         pictureurl = item.picture;
  //                       }
  //                     });
  //                     db.query(
  //                       "insert into commentlist value (?,?,?,?,?,?,?,?,?,?)",
  //                       [
  //                         0,
  //                         userId,
  //                         name,
  //                         pictureurl,
  //                         comment,
  //                         nickname,
  //                         headerurl,
  //                         0,
  //                         0,
  //                         0,
  //                       ],
  //                       function (err, data) {
  //                         if (err) {
  //                           res.send({
  //                             code: "401",
  //                             message: "添加评论失败",
  //                           });
  //                           throw err;
  //                         } else {
  //                           db.query(
  //                             "select * from commentlist",
  //                             function (err, data) {
  //                               if (err) {
  //                                 throw err;
  //                               } else if (data.length > 0) {
  //                                 res.send({
  //                                   data,
  //                                   code: "200",
  //                                   message: "添加评论成功，并重新获取数据",
  //                                 });
  //                               } else {
  //                                 res.send({
  //                                   code: "401",
  //                                   message: "重新获取数据失败",
  //                                 });
  //                               }
  //                             }
  //                           );
  //                         }
  //                       }
  //                     );
  //                   } else {
  //                     res.send({
  //                       code: "401",
  //                       message: "湛江美食获取失败",
  //                     });
  //                   }
  //                 }
  //               );
  //               break;
  //             case "2":
  //               db.query(
  //                 "select * from leizhoufoodlist ",
  //                 function (err, data) {
  //                   if (err) {
  //                     throw err;
  //                   } else if (data.length > 0) {
  //                     data.map((item) => {
  //                       if (item.name == name) {
  //                         pictureurl = item.picture;
  //                       }
  //                     });
  //                     db.query(
  //                       "insert into commentlist value (?,?,?,?,?,?,?,?,?,?)",
  //                       [
  //                         0,
  //                         userId,
  //                         name,
  //                         pictureurl,
  //                         comment,
  //                         nickname,
  //                         headerurl,
  //                         0,
  //                         0,
  //                         0,
  //                       ],
  //                       function (err, data) {
  //                         if (err) {
  //                           res.send({
  //                             code: "401",
  //                             message: "添加评论失败",
  //                           });
  //                           throw err;
  //                         } else {
  //                           db.query(
  //                             "select * from commentlist",
  //                             function (err, data) {
  //                               if (err) {
  //                                 throw err;
  //                               } else if (data.length > 0) {
  //                                 res.send({
  //                                   data,
  //                                   code: "200",
  //                                   message: "添加评论成功，并重新获取数据",
  //                                 });
  //                               } else {
  //                                 res.send({
  //                                   code: "401",
  //                                   message: "重新获取数据失败",
  //                                 });
  //                               }
  //                             }
  //                           );
  //                         }
  //                       }
  //                     );
  //                   } else {
  //                     res.send({
  //                       code: "401",
  //                       message: "湛江美食获取失败",
  //                     });
  //                   }
  //                 }
  //               );
  //               break;
  //             case "3":
  //               db.query(
  //                 "select * from lianjianfoodlist ",
  //                 function (err, data) {
  //                   if (err) {
  //                     throw err;
  //                   } else if (data.length > 0) {
  //                     data.map((item) => {
  //                       if (item.name == name) {
  //                         pictureurl = item.picture;
  //                       }
  //                     });
  //                     db.query(
  //                       "insert into commentlist value (?,?,?,?,?,?,?,?,?,?)",
  //                       [
  //                         0,
  //                         userId,
  //                         name,
  //                         pictureurl,
  //                         comment,
  //                         nickname,
  //                         headerurl,
  //                         0,
  //                         0,
  //                         0,
  //                       ],
  //                       function (err, data) {
  //                         if (err) {
  //                           res.send({
  //                             code: "401",
  //                             message: "添加评论失败",
  //                           });
  //                           throw err;
  //                         } else {
  //                           db.query(
  //                             "select * from commentlist",
  //                             function (err, data) {
  //                               if (err) {
  //                                 throw err;
  //                               } else if (data.length > 0) {
  //                                 res.send({
  //                                   data,
  //                                   code: "200",
  //                                   message: "添加评论成功，并重新获取数据",
  //                                 });
  //                               } else {
  //                                 res.send({
  //                                   code: "401",
  //                                   message: "重新获取数据失败",
  //                                 });
  //                               }
  //                             }
  //                           );
  //                         }
  //                       }
  //                     );
  //                   } else {
  //                     res.send({
  //                       code: "401",
  //                       message: "湛江美食获取失败",
  //                     });
  //                   }
  //                 }
  //               );
  //               break;
  //             case "4":
  //               db.query("select * from suixifoodlist ", function (err, data) {
  //                 if (err) {
  //                   throw err;
  //                 } else if (data.length > 0) {
  //                   data.map((item) => {
  //                     if (item.name == name) {
  //                       pictureurl = item.picture;
  //                     }
  //                   });
  //                   db.query(
  //                     "insert into commentlist value (?,?,?,?,?,?,?,?,?,?)",
  //                     [
  //                       0,
  //                       userId,
  //                       name,
  //                       pictureurl,
  //                       comment,
  //                       nickname,
  //                       headerurl,
  //                       0,
  //                       0,
  //                       0,
  //                     ],
  //                     function (err, data) {
  //                       if (err) {
  //                         res.send({
  //                           code: "401",
  //                           message: "添加评论失败",
  //                         });
  //                         throw err;
  //                       } else {
  //                         db.query(
  //                           "select * from commentlist",
  //                           function (err, data) {
  //                             if (err) {
  //                               throw err;
  //                             } else if (data.length > 0) {
  //                               res.send({
  //                                 data,
  //                                 code: "200",
  //                                 message: "添加评论成功，并重新获取数据",
  //                               });
  //                             } else {
  //                               res.send({
  //                                 code: "401",
  //                                 message: "重新获取数据失败",
  //                               });
  //                             }
  //                           }
  //                         );
  //                       }
  //                     }
  //                   );
  //                 } else {
  //                   res.send({
  //                     code: "401",
  //                     message: "湛江美食获取失败",
  //                   });
  //                 }
  //               });

  //               break;
  //             case "5":
  //               db.query(
  //                 "select * from wuchuanfoodlist ",
  //                 function (err, data) {
  //                   if (err) {
  //                     throw err;
  //                   } else if (data.length > 0) {
  //                     data.map((item) => {
  //                       if (item.name == name) {
  //                         pictureurl = item.picture;
  //                       }
  //                     });
  //                     db.query(
  //                       "insert into commentlist value (?,?,?,?,?,?,?,?,?,?)",
  //                       [
  //                         0,
  //                         userId,
  //                         name,
  //                         pictureurl,
  //                         comment,
  //                         nickname,
  //                         headerurl,
  //                         0,
  //                         0,
  //                         0,
  //                       ],
  //                       function (err, data) {
  //                         if (err) {
  //                           res.send({
  //                             code: "401",
  //                             message: "添加评论失败",
  //                           });
  //                           throw err;
  //                         } else {
  //                           db.query(
  //                             "select * from commentlist",
  //                             function (err, data) {
  //                               if (err) {
  //                                 throw err;
  //                               } else if (data.length > 0) {
  //                                 res.send({
  //                                   data,
  //                                   code: "200",
  //                                   message: "添加评论成功，并重新获取数据",
  //                                 });
  //                               } else {
  //                                 res.send({
  //                                   code: "401",
  //                                   message: "重新获取数据失败",
  //                                 });
  //                               }
  //                             }
  //                           );
  //                         }
  //                       }
  //                     );
  //                   } else {
  //                     res.send({
  //                       code: "401",
  //                       message: "湛江美食获取失败",
  //                     });
  //                   }
  //                 }
  //               );

  //               break;
  //           }
  //           break;
  //         case "3":
  //           switch (areaId) {
  //             case "1":
  //               db.query(
  //                 "select * from zhanjianhotellist ",
  //                 function (err, data) {
  //                   if (err) {
  //                     throw err;
  //                   } else if (data.length > 0) {
  //                     data.map((item) => {
  //                       if (item.name == name) {
  //                         pictureurl = item.picture;
  //                       }
  //                     });
  //                     db.query(
  //                       "insert into commentlist value (?,?,?,?,?,?,?,?,?,?)",
  //                       [
  //                         0,
  //                         userId,
  //                         name,
  //                         pictureurl,
  //                         comment,
  //                         nickname,
  //                         headerurl,
  //                         0,
  //                         0,
  //                         0,
  //                       ],
  //                       function (err, data) {
  //                         if (err) {
  //                           res.send({
  //                             code: "401",
  //                             message: "添加评论失败",
  //                           });
  //                           throw err;
  //                         } else {
  //                           db.query(
  //                             "select * from commentlist",
  //                             function (err, data) {
  //                               if (err) {
  //                                 throw err;
  //                               } else if (data.length > 0) {
  //                                 res.send({
  //                                   data,
  //                                   code: "200",
  //                                   message: "添加评论成功，并重新获取数据",
  //                                 });
  //                               } else {
  //                                 res.send({
  //                                   code: "401",
  //                                   message: "重新获取数据失败",
  //                                 });
  //                               }
  //                             }
  //                           );
  //                         }
  //                       }
  //                     );
  //                   } else {
  //                     res.send({
  //                       code: "401",
  //                       message: "获取失败",
  //                     });
  //                   }
  //                 }
  //               );
  //               break;
  //             case "2":
  //               db.query(
  //                 "select * from leizhouhotellist ",
  //                 function (err, data) {
  //                   if (err) {
  //                     throw err;
  //                   } else if (data.length > 0) {
  //                     data.map((item) => {
  //                       if (item.name == name) {
  //                         pictureurl = item.picture;
  //                       }
  //                     });
  //                     db.query(
  //                       "insert into commentlist value (?,?,?,?,?,?,?,?,?,?)",
  //                       [
  //                         0,
  //                         userId,
  //                         name,
  //                         pictureurl,
  //                         comment,
  //                         nickname,
  //                         headerurl,
  //                         0,
  //                         0,
  //                         0,
  //                       ],
  //                       function (err, data) {
  //                         if (err) {
  //                           res.send({
  //                             code: "401",
  //                             message: "添加评论失败",
  //                           });
  //                           throw err;
  //                         } else {
  //                           db.query(
  //                             "select * from commentlist",
  //                             function (err, data) {
  //                               if (err) {
  //                                 throw err;
  //                               } else if (data.length > 0) {
  //                                 res.send({
  //                                   data,
  //                                   code: "200",
  //                                   message: "添加评论成功，并重新获取数据",
  //                                 });
  //                               } else {
  //                                 res.send({
  //                                   code: "401",
  //                                   message: "重新获取数据失败",
  //                                 });
  //                               }
  //                             }
  //                           );
  //                         }
  //                       }
  //                     );
  //                   } else {
  //                     res.send({
  //                       code: "401",
  //                       message: "酒店获取失败",
  //                     });
  //                   }
  //                 }
  //               );

  //               break;
  //             case "3":
  //               db.query(
  //                 "select * from lianjianhotellist ",
  //                 function (err, data) {
  //                   if (err) {
  //                     throw err;
  //                   } else if (data.length > 0) {
  //                     data.map((item) => {
  //                       if (item.name == name) {
  //                         pictureurl = item.picture;
  //                       }
  //                     });
  //                     db.query(
  //                       "insert into commentlist value (?,?,?,?,?,?,?,?,?,?)",
  //                       [
  //                         0,
  //                         userId,
  //                         name,
  //                         pictureurl,
  //                         comment,
  //                         nickname,
  //                         headerurl,
  //                         0,
  //                         0,
  //                         0,
  //                       ],
  //                       function (err, data) {
  //                         if (err) {
  //                           res.send({
  //                             code: "401",
  //                             message: "添加评论失败",
  //                           });
  //                           throw err;
  //                         } else {
  //                           db.query(
  //                             "select * from commentlist",
  //                             function (err, data) {
  //                               if (err) {
  //                                 throw err;
  //                               } else if (data.length > 0) {
  //                                 res.send({
  //                                   data,
  //                                   code: "200",
  //                                   message: "添加评论成功，并重新获取数据",
  //                                 });
  //                               } else {
  //                                 res.send({
  //                                   code: "401",
  //                                   message: "重新获取数据失败",
  //                                 });
  //                               }
  //                             }
  //                           );
  //                         }
  //                       }
  //                     );
  //                   } else {
  //                     res.send({
  //                       code: "401",
  //                       message: "酒店获取失败",
  //                     });
  //                   }
  //                 }
  //               );
  //               break;
  //             case "4":
  //               db.query("select * from suixihotellist ", function (err, data) {
  //                 if (err) {
  //                   throw err;
  //                 } else if (data.length > 0) {
  //                   data.map((item) => {
  //                     if (item.name == name) {
  //                       pictureurl = item.picture;
  //                     }
  //                   });
  //                   db.query(
  //                     "insert into commentlist value (?,?,?,?,?,?,?,?,?,?)",
  //                     [
  //                       0,
  //                       userId,
  //                       name,
  //                       pictureurl,
  //                       comment,
  //                       nickname,
  //                       headerurl,
  //                       0,
  //                       0,
  //                       0,
  //                     ],
  //                     function (err, data) {
  //                       if (err) {
  //                         res.send({
  //                           code: "401",
  //                           message: "添加评论失败",
  //                         });
  //                         throw err;
  //                       } else {
  //                         db.query(
  //                           "select * from commentlist",
  //                           function (err, data) {
  //                             if (err) {
  //                               throw err;
  //                             } else if (data.length > 0) {
  //                               res.send({
  //                                 data,
  //                                 code: "200",
  //                                 message: "添加评论成功，并重新获取数据",
  //                               });
  //                             } else {
  //                               res.send({
  //                                 code: "401",
  //                                 message: "重新获取数据失败",
  //                               });
  //                             }
  //                           }
  //                         );
  //                       }
  //                     }
  //                   );
  //                 } else {
  //                   res.send({
  //                     code: "401",
  //                     message: "酒店获取失败",
  //                   });
  //                 }
  //               });

  //               break;
  //             case "5":
  //               db.query(
  //                 "select * from wuchuanhotellist ",
  //                 function (err, data) {
  //                   if (err) {
  //                     throw err;
  //                   } else if (data.length > 0) {
  //                     data.map((item) => {
  //                       if (item.name == name) {
  //                         pictureurl = item.picture;
  //                       }
  //                     });
  //                     db.query(
  //                       "insert into commentlist value (?,?,?,?,?,?,?,?,?,?)",
  //                       [
  //                         0,
  //                         userId,
  //                         name,
  //                         pictureurl,
  //                         comment,
  //                         nickname,
  //                         headerurl,
  //                         0,
  //                         0,
  //                         0,
  //                       ],
  //                       function (err, data) {
  //                         if (err) {
  //                           res.send({
  //                             code: "401",
  //                             message: "添加评论失败",
  //                           });
  //                           throw err;
  //                         } else {
  //                           db.query(
  //                             "select * from commentlist",
  //                             function (err, data) {
  //                               if (err) {
  //                                 throw err;
  //                               } else if (data.length > 0) {
  //                                 res.send({
  //                                   data,
  //                                   code: "200",
  //                                   message: "添加评论成功，并重新获取数据",
  //                                 });
  //                               } else {
  //                                 res.send({
  //                                   code: "401",
  //                                   message: "重新获取数据失败",
  //                                 });
  //                               }
  //                             }
  //                           );
  //                         }
  //                       }
  //                     );
  //                   } else {
  //                     res.send({
  //                       code: "401",
  //                       message: "湛江酒店获取失败",
  //                     });
  //                   }
  //                 }
  //               );
  //               break;
  //           }
  //           break;
  //       }
  //     } else {
  //       res.send({
  //         code: "401",
  //         message: "当前用户不存在",
  //       });
  //     }
  //   }
  // );
});
module.exports = router;
