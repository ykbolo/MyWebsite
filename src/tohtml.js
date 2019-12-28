var express = require('express');
var http = require('http');
var fs = require('fs');
var bodyParser = require('body-parser');
var marked = require('marked');    // 将md转化为html的js包
var app = express();

app.use(express.static('src'));  //加载静态文件

var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get('/getMdFile', urlencodedParser, function (req, res) {

  var data = fs.readFileSync('src/test.md', 'utf-8');    //读取本地的md文件
  res.end(JSON.stringify({
    body: marked(data)
  }));
});

//启动端口监听
var server = app.listen(8088, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log("应用实例，访问地址为 http://%s:%s", host, port)
});