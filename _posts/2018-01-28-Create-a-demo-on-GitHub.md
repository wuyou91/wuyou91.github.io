---
layout: post
title: "在github上利用gh-pages分支创建项目展示DEMO"
date: 2018-01-28
excerpt: "在github上搜索相关项目时会发现，有的项目不光写了一手好文档并且还给出了项目的在线运行Demo。那么，如何在github上维护自己个人项目源代码的同时并生成项目主页呢？"
tags: [github, 学习笔记, git]
comments: true
---

## Github项目主页
Github给用户提供了运行静态页面的地址，如何展示个人项目的静态页面？以下是创建项目主页的关键：

* gh-pages分支
* 访问地址：[github用户名].github.io/[项目仓库名]
一句话概括就是，首先将欲展示的静态页面推送到Github个人项目仓库的gh-pages分支下，然后通过上述访问地址（[github用户名].github.io/[项目仓库名]）进行访问。

## 具体操作步骤
### 1、将项目推送到远程仓库
项目开发过程中，可以将项目源码推送至github远程仓库中管理。
### 2、项目开发完毕，构建一个gh-pages分支，并在此分支中生成最终项目展示代码
* 切换到gh-pages分支 git checkout -b gh-pages
* 执行 npm run build 命令，构建代码
### 3、在gh-pages分支下将dist目录下的所有文件夹推送至远程仓库
~~~bash
# 强制添加dist文件夹，因为.gitignore文件中定义了忽略该文件
git add -f dist

# 提交到本地暂存区
git commit -m 'Initial the page of project'

# 部署dist目录下的代码
git subtree push --prefix dist origin gh-pages
~~~

## 小结
以上所述的在github上gh-pages分支上生成项目主页主要是利用了github提供的静态页解析功能，因此本文中所属的范围仅使用于静态页面的部署。在将Vue应用部署到gh-pages分支后，可能会出现部分资源无法加载的问题，原因就在于vue中的webpack配置在打包时其publicPath为根路径，如果该静态页在服务器中被访问则不会出现以上问题。在github解析时如果按照根路径解析会出错，因此在github上部署静态页时可以考虑将publicPath设置为当前目录，即 publicPath: './' 。

使用Vue-cli webpack模板生成的vue项目，出现上述问题应设置config/index.js中build对象下的assetsPublicPath字段为assetsPublicPath: './',原理都是设置publicPath字段。

原文参考[https://segmentfault.com/a/1190000008425992](https://segmentfault.com/a/1190000008425992)
