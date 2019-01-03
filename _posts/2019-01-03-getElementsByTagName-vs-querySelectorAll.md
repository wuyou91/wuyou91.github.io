---
layout: post
title: "getElementsByTagName()与querySelectorAll()的区别"
date: 2019-01-03
excerpt: "getElementsByTagName()根据节点名称获取Nodelist,querySelectorAll()则时根据css选择器获取Nodelist。前者获取到的是动态Nodelist，后者为静态Nodelist。"
tags: [JavaScript, DOM, 基础, 获取节点, 选择器]
comments: true
---
## [getElementsByTagName()](http://www.runoob.com/jsref/met-document-getelementsbytagname.html)
getElementsByTagName() 方法可返回带有指定标签名的对象的集合。

**提示：** 参数值 "*" 返回文档的所有元素。
同系列的还有:  
[getElementById()](http://www.runoob.com/jsref/met-document-getelementbyid.html)  
[getElementsByClassName()](http://www.runoob.com/jsref/met-document-getelementsbyclassname.html)  
[getElementsByName()](http://www.runoob.com/jsref/met-doc-getelementsbyname.html)

## [querySelectorAll()](http://www.runoob.com/jsref/met-document-queryselectorall.html)
返回文档中匹配指定 CSS 选择器的所有元素，返回 NodeList 对象。  
NodeList 对象表示节点的集合。可以通过索引访问，索引值从 0 开始。  

**提示:** 你可以使用 NodeList 对象的 length 属性来获取匹配选择器的元素属性，然后你可以遍历所有元素，从而获取你想要的信息。
同系列的还有： 
[querySelector()](http://www.runoob.com/jsref/met-document-queryselector.html)

## 动态Nodelist与静态Nodelist
对于动态NodeList，获取到以后，做增加或者删除等改变，这个NodeList也会动态的改变。而静态NodeList则不会动态改变，即在获取时会被“定型”。

## 举例说明
* getElementsByTagName返回的是一个动态NodeList，如下例：
~~~javascript
var divs = document.getElementsByTagName("div"),
    i=0;

while(i < divs.length){
    document.body.appendChild(document.createElement("div"));
    i++;
}
~~~
这将是一个死循环，因为每次循环新增了一个div，divs.length便会跟着动态增加。

* querySelectorAll返回的是一个静态NodeList，如下例：
~~~javascript
var divs = document.querySelectorAll("div"),
    i=0;

while(i < divs.length){
    document.body.appendChild(document.createElement("div"));
    i++;
}
~~~
这个就不是死循环，因为divs在获取时就定下了，往后的新增div不会改变它。

## 本质区别
即使querySelectorAll和getElementsByTagName返回一样的结果，但是他们还是有着本质的区别。  
在动态NodeList里返回的是一个指针，而静态的NodeList返回时当前的node所有信息。

getElementsByTagName创建的过程不需要做任何操作，只需要返回一个指针即可。而querySelectorAll会循环遍历所有的的结果，然后创建一个新的NodeList。所以getElementsByTagName会比querySelectorAll更快。

参考文章：https://humanwhocodes.com/blog/2010/09/28/why-is-getelementsbytagname-faster-that-queryselectorall/