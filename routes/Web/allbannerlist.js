var express = require("express");
var router = express.Router();
var db = require("../../sql");
var url = require("url");
//获取banner数据
router.get("/", function (req, res, next) {
  const reqUrl = req.url;
  const parseUrl = url.parse(reqUrl, true);
  const categoryId = parseUrl.query.id;
  //查询首页banner数据
  db.query(
    "select * from banner where categoryid = ?",
    [categoryId],
    function (err, data) {
      if (err) {
        throw err;
      } else if (data.length > 0) {
        res.send({
          data,
          code: "200",
          message: "成功获取banner数据",
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

module.exports = router;
