# jquery.extend 对jquery扩展了几个方法。

##编译文档
1.克隆项目: git clone https://github.com/kyo4311/jquery.extend.git （需要git）

2.安装包：转到项目目录 npm install (需要node)

3.编译文档：转到项目目录 运行grunt命令 (需要gurnt)

如果只想用这些方法，那么只要下载js,然后看demo使用即可，当然看文档可能会更方便一些。

## $.addCss()
向页面添加css样式或css地址。
```js
$.addCss('body{font-size:16px;}');
$.addCss('http://static.abc.com/css.css');
```
