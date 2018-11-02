---
layout: post
title: "用nodejs和js分别生成二维码"
date: 2018-11-02
excerpt: "用jsvascript在前端生成二维码，或者用node.js在后端生成二维码"
tags: [javascript, node, 二维码, QR Code]
comments: true
---
## JavaScript在前端生成二维码
QRCode.js 是一个用于生成二维码的 JavaScript 库。主要是通过获取 DOM 的标签,再通过 HTML5 Canvas 绘制而成,不依赖任何库。
* 引入QRCode.js库，github地址：[https://github.com/davidshimjs/qrcodejs](https://github.com/davidshimjs/qrcodejs)
* 使用
  1. 基本用法  
  ~~~
  <div id="qrcode"></div>
  <script type="text/javascript">
  new QRCode(document.getElementById("qrcode"), "http://www.runoob.com");  // 设置要生成二维码的链接
  </script>
  ~~~

  2. 设置可选参数  
  ~~~
  var qrcode = new QRCode("test", {
    text: "http://www.baidu.com",
    width: 128,
    height: 128,
    colorDark : "#000000",
    colorLight : "#ffffff",
    correctLevel : QRCode.CorrectLevel.H
  });
  ~~~

## node.js在后端生成二维码
qrcode是一个可以用node.js生成二维码的模块。此模块同样可用于前端浏览器
官方地址:[https://www.npmjs.com/package/qrcode](https://www.npmjs.com/package/qrcode)

* 安装qrcode  
  ~~~
  npm install qrcode
  ~~~

* 基本用法  
  ~~~
  const fs = require('fs) // 用于文件操作的node.js自带模块
  const QRCode = require('qrcode')
 
  QRCode.toDataURL('http://www.baidu.com', (err, url) => {
    fs.writeFileSync('./qr.html', `<img src = "${url}">`) // 将创建一个qr.html文件，并将生成的二维码图片插入其中
    console.log('wrote to ./qr.html')
  })
  ~~~
执行以上代码,生成qr.html文件，打开可看见生成的二维码

更多设置(如设置颜色、尺寸等)可查看[文档](https://www.npmjs.com/package/qrcode)

参考文档：
[QRCode.js：使用 JavaScript 生成二维码](http://www.runoob.com/w3cnote/javascript-qrcodejs-library.html)  
[Creating and Reading QR Codes with Node.js](http://thecodebarbarian.com/creating-qr-codes-with-node-js.html)

  