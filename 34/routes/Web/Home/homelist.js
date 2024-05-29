var express = require("express");
var router = express.Router();
var db = require("../../../sql");
var url = require("url");
//获取热门推荐数据
router.get("/homehotlist", function (req, res, next) {
  //查询数据
  db.query("select * from hotlist", function (err, data) {
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
        message: "获取失败",
      });
    }
  });
});
//按id查询美食数据
router.get("/homefoodlist", function (req, res, next) {
  const reqUrl = req.url;
  const parseUrl = url.parse(reqUrl, true);
  const areaId = parseUrl.query.id;
  // 小图
  switch (areaId) {
    case "1":
      db.query("select * from zhanjianfoodlist limit 8", function (err, data) {
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
    case "2":
      db.query("select * from leizhoufoodlist limit 8", function (err, data) {
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
            message: "雷州美食获取失败",
          });
        }
      });
      break;
    case "3":
      db.query("select * from lianjianfoodlist limit 8", function (err, data) {
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
            message: "廉江美食获取失败",
          });
        }
      });
      break;
    case "4":
      db.query("select * from suixifoodlist limit 8", function (err, data) {
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
            message: "遂溪美食获取失败",
          });
        }
      });
      break;
    case "5":
      db.query("select * from wuchuanfoodlist limit 8", function (err, data) {
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
            message: "吴川美食获取失败",
          });
        }
      });
      break;
  }

  //大图
  // const bigpicturefoodlist =db.query(
  //   "select * from foodlist where areaid=?",
  //   [areaid],
  //   function (err, data) {
  //     if (err) {
  //       throw err;
  //     } else if (data.length > 0) {
  //       return data
  //     } else {
  //       res.send({
  //         code: "401",
  //         message: "获取失败",
  //       });
  //     }
  //   }
  // );
});
//按id查询美景数据
router.get("/homeviewlist", function (req, res, next) {
  const reqUrl = req.url;
  const parseUrl = url.parse(reqUrl, true);
  const areaId = parseUrl.query.id;
  // 小图
  switch (areaId) {
    case "1":
      db.query("select * from zhanjianviewlist limit 8", function (err, data) {
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
    case "2":
      db.query("select * from leizhouviewlist limit 8", function (err, data) {
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
            message: "雷州美景获取失败",
          });
        }
      });
      break;
    case "3":
      db.query("select * from lianjianviewlist limit 8", function (err, data) {
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
            message: "廉江美景获取失败",
          });
        }
      });
      break;
    case "4":
      db.query("select * from suixiviewlist limit 8", function (err, data) {
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
            message: "遂溪美景获取失败",
          });
        }
      });
      break;
    case "5":
      db.query("select * from wuchuanviewlist limit 8", function (err, data) {
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
            message: "吴川美景获取失败",
          });
        }
      });
      break;
  }

  //大图
  // const bigpicturefoodlist =db.query(
  //   "select * from foodlist where areaid=?",
  //   [areaid],
  //   function (err, data) {
  //     if (err) {
  //       throw err;
  //     } else if (data.length > 0) {
  //       return data
  //     } else {
  //       res.send({
  //         code: "401",
  //         message: "获取失败",
  //       });
  //     }
  //   }
  // );
  
});
//按id查询酒店数据
router.get("/homehotellist", function (req, res, next) {
  const reqUrl = req.url;
  const parseUrl = url.parse(reqUrl, true);
  const areaId = parseUrl.query.id;
  // 小图
  switch (areaId) {
    case "1":
      db.query("select * from zhanjianhotellist limit 8", function (err, data) {
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
    case "2":
      db.query("select * from leizhouhotellist limit 8", function (err, data) {
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
            message: "雷州酒店获取失败",
          });
        }
      });
      break;
    case "3":
      db.query("select * from lianjianhotellist limit 8", function (err, data) {
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
            message: "廉江酒店获取失败",
          });
        }
      });
      break;
    case "4":
      db.query("select * from suixihotellist limit 8", function (err, data) {
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
            message: "遂溪酒店获取失败",
          });
        }
      });
      break;
    case "5":
      db.query("select * from wuchuanhotellist limit 8", function (err, data) {
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
            message: "吴川酒店获取失败",
          });
        }
      });
      break;
  }

  //大图
  // const bigpicturefoodlist =db.query(
  //   "select * from foodlist where areaid=?",
  //   [areaid],
  //   function (err, data) {
  //     if (err) {
  //       throw err;
  //     } else if (data.length > 0) {
  //       return data
  //     } else {
  //       res.send({
  //         code: "401",
  //         message: "获取失败",
  //       });
  //     }
  //   }
  // );
  
});

module.exports = router;
