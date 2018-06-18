---
layout: post
title: "FCC 练习 - Caesars Cipher(关于用Unicode查找字符串的操作)"
date: 2018-01-16
excerpt: "下面我们来介绍风靡全球的凯撒密码Caesar cipher，又叫移位密码。移位密码也就是密码中的字母会按照指定的数量来做移位。"
tags: [freecodecamp, 学习笔记, js, 字符串]
comments: true
---

## 凯撒密码

（让上帝的归上帝，凯撒的归凯撒）  
下面我们来介绍风靡全球的凯撒密码Caesar cipher，又叫移位密码。  
移位密码也就是密码中的字母会按照指定的数量来做移位。  
一个常见的案例就是ROT13密码，字母会移位13个位置。由'A' ↔ 'N', 'B' ↔ 'O'，以此类推。  
写一个ROT13函数，实现输入加密字符串，输出解密字符串。  
所有的字母都是大写，不要转化任何非字母形式的字符(例如：空格，标点符号)，遇到这些特殊字符，跳过它们。  
当你完成不了挑战的时候，记得开大招'Read-Search-Ask'。  

这是一些对你有帮助的资源:  
* [String.charCodeAt()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt)  
* [String.fromCharCode()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/fromCharCode)  
rot13("SERR PBQR PNZC") 应该解码为 "FREE CODE CAMP"  
rot13("SERR CVMMN!") 应该解码为 "FREE PIZZA!"  
rot13("SERR YBIR?") 应该解码为 "FREE LOVE?"  
rot13("GUR DHVPX OEBJA QBT WHZCRQ BIRE GUR YNML SBK.") 应该解码为 "THE QUICK BROWN DOG JUMPED OVER THE LAZY FOX."  

### 思路：
**英文字母大写A-Z的Unicode为65-90；**  
遍历字符串，将Unicode>90||Unicode<65的直接push到新数组内；  
因为在77位以后再加13将超过90，这时应该返回到开头，即Unicode>77时，则为64+（13-（90-Unicode））即Unicode-13；  
当Unicode<77时，则直接Unicode+13；  

### 知识点：
**[charAt()方法](http://www.runoob.com/jsref/jsref-charat.html)**  
返回指定位置的字符。  
第一个字符位置为 0, 第二个字符位置为 1,以此类推。  

**[charCodeAt()方法](http://www.runoob.com/jsref/jsref-charcodeat.html)**  
返回指定位置的字符的 Unicode 编码。  
字符串中第一个字符的位置为 0， 第二个字符位置为 1，以此类推。  

**[fromCharCode()](http://www.runoob.com/jsref/jsref-fromcharcode.html)**  
可接受一个指定的 Unicode 值，然后返回一个字符串。  
**注意：**该方法是 String 的静态方法，字符串中的每个字符都由单独的 Unicode 数字编码指定。使用语法： String.fromCharCode()。  

代码如下：
~~~javascript
function rot13(str) {
  var newarray=[];
  for(var i=0;i<str.length;i++)
    {
      if(str.charCodeAt(i)<65||str.charCodeAt(i)>90){
          newarray.push(str[i]);
        }else if(str.charCodeAt(i)<=77){
          newarray.push(String.fromCharCode(str.charCodeAt(i)+13));
        }else{
          newarray.push(String.fromCharCode(str.charCodeAt(i)-13));
        }
    }
   return newarray.join("");
}
~~~