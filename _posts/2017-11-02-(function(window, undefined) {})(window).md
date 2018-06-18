---
layout: post
title: "JS中形如(function(window, undefined) {})(window)写法的理解"
date: 2017-11-02
excerpt: ".最早是在看搜狐首页代码时看见的，隐约记得《高程3》里面有说道形如(function(){})()的立即执行函数，再百度之。得到如下解释：首先,(function(window, undefined) {})(window)可以简化看成这样()();而()()就是一个匿名函数自执行的写法"
tags: [ 学习笔记, js, 函数，立即执行函数]
comments: true
---

在Web开发过程中,往往会看到有人这样编写JS脚本:
~~~javascript
(function(window, undefined) {
    //do something
})(window);
~~~
最早是在看搜狐首页代码时看见的，隐约记得《高程3》里面有说道形如(function(){})()的立即执行函数，再百度之。得到如下解释：
首先,(function(window, undefined) {})(window)可以简化看成这样()();而()()就是一个匿名函数自执行的写法.  
举个例子:
~~~javascript
(function() {
    console.log("我是匿名函数,会自动执行奥!");
})();
~~~
当页面加载时,console会自动打印出:我是匿名函数,会自动执行奥!  
那这样写意义何在?

1. 首先匿名函数(function() {})()避免函数体内外变量的冲突(js执行表达式顺序为圆括号里到圆括号外);

2. 后面的圆括号中的window为实参,接受window对象(window对象是全局环境下的),而function后面的圆括号中的window为局部变量,不是全局的window对象.所以这样写可以提高js性能,减少作用域链查询时间.(如果在函数体内多次使用到window对象,那么把window对象当着实参穿进去,是十分必要的;如果函数内部不需要,那么就无需传递该参数.);

3. function后面的形参undefined又有什么用呢?其实在一些老的浏览器中,undefined不被支持,直接使用会导致错误,所以考虑兼容性,就增加一个形参undefined;

4. (function() {})()主要用于存放开发插件的代码,执行其中的代码时DOM不一定存在,所以直接自动执行DOM操作的代码,请放心使用;

**附录:**
~~~javascript
//常见写法
//1. 实参:jQuery,形参:$(避免$与其他库冲突)
(function($) {
    //coding
})(jQuery);

//2.;避免压缩出错
;(function(window, docuemnt, undefined) {
    //coding
})(window, document);
~~~