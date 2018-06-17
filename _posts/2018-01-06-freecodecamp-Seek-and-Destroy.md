---
layout: post
title: Freecodecamp练习Seek and Destroy
date: 2018-01-06
excerpt: "实现一个摧毁(destroyer)函数，第一个参数是待摧毁的数组，其余的参数是待摧毁的值。当你完成不了挑战的时候，记得开大招'Read-Search-Ask'。"
tags:[freecodecamp, 学习笔记, js, 数组]
comments: true
---

## 摧毁数组
金克斯的迫击炮！
实现一个摧毁(destroyer)函数，第一个参数是待摧毁的数组，其余的参数是待摧毁的值。
当你完成不了挑战的时候，记得开大招'Read-Search-Ask'。

#### 这是一些对你有帮助的资源:

* [Arguments object](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/arguments)
* [Array.filter()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)

destroyer([1, 2, 3, 1, 2, 3], 2, 3) 应该返回 [1, 1].
destroyer([1, 2, 3, 5, 1, 2, 3], 2, 3) 应该返回 [1, 5, 1].
destroyer([3, 5, 1, 2, 2], 2, 3, 5) 应该返回 [1].
destroyer([2, 3, 2, 3], 2, 3) 应该返回 [].
destroyer(["tree", "hamburger", 53], "tree", 53) 应该返回 ["hamburger"].

### 思路：

摧毁函数destroyer（arr,argument1,argument2,argument3,...)
函数参数不确定，第一个参数为一个数组，其他参数为要摧毁的数。即目标输出的数组应该是第一个参数数组删除其他参数后的数组。
将从第二个参数开始的参数组成一个数组。然后用fitter()来将数组内的每个数和心数组进行比对，返回不符合的。

代码如下：
~~~javascript
function destroyer(arr) {
var argumentsArr=[];//定义一个空数组，用来装其他参数组成的新数组。

//从第二个（i=1）开始遍历参数，并将其push到argumentsArr数组内
for(var i=1;i<arguments.length;i++)
      {
      argumentsArr.push(arguments[i]);
      }

//用filterfat返回indexOf()==-1（即不在argumentsArr数组内的元素）的数
arr=arr.filter(function(a){return argumentsArr.indexOf(a)==-1;});
return arr;
}
~~~

### 知识点总结：
**[arguments对象](http://www.runoob.com/js/js-function-parameters.html)**
JavaScript 函数有个内置的对象 arguments 对象。
argument 对象包含了函数调用的参数数组。
**[indexOf()方法](http://www.runoob.com/jsref/jsref-indexof.html)**
indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置。
如果没有找到匹配的字符串则返回 -1。
**注意：** indexOf() 方法区分大小写。
**提示：** 同样你可以查看类似方法 lastIndexOf() 。
>astIndexOf() 方法可返回一个指定的字符串值最后出现的位置，如果指定第二个参数 start，则在一个字符串中的指定位置从后向前搜索。
　　**注意：** 该方法将从后向前检索字符串，但返回是从起始位置 (0) 开始计算子字符串最后出现的位置。 看它是否含有字符串。
　　开始检索的位置在字符串的 start 处或字符串的结尾（没有指定 start 时）。
　　如果没有找到匹配字符串则返回 -1 。
　　**注意：**lastIndexOf() 方法是区分大小写的！
**[filter()方法](http://www.runoob.com/jsref/jsref-filter.html)**
filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。
**注意：** filter() 不会对空数组进行检测。
**注意：** filter() 不会改变原始数组。