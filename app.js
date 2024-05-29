var createError = require("http-errors");
var axios = require('axios');
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
//后台接口
var indexRouter = require("./routes/index");
var left = require("./routes/left");
var right = require("./routes/right");
var bannerList = require("./routes/bannerList");
var add = require("./routes/add");
var like = require("./routes/like");
var del = require("./routes/del");
var update = require("./routes/update");
var hotList = require("./routes/hotlist");
var adminCommonUser = require("./routes/admincommonuser");
var adminBackgroundUser = require("./routes/adminbackgrounduser");
var viewDataList = require("./routes/viewdatalist");
var foodDataList = require("./routes/fooddatalist");
var hotelDataList = require("./routes/hoteldatalist");
const cors = require("cors");

//前端数据接口
var frontUserInfo = require("./routes/Web/index");
var allbannerlist = require("./routes/Web/allbannerlist");
var homelist = require("./routes/Web/Home/homelist");
var category = require("./routes/Web/Category/category");
var comment = require("./routes/Web/Comment/comment");
var Detail = require("./routes/Web/Detail/detail");
var Search = require("./routes/Web/Search/search");
//配置cors策略
var app = express();
app.use(cors());
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

/**
 * 后台
 */

//首页
app.use("/admin", indexRouter);
//左侧
app.use("/left", left);
//右侧
app.use("/right", right);
//banner图
app.use("/bannerList", bannerList);
//上传banner图
app.use("/add", add);
//搜索功能
app.use("/like", like);
//删除功能
app.use("/del", del);
//修改功能
app.use("/update", update);
//热门推荐数据
app.use("/hotlist", hotList);
//管理普通用户
app.use("/admincommonuser", adminCommonUser);
//管理普通用户
app.use("/adminbackgrounduser", adminBackgroundUser);
//景点列表数据
app.use("/viewdatalist", viewDataList);
//美食列表数据
app.use("/fooddatalist", foodDataList);
//酒店列表数据
app.use("/hoteldatalist", hotelDataList);
/**
 * 前端
 *
 */

//登录功能
app.use("/frontuserinfo", frontUserInfo);
//获取轮播图
app.use("/allbannerlist", allbannerlist);
//获取首页数据
app.use("/homelist", homelist);
//获取分类页数据
app.use("/category", category);
//获取和添加评论数据
app.use("/comment", comment);
//获取详情数据
app.use("/detail", Detail);
//获取搜索数据
app.use("/search", Search);

/**
 * 对异常进行处理
 */
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// 全局定时刷新热门推荐数据(时间为12小时)
global.timer = setInterval(() => {
  const url = 'http://localhost:3000/update/autohotlist';
  axios.get(url)
}, 43200000);
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error pageS
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
