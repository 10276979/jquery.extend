# jquery.extend 对jquery扩展了几个方法。

###编译文档
1.克隆项目: （需要git）
```html
git clone https://github.com/kyo4311/jquery.extend.git
```
2.安装包：转到项目目录 (需要node) https://nodejs.org/
```html
npm install
```
3.编译文档：转到项目目录 运行grunt命令 http://gruntjs.com/
```html
gurnt
```
如果只想用这些方法，那么只要下载js,然后看demo使用即可，当然看文档可能会更方便一些。

### $.addCss()
向页面添加css样式或css地址。
```js
$.addCss('body{font-size:16px;}');
$.addCss('http://static.abc.com/css.css');
```


### $().datalazy () Object
html懒加载
```html
<div class="box">
    <textarea>
        <div class="box2">
            <img src="http://pic.nipic.com/2008-07-15/2008715145556818_2.jpg" width="100%" />
        </div>
    </textarea>
</div>
```

```js
$('.box').datalazy();
```



### $.functionDo ( fn  arr  context ) 不一定
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
### $.functionCall ( fn  callback  context ) Undefined
把fn执行的值，返回到callback的参数里面。
```js
//例一，值是方法返回的
 var a = function(x, y, z) {
     return x + y + z;
 };
 var aa = $.functionDo(a, [1, 2, 3]);
 $.functionCall(aa, function(res){
     console.log('例一，值是方法返回的', res);
 });
 
 
 //例二，值是原始值
 var b = 123;
 var bb = $.functionDo(b);
 $.functionCall(bb, function(res){
     console.log('例二，值是原始值', res);
 });
 
 //例三，值是延时对象
 var c = function(name) {
     var dtd = $.Deferred(); //延时对象
     setTimeout(function(){
         dtd.resolve({name: name, age : 18}); // 改变Deferred对象的执行状态
     }, 1000)     
     return dtd.promise();
 };
 var cc = $.functionDo(c, ['xidada']);
 $.functionCall(cc, function(res){
     console.log('例三，值是延时对象', res);
 });
 
 //例四, 改变callback是里面的this
 $.functionCall(aa, function(res){
     console.log('例四，改变this', res, this);
 }, {name : 'xidada'});
```



### $().module ( options  [type] ) Object
生成一个模块.
```js
//定义一个模块方法
var f = $('#scroll').module({
    data : { text : 'hehe'},
    template : function (){
        return '<%= text %>';
    },
    css : function () {
        return '#scroll{color:#fff;}';
    },
    event : function(){
         //需要执行的事件
    }
}, 'scroll');

//执行f这个方法的操作
f();

//定义一个延时加载的模块
var g = $('#lazyLoad').module({
    data : {text : 'hehe'},
    template : function (){
        return '<%= text %>';
    },
    css : function () {
        return '#lazyLoad{color:#fff;}';
    },
    event : function(){
        //需要执行的事件
    }
    }, 3000);
g();
```

### $().On ( event  [selector]  [data]  handler(eventObject)  [lazytime] ) => jQuery
jquery on事件的改造，增加lazytime，在一定时间内只执行一次，需要引入underscore.js
```js
//3秒内，最多点击一次
$('body').On('click', 'div', function(){
    alert(1);
}, 3000);

//滚动的时候，200毫秒执行一次
$(window).On('scroll', function(){
    //do something
}, 200);

//传入data
function myHandler( event ) {
    alert( event.data.foo );
}
$('p').On('click', {foo : 'bar'}, myHandler, 1000);
```
### $.getRegExp ( key ) RegExp
取常用正则表达式
```js
var z1 = $.getRegExp('email'); //tel | phone | qq | email | url | idcard
console.log(z1);
```

### $.isRegExp ( value ) Boolean
判断是否为正则表达式
```js
var a1 = '1';
var b1 = $.isRegExp(a1);
console.log(b1);
```

### $.testRegExp ( value  string )
测试字符串是否能通过正则表达式
```js
//如果正则
var out1 = $.testRegExp(/[0-9]/, '091123');
console.log(out1);
var out2 = $.testRegExp(/[0-9]/, 'abc');
console.log(out2);


//如果key
var out3 = $.testRegExp('email', '1@163.com');
console.log(out3);
var out4 = $.testRegExp('email', '111#qq.com');
console.log(out4);


//如果其他值
var out5 = $.testRegExp('', '1@163.com');
console.log(out5);
```

### $.template ( template  data ) String
模板+数据生成字符串

```js
var tpl = '<li>姓名：<%= name%></li>';
var str1 = $.template(tpl, {name : 'kyo'});
console.log(str1);


var data2 = [{
    name : 'kyo'
},{
    name : 'iori'
}];
var str2 = $.template(tpl, data2);
console.log(str2);
```

### 杂项
1. 希望得到大家的支持，给个star吧
2. QQ: 9169775 大家可以一起交流
3. QQ群：8685914 





