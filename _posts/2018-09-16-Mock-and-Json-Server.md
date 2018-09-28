---
layout: post
title: "利用mock.js和json-server模拟数据"
date: 2018-09-16
excerpt: "用于前后端分离，在后端未给出数据接口前，前端可通过mock数据来进行开发和测试。"
tags: [前后端分离, 模拟数据, mock]
comments: true
---

## 释义
### mock.js
mock.js是一个数据生成器，可以根据不同的配置生成各种数据，包括字符，随机数，新闻，图片等等。
官方文档：[https://github.com/nuysoft/Mock/wiki](https://github.com/nuysoft/Mock/wiki)

通过阅读 mockjs 的官方文档可以发现，它其实是作为一个独立的 mock server 存在的，就算没有json server，一样可以反馈数据，但其有以下一些缺点：
* 不能跨域使用
* 与某些框架中的路由处理逻辑冲突
* 无法定义复杂的数据结构，比如下面的数据结构，images 将会是字符串 [object object]， 而非预想中的数组：
~~~
Mock.mock({
    "list|1-10": [
      "id|+1": 1,
      "images": [1,2,3]
    ] 
  })
~~~
* 无法自定义较为复杂的路由

### json-server
json-server是一个Node模块,可以将json文件作为api的数据源,从而快速搭建本地接口。它支持post,get,put,patch,delete等方法。
github地址：[https://github.com/typicode/json-server](https://github.com/typicode/json-server)

**将mock.js和json-server结合使用，就可以实现在本地模拟数据。即用mock.js生成数据，然后通过json-server创建接口以供访问**

## 具体步骤
### 运行json-server
首先需要安装node(这不是废话吗？)
~~~
npm install json-server -g //全局安装json-server,以便可以通过npm run xx 启动服务
~~~
然后可以通过npm init初始化一个项目，生成package.json文件。
在项目根目录下新建mock文件夹，作为json-server的根目录，里面用来存放mock数据。
在mock文件夹下创建一个json文件，如test.json,里面随便写点数据，如：
~~~
{
  "posts": [
    { "id": 1, "title": "json-server", "author": "typicode" }
  ],
  "comments": [
    { "id": 1, "body": "some comment", "postId": 1 }
  ],
  "profile": { "name": "typicode" }
}
~~~
![img](http://pfrbzthj8.bkt.clouddn.com/mock-and-json-server_01.JPG)
然后在packge.json的scripts里配置一个的npm命令：
> "mock": "json-server --watch mock/test.json -p 8085"

-p用来设置端口

然后再项目根目录运行*npm run mock*即可启动json-server,看到终端有如下输出，表示成功了：
![img](http://pfrbzthj8.bkt.clouddn.com/mock-and-json-server_02.JPG)

在浏览器输入  
  http://localhost:8085/posts  
  http://localhost:8085/comments  
  http://localhost:8085/profile  
即可查看相应数据，如：  
![img](http://pfrbzthj8.bkt.clouddn.com/mock-and-json-server_03.JPG)

### 将json文件替换成js文件
新建一个api.js文件，内容如下：
~~~
module.exports = function() {
    var test = require('./test.json'); // 数据引入外部json，利于数据独立管理。
    return {    
        test 
    }
}
~~~

再将package.json里json-server的启动命令换成  
>"mock": "json-server --watch mock/api.js -p 8085"  

运行*npm run mock*,在浏览器输入http://localhost:8085/test,即可得到test.json里的数据。  

return出的是一个对象,可以是多个数据。如
~~~
module.exports = function() {
    var test1 = [a,b,c];
    return{
        test1, 
        test2:[1,2,3]
    }
}
~~~
则可通过localhost:8085/test1，以及localhost:8085/test2获得相应数据

### mock.js出场
既然可以将js返回的数据作为接口数据，那么就可以利用mock.js自动生成数据，然后再返回成为接口数据。

首先安装mock.js
在/mock目录下安装
~~~
npm install mockjs
~~~

然后在api.js中引入mockjs,就可以愉快的生成各种数据并返回了。

~~~
// 用mockjs模拟生成数据
var Mock = require('mockjs');

module.exports = () => {
  // 使用 Mock
  var data = Mock.mock({
    'course|227': [
      {
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        'id|+1': 1000,
        course_name: '@ctitle(5,10)',
        autor: '@cname',
        college: '@ctitle(6)',
        'category_Id|1-6': 1
      }
    ],
    'course_category|6': [
      {
        "id|+1": 1,
        "pid": -1,
        cName: '@ctitle(4)'
      }
    ]
  });
  // 返回的data会作为json-server的数据
  return data;
};
~~~
至此，mock.js搭配json-server已经可以实现一些基本的接口数据请求了。

## 以下是进阶内容。

### json-server 的相关启动参数
* 语法：json-server [options] <source>
* 选项列表：

|参数|简写|默认值|说明|
|----|----|----|----|
|--config|-c|[默认值: "json-server.json"]|指定配置文件|
|--port|-p|设置端口|[默认值: 3000]|Number|
|--host|-H|设置域|[默认值: "0.0.0.0"]|String|
|--watch|-w|Watch file(s)|是否监听|
|--routes|-r|指定自定义路由||
|--middlewares|-m|指定中间件 files|[数组]|
|--static|-s|Set static files directory|静态目录,类比：express的静态目录|
|--readonly|--ro|Allow only GET requests|[布尔]|
|--nocors|--nc|Disable Cross-Origin Resource Sharing|[布尔]|
|--nogzip|--ng|Disable GZIP Content-Encoding|[布尔]|
|--snapshots|-S|Set snapshots directory [默认值: "."]| |
|--delay|-d|Add delay to responses (ms)| |
|--id|-i|Set database id property (e.g. _id) [默认值: "id"]| |
|--foreignKeySuffix|--fks|Set foreign key suffix (e.g. _id as in post_id)|[默认值: "Id"]|
|--help|-h|显示帮助信息|[布尔]|
|--version|-v|显示版本号|[布尔]|

* source可以是json文件或者js文件。实例：
~~~
json-server --watch -c ./jsonserver.json
json-server --watch app.js
json-server db.json
json-server --watch -port 8888 db.json
~~~

### 路由
**默认的路由**
json-server为提供了GET,POST, PUT, PATCH ,DELETE等请求的API,分别对应数据中的所有类型的实体。
~~~
# 获取所有的课程信息
GET    /course

# 获取id=1001的课程信息
GET    /course/1001

# 添加课程信息，请求body中必须包含course的属性数据，json-server自动保存。
POST   /course

# 修改课程，请求body中必须包含course的属性数据
PUT    /course/1
PATCH  /course/1

# 删除课程信息
DELETE /course/1

# 获取具体课程信息id=1001
GET    /course/1001
~~~
**自定义路由**
当然你可以自定义路由：
~~~
json-server --watch --routes route.json db.json
~~~
route.json文件
~~~
{
  "/api/*": "/$1",    //   /api/course   <==>  /course
  "/:resource/:id/show": "/:resource/:id",
  "/posts/:category": "/posts?category=:category",
  "/articles\\?id=:id": "/posts/:id"
}
~~~

###
自定义配置文件
通过命令行配置路由、数据文件、监控等会让命令变的很长，而且容易敲错，可以把命令写到npm的scripts中，但是依然配置不方便。

json-server允许我们把所有的配置放到一个配置文件中，这个配置文件默认json-server.json;

例如:
~~~
{
  "port": 53000,
  "watch": true,
  "static": "./public",
  "read-only": false,
  "no-cors": false,
  "no-gzip": false,
  "routes": "route.json"
}
~~~
使用配置文件启动json-server:
~~~
# 默认使用：json-server.json配置文件
$ json-server --watch app.js  

# 指定配置文件
$ json-server --watch -c jserver.json db.json
~~~

### 过滤查询
查询数据，可以额外提供
~~~
GET /posts?title=json-server&author=typicode
GET /posts?id=1&id=2

# 可以用 . 访问更深层的属性。
GET /comments?author.name=typicode
~~~
还可以使用一些判断条件作为过滤查询的辅助。
~~~
GET /posts?views_gte=10&views_lte=20
~~~

可以用的拼接条件为：
* _gte : 大于等于
* _lte : 小于等于
* _ne : 不等于
* _like : 包含
~~~
GET /posts?id_ne=1
GET /posts?id_lte=100
GET /posts?title_like=server
~~~

### 分页查询
默认后台处理分页参数为： _page 第几页， _limit一页多少条。
~~~
GET /posts?_page=7
GET /posts?_page=7&_limit=20
~~~
> 默认一页10条。

后台会返回总条数，总条数的数据在响应头:X-Total-Count中。

### 排序
* 参数： _sort设定排序的字段
* 参数： _order设定排序的方式（默认升序）
~~~
GET /posts?_sort=views&_order=asc
GET /posts/1/comments?_sort=votes&_order=asc
~~~
支持多个字段排序：
~~~
GET /posts?_sort=user,views&_order=desc,asc
~~~

### 任意切片数据
~~~
GET /posts?_start=20&_end=30
GET /posts/1/comments?_start=20&_end=30
GET /posts/1/comments?_start=20&_limit=10
~~~

### 全文检索
可以通过q参数进行全文检索，例如：GET /posts?q=internet

### 实体关联
**关联子实体**
包含children的对象, 添加_embed
~~~
GET /posts?_embed=comments
GET /posts/1?_embed=comments
~~~

**关联父实体**
包含 parent 的对象, 添加_expand
~~~
GET /comments?_expand=post
GET /comments/1?_expand=post
~~~

### 其他高级用法
json-server本身就是依赖express开发而来，可以进行深度定制。细节就不展开，具体详情请参考[官网](https://github.com/typicode/json-server)。
* 自定义路由
~~~
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)

server.get('/echo', (req, res) => {
  res.jsonp(req.query)
})

server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now()
  }
  next()
})

server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})
~~~

* 自定义输出内容
~~~
router.render = (req, res) => {
  res.jsonp({
    body: res.locals.data
  })
}
~~~

* 自定义用户校验
~~~
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use((req, res, next) => {
 if (isAuthorized(req)) { // add your authorization logic here
   next() // continue to JSON Server router
 } else {
   res.sendStatus(401)
 }
})
server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})
~~~

*参考文章:*  
[前端虚拟接口---mock的用法](https://blog.csdn.net/zula1994/article/details/76889393)  
[json-server 和mock.js生成大量json数据](http://www.cnblogs.com/yycc11/p/9167849.html)  
[json-server 详解](https://www.cnblogs.com/fly_dragon/p/9150732.html)
