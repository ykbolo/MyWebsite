# 浅谈 vue+node 实现前后端分离

## 关键词：node，vue，跨域，axios，express

### 时间：**2020.03.29**

#### 背景

vue-cli 工具是非常好用的一款搭建前端服务的工具，因为可以很方便的配置 webpack，以及利用其热重载的特性。

由于需要做一款搜索引擎，因此肯定需要一套前端以及接口，作为搜索引擎成果的最后一部分，但是为了方便请求和接口的维护和调试，我需要进行前后端的调试，就会遇到跨域问题，下面讲讲我是如何搭建一个前后端分离的服务的。

设计一款好的架构，不仅是对编程的强化，也是对设计理念的训练。

#### 初窥项目结构

简要的讲一下项目结构，只备注主要部分

![avatar](../../../mds/tech/9/3.jpg)

#### 初始化工程

利用 vue-cli 工具快速 init 出一个 vue 项目

![avatar](../../../mds/tech/9/1.jpg)

#### 快速的写出前端代码

实现如下效果

![avatar](../../../mds/tech/9/2.jpg)

#### 封装前端 axios 请求

关于 axios 的 api 可以根据查阅 https://www.kancloud.cn/yunye/axios/234845

#### 前端---vue.config.js 配置代理，代理到后端 3000 端口

```

......
devServer: {
    disableHostCheck: false,
    host: "localhost",
    port: 8080,
    https: false,
    hotOnly: false,
    proxy: {
      "/api": {
        target: "http://localhost:3000", // 要访问的接口域名
        ws: true, // 是否启用websockets
        changeOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        pathRewrite: {
          "^/api": "" //这里理解成用'/api'代替target里面的地址,比如我要调用'http://localhost:3000/user/add'，直接写'/api/user/add'即可
        }
      }
    }

  },
......

```

#### 前端---/src/core/client/request.js 封装一个 axios 请求对象,只配置了一个 baseUrl

```

import axios from 'axios'

let createRequest = function () {
  const Request = axios.create({
    baseURL: '/api' // 根据vue.config-pathRewrite的配置，'/api'相当于http://localhost:3000
  })
  return Request
}
export default createRequest

```

#### 前端---/service/service 用于分发各种前端业务代码,以调用后台的/service/test 为例

```

import createRequest from '../core/client/request'

const request = createRequest()


const getSearchResult = (keywords) => {
  return request.post('/service/test', { keywords })
}
export default {
  getSearchResult
}

```

#### 后端---/src/server.js 用于启动后端服务，3000 端口，借助 express

```

const express = require('express');
const app = express();
const service = require("./es.js")
// body解析
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

// 处理文件路径的模块
const path = require('path');

// view处理 配置ejs模板文件存放路径
app.set('views', path.join(__dirname, 'views'));
// 为express服务器，设置模板引擎类型
app.set('view engine', 'ejs');

// 静态文件处理，定义并创建一个目录存放静态文件
app.use(express.static('src'));


// 接口路由处理
app.use('/service', service)

const port = 3000
app.listen(port, function () {
  console.log('启动成功,路径：' + '127.0.0.1:' + port)
})

```

#### 后端---/src/es 业务代码，用于调用 es 服务

```

var app = require("express").Router()
const bodyParser = require('body-parser')
// json请求
app.use(bodyParser.json())
// 表单请求
app.use(bodyParser.urlencoded({ extended: false }))
const { Client } = require('@elastic/elasticsearch')
var fs = require("fs");
/

app.post('/test', function (req, res) {
  console.log(req)
  ...业务代码
  res.json({
    list: ['1', '2', '3']
  })
})

module.exports = app

```

#### 启动脚本配置

```
"scripts": {
    "serve": "cross-env NODE_ENV=dev vue-cli-service serve --buildconfig.js",//dev前端
    "service": "cross-env NODE_ENV=dev node ./src/server.js",//后端启动
    "build:dev": "cross-env NODE_ENV=dev vue-cli-service build --buildconfig.js",//dev前端build
    "build:prod": "cross-env NODE_ENV=prod vue-cli-service build --buildconfig.js",//prod前端build
    "lint": "vue-cli-service lint",//lint修复
    "start:dev": "cross-env NODE_ENV=dev node ./src/start.js",//前端打包启动脚本dev
    "start:prod": "cross-env NODE_ENV=prod forever start ./src/start.js"//前端打包启动脚本prod
  },
```

感兴趣的可去我的 github 仓库查看、下载源码，未来将持续更新。

https://github.com/ykbolo/searchEngine
