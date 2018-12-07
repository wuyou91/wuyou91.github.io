---
layout: post
title: "gulp常用插件"
date: 2018-12-07
excerpt: "gulp常用插件，一些也是node模块，不单只是gulp能用。"
tags: [gulp, node, 插件, 模块, 收集]
comments: true
---

## 匹配符 *、**、！、{}
~~~javascript
gulp.src('./js/*.js')               // * 匹配js文件夹下所有.js格式的文件
gulp.src('./js/**/*.js')            // ** 匹配js文件夹的0个或多个子文件夹
gulp.src(['./js/*.js','!./js/index.js'])    // ! 匹配除了index.js之外的所有js文件
gulp.src('./js/**/{omui,common}.js')        // {} 匹配{}里的文件名
~~~

## 文件操作
### 删除操作
del (替代gulp-clean)
~~~javascript
var del = require('del');
del('./dist');                      // 删除整个dist文件夹
~~~

### 重命名文件
gulp-rename
~~~javascript
var rename = require("gulp-rename");
gulp.src('./hello.txt')
  .pipe(rename('gb/goodbye.md'))    // 直接修改文件名和路径
  .pipe(gulp.dest('./dist')); 

// 带参数
gulp.src('./hello.txt')
  .pipe(rename({
    dirname: "text",                // 路径名
    basename: "goodbye",            // 主文件名
    prefix: "pre-",                 // 前缀
    suffix: "-min",                 // 后缀
    extname: ".html"                // 扩展名
  }))
  .pipe(gulp.dest('./dist'));
~~~

### 合并文件
gulp-concat
~~~JavaScript
var concat = require('gulp-concat');

gulp.src('./js/*.js')
    .pipe(concat('all.js'))         // 合并all.js文件
    .pipe(gulp.dest('./dist'));
    
gulp.src(['./js/demo1.js','./js/demo2.js','./js/demo2.js'])
    .pipe(concat('all.js'))         // 按照[]里的顺序合并文件
    .pipe(gulp.dest('./dist'));
~~~

### 在虚拟文件流中过滤文件
gulp-filter
~~~javascript
var filter = require('gulp-filter');

const f = filter(['**', '!*/index.js']);
gulp.src('js/**/*.js')
    .pipe(f)                        // 过滤掉index.js这个文件
    .pipe(gulp.dest('dist'));

const f1 = filter(['**', '!*/index.js'], {restore: true});
gulp.src('js/**/*.js')
    .pipe(f1)                       // 过滤掉index.js这个文件
    .pipe(uglify())                 // 对其他文件进行压缩
    .pipe(f1.restore)               // 返回到未过滤执行的所有文件
    .pipe(gulp.dest('dist'));       // 再对所有文件操作，包括index.js
~~~

## 压缩
### 压缩js
gulp-uglify
~~~javascript
var uglify = require("gulp-uglify");

gulp.src('./hello.js')
    .pipe(uglify())                 // 直接压缩hello.js
    .pipe(gulp.dest('./dist'))
    
 gulp.src('./hello.js')
    .pipe(uglify({
        mangle: true,               // 是否修改变量名，默认为 true
        compress: true,             // 是否完全压缩，默认为 true
        preserveComments: 'all'     // 保留所有注释
    }))
    .pipe(gulp.dest('./dist'))
~~~

### 压缩css
gulp-csso
~~~JavaScript
var csso = require('gulp-csso');

gulp.src('./css/*.css')
    .pipe(csso())
    .pipe(gulp.dest('./dist/css'))
~~~

### 压缩HTML。
gulp-html-minify
~~~JavaScript
var htmlminify = require('gulp-html-minify');

gulp.src('index.html')
    .pipe(htmlminify())
    .pipe(gulp.dest('./dist'))
~~~

### 压缩图片。
gulp-imagemin
~~~JavaScript
var imagemin = require('gulp-imagemin');

gulp.src('./img/*.{jpg,png,gif,ico}')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/img'))
~~~

### ZIP压缩文件。
gulp-zip
~~~JavaScript
var zip = require('gulp-zip');

gulp.src('./src/*')
    .pipe(zip('all.zip'))                   // 压缩成all.zip文件
    .pipe(gulp.dest('./dist'))
~~~

## JS/CSS自动注入
### 自动为css添加浏览器前缀
gulp-autoprefixer
~~~JavaScript
var autoprefixer = require('gulp-autoprefixer');

gulp.src('./css/*.css')
    .pipe(autoprefixer())           // 直接添加前缀
    .pipe(gulp.dest('dist'))

gulp.src('./css/*.css')
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],      // 浏览器版本
        cascade：true                       // 美化属性，默认true
        add: true                           // 是否添加前缀，默认true
        remove: true                        // 删除过时前缀，默认true
        flexbox: true                       // 为flexbox属性添加前缀，默认true
    }))
    .pipe(gulp.dest('./dist'))
~~~

查看更多配置：[options](https://github.com/postcss/autoprefixer#options)

更多浏览器版本：[browsers](https://github.com/browserslist/browserslist#queries)

### 解析构建块在HTML文件来代替引用未经优化的脚本和样式表。
gulp-useref
~~~javascript
// index.html

<!-- build:css /css/all.css -->
<link rel="stylesheet" href="css/normalize.css">
<link rel="stylesheet" href="css/main.css">
<!-- endbuild -->

// gulpfile.js

var useref = require('gulp-useref');

gulp.src('index.html')
    .pipe(useref())
    .pipe(gulp.dest('./dist'))
~~~
替换之后的index.html中就会变成：
~~~html
<link rel="stylesheet" href="css/all.css">  // 之前的两个<link>替换成一个了
~~~

### 给静态资源文件名添加hash值:unicorn.css => unicorn-d41d8cd98f.css
gulp-rev
~~~javascript
var rev = require('gulp-rev');

gulp.src('./css/*.css')
    .pipe(rev())
    .pipe(gulp.dest('./dist/css'))
~~~

### 重写被gulp-rev重命名的文件名
gulp-rev-replace
~~~javascript
var rev = require('gulp-rev');
var revReplace = require('gulp-rev-replace');
var useref = require('gulp-useref');

gulp.src('index.html')
    .pipe(useref())                         // 替换HTML中引用的css和js
    .pipe(rev())                            // 给css,js,html加上hash版本号
    .pipe(revReplace())                     // 把引用的css和js替换成有版本号的名字
    .pipe(gulp.dest('./dist'))
~~~

### 替换html中的构建块。
gulp-html-replace
~~~javascript
// index.html

<!-- build:css -->                          // css是buildName,可以自己定义
<link rel="stylesheet" href="css/normalize.css">
<link rel="stylesheet" href="css/main.css">
<!-- endbuild -->

// gulpfile.js

var htmlreplace = require('gulp-html-replace');

gulp.src('index.html')
    .pipe(htmlreplace({
        'css':'all.css'                     // css是index.html中定义的buildName
    }))
    .pipe(gulp.dest('./dist'))
~~~
替换之后的index.html中就会变成：
~~~html
<link rel="stylesheet" href="all.css">      // 之前的两个<link>替换成一个了
~~~

## 流控制
### 有条件地运行一个任务
gulp-if
也可以用三目运算符代替
~~~javascript
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var condition = true; 

gulp.src('./js/*.js')
    .pipe(gulpif(condition, uglify(), concat('all.js')))  // condition为true时执行uglify(), else 执行concat('all.js')
    .pipe(gulp.dest('./dist/'));
~~~

### 按指定顺序运行一组gulp任务
run-sequence
gulp默认使用最大并发数执行任务，也就是说所有的任务几乎都是同时执行，而不会等待其它任务。但很多时候，任务是需要有先后次序的，比如要先清理目标目录，然后再执行打包。  
run-sequence 的作用就是控制多个任务进行顺序执行或者并行执行
~~~JavaScript
var runSequence = require('run-sequence'),

gulp.task('default', function(cb) {
    runSequence(
        'clean', // 第一步：清理目标目录
        ['minify:js', 'minify:css', 'minify:html', 'minify:image'], // 第二步：打包 
        'watch', // 第三步：监控
        cb
    );
});
~~~

## 工具
### 从包的依赖和附件里加载gulp插件到一个对象里
gulp-load-plugins
~~~JavaScript
var $ = require('gulp-load-plugins')();     // $ 是一个对象,加载了依赖里的插件

gulp.src('./**/*.js')
    .pipe($.concat('all.js'))               // 使用插件就可以用$.PluginsName()
    .pipe($.uglify())
    .pipe($.rename('all.min.js'))
    .pipe(gulp.dest('./dist'))
~~~

### 
gulp-debug

### 编译sass
gulp-sass
~~~JavaScript
var sass = require('gulp-sass');

gulp.src('./sass/**/*.scss')
    .pipe(sass({
        outputStyle: 'compressed'           // 配置输出方式,默认为nested
    }))
    .pipe(gulp.dest('./dist/css'));
    
gulp.watch('./sass/**/*.scss', ['sass']);   // 实时监听sass文件变动,执行sass任务
~~~

### 编译ES6
gulp-babel
~~~JavaScript
var babel = require('gulp-babel');

gulp.src('./js/index.js')
    .pipe(babel({
        presets: ['es2015']
    }))
    .pipe(gulp.dest('./dist'))
~~~

### 将css文件里引用的图片转为base64
gulp-base64
~~~JavaScript
var base64 = require('gulp-base64');

gulp.src('./css/*.css')
    .pipe(base64({
        maxImageSize: 8*1024,               // 只转8kb以下的图片为base64
    }))
    .pipe(gulp.dest('./dist'))
~~~

### 映射源文件
gulp-sourcemaps
使处理过的文件映射到源文件上，方便定位到错误代码，进行调试
~~~javascript
var gulp = require('gulp');
var plugin1 = require('gulp-plugin1');
var plugin2 = require('gulp-plugin2');
var sourcemaps = require('gulp-sourcemaps');
 
gulp.task('javascript', function() {
  gulp.src('src/**/*.js')
    .pipe(sourcemaps.init())
      .pipe(plugin1())        // 所有的处理需放在sourcemaps.init()和sourcemaps.write()之间
      .pipe(plugin2())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'));
});
~~~

## 其他
### 获取npm参数
has-flag
检查process.argv是否有特定的参数

~~~javascript
const hasFlag = require('has-flag')

console.log(hasFlag('prod'))
// 打印true

// 定义的node命令
$ node foo.js --prod
~~~
可在不同环境的命令行添加不同的参数，如DEV,PROD,TEST等。
然后根据获取到的不同参数判断环境，执行不同的任务，以实现如开发环境、生产环境等的不同打包。

### 处理node的stream
through2
~~~JavaScript
fs.createReadStream('ex.txt')
  .pipe(through2(function (chunk, enc, callback) {
    for (var i = 0; i < chunk.length; i++)
      if (chunk[i] == 97)
        chunk[i] = 122  // 这里将文件中所有的字符a转换为字符z，
 
    this.push(chunk)
 
    callback()
   }))
  .pipe(fs.createWriteStream('out.txt'))
  .on('finish', () => doSomethingSpecial())
  ~~~

