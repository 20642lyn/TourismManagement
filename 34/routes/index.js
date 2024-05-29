var express = require("express");
var router = express.Router();
var db = require("../sql.js");
const crypto = require('crypto');
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index");
});

router.post("/main", function (req, res, next) {
  //获取到用户输入的内容
  var val = req.body;
  var userName = val.userName;

  // var userPwd = val.userPwd;
  const userPwd = crypto.createHash('md5').update(val.userPwd).digest('hex');
  //查询数据
  db.query(
    "select * from adminuserinfo where username = ? and password = ?",
    [userName, userPwd],
    function (err, data) {
      if (err) {
        throw err;
      } else if (data.length > 0) {
        res.render("main");
      } else {
        res.write('<head><meta charset="utf-8"/></head>');
        res.end("用户名或密码有误~!");
      }
    }
  );
});

module.exports = router;
