# jquery.extend 对jquery扩展了几个方法。

##编译文档
1. 克隆项目: git clone https://github.com/kyo4311/jquery.extend.git （需要git）
2. 安装包：转到项目目录 npm install (需要node)
3. 编译文档：转到项目目录 运行grunt命令 (需要gurnt)

如果只想用这些方法，那么只要下载js,然后看demo使用即可，当然看文档可能会更方便一些。

## $.addCss()
向页面添加css样式或css地址。
```js
$.addCss('body{font-size:16px;}');
$.addCss('http://static.abc.com/css.css');
```

## function
### $.functionDo(fn)
如果fn是一个函数，则返回函数执行后的值，否则直接返回fn
```js
//例一：是函数就执行
var funA = function(){
    console.log('第一个例子：是函数就执行');
};
$.functionDo(funA);

//例二：函数需要传参
var funB = function(a, b){
    console.log('第二个例子传入参值为:', a, b);
    return a * b;
};
var funBOut = $.functionDo(funB, [8, 8]);
console.log('执行后是有返回值的:', funBOut);

//例三：改变函数体里面的this
var funC = function(a, b){
    console.log('第三个例子:', a, b, this);
};

$.functionDo(funC, [10, 10], {name: 'hello'});

//例四：传入其他值返回原值
var funD = 123;
var funDOutPub = $.functionDo(funD);
console.log(funDOutPub);
```
