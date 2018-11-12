---
layout: post
title: "nodejs常用模块"
date: 2018-11-12
excerpt: "nodejs常用的一些模块、资料和工具等收集"
tags: [node, nodejs, 模块, 收集]
comments: true
---
### 推荐的入门教程：
《七天学会NodeJS》 [https://github.com/nqdeng/7-days-nodejs](https://github.com/nqdeng/7-days-nodejs)

《Node.js 包教不包会》[https://github.com/alsotang/node-lessons](https://github.com/alsotang/node-lessons)

### 常用内置模块：
**fs** 提供对文件的操作。[http://nodejs.org/api/fs.html](http://nodejs.org/api/stream.html)

**path** 简化路径相关操作，并提升代码可读性。[http://nodejs.org/api/path.html](http://nodejs.org/api/path.html)

**http** 提供两种使用方式：[http://nodejs.org/api/http.html](http://nodejs.org/api/http.html)

  * 作为服务端使用时，创建一个HTTP服务器，监听HTTP客户端请求并返回响应。

  * 作为客户端使用时，发起一个HTTP客户端请求，获取服务端响应。

**https** 与http 模块极为类似，区别在于 https 模块需要额外处理SSL证书。[http://nodejs.org/api/https.html](http://nodejs.org/api/https.html)

**url** 解析URL、生成URL，以及拼接URL。[http://nodejs.org/api/url.html](http://nodejs.org/api/url.html)

**querystring** 用于实现URL参数字符串与参数对象的互相转换。[http://nodejs.org/api/querystring.html](http://nodejs.org/api/querystring.html)

**zlib** 提供了数据压缩和解压的功能。[http://nodejs.org/api/zlib.html](http://nodejs.org/api/zlib.html)

**net** 用于创建Socket服务器或Socket客户端。[http://nodejs.org/api/net.html](http://nodejs.org/api/net.html)


### 推荐使用的框架和包：npm install *** --save

**express** 是 Node.js 应用最广泛的 web 框架，现在是 4.x 版本，它非常薄。跟 Rails 比起来，完全两个极端。  [http://expressjs.com/](http://expressjs.com/)

**utility** 提供了很多常用且比较杂的辅助方法，如 utility.md5()。 [https://github.com/node-modules/utility](https://github.com/node-modules/utility)

**superagent** 是个 http 方面的库，可以发起 get 或 post 请求。[http://visionmedia.github.io/superagent/](http://visionmedia.github.io/superagent/)

**cheerio** 可以理解成一个 Node.js 版的 jquery，用来从网页中以 css selector 取数据，使用方式跟 jquery 一样。[https://github.com/cheeriojs/cheerio](https://github.com/cheeriojs/cheerio)

**eventproxy** 将串行等待变成并行等待，提升多异步协作场景下的执行效率，可用于控制并发数。[https://github.com/JacksonTian/eventproxy](https://github.com/JacksonTian/eventproxy)

**iconv-lite** 转换编码，如GBK转UTF8。[https://github.com/ashtuchkin/iconv-lite](https://github.com/ashtuchkin/iconv-lite)

**async** 流程控制、并发控制。[https://github.com/caolan/async](https://github.com/caolan/async)

 

### 推荐使用的开发包：npm install *** --save-dev 

**supertest** 是专门用来配合 express （准确来说是所有兼容 connect 的 web 框架）进行集成测试的。[https://github.com/tj/supertest](https://github.com/tj/supertest)

**mocha** 测试框架 [http://mochajs.org/](http://mochajs.org/)

**should** 断言库 [https://github.com/tj/should.js](https://github.com/tj/should.js)

**chai** 断言库 [http://chaijs.com/](http://chaijs.com/)

**expect** 断言库 [https://github.com/LearnBoost/expect.js/](https://github.com/LearnBoost/expect.js/)

**istanbul** 测试率覆盖工具 [https://github.com/gotwarlost/istanbul](https://github.com/gotwarlost/istanbul)

**benchmark**  基准测试，可用于测试相同功能函数的执行速度。 [https://github.com/bestiejs/benchmark.js](https://github.com/bestiejs/benchmark.js)

 

### 推荐使用的开发工具：npm install *** -g

**node-dev** 调试时代码改动后自动重启加载服务 [https://github.com/fgnass/node-dev](https://github.com/fgnass/node-dev)

**nodemon** 调试时代码改动后自动重启加载服务 [https://github.com/remy/nodemon](https://github.com/remy/nodemon)