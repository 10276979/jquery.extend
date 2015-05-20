$.extend({
    /** 
     * 如果是方法则执行
     * @for function
     * @method $.functionDo
     * @param  {Function} fn        [期望传入function，传其他的也可以兼容]
     * @param  {Array}    arr       [fn参数以数组方式传入]
     * @param  {Object}   context   [执行上下文，可改变fn里面的this]
     * @return {不一定}             [如果fn是一个函数，则返回函数执行后的值，否则直接返回fn]
     * @example
     *     //例一：是函数就执行
     *     var funA = function(){
     *         console.log('第一个例子：是函数就执行');
     *     };
     *     $.functionDo(funA);
     *     
     *     //例二：函数需要传参
     *     var funB = function(a, b){
     *         console.log('第二个例子传入参值为:', a, b);
     *         return a * b;
     *     };
     *     var funBOut = $.functionDo(funB, [8, 8]);
     *     console.log('执行后是有返回值的:', funBOut);
     *     
     *     //例三：改变函数体里面的this
     *     var funC = function(a, b){
     *         console.log('第三个例子:', a, b, this);
     *     };
     *     
     *     $.functionDo(funC, [10, 10], {name: 'hello'});
     *     
     *     //例四：传入其他值返回原值
     *     var funD = 123;
     *     var funDOutPub = $.functionDo(funD);
     *     console.log(funDOutPub);
     */
    functionDo : function(fn, arr, context) {
        return typeof fn === 'function' ? fn.apply(context || fn, arr) : fn;
    },
    /**
     * @for function
     * @method $.functionCall  
     *
     * @param  {Anything} fn                [任意值，或promise对象]
     * @param  {Function} callback          [第二个函数，如果他也是一个函数则 执行callback(val)， 返回他的值作为参数传到callback]
     * @param {Object}   context            [执行上下文，可改变callback里面的this]
     * @return {undefined}                  [不返回值]
     * @example
     *     //例一，值是方法返回的
     *     var a = function(x, y, z) {
     *         return x + y + z;
     *     };
     *     var aa = $.functionDo(a, [1, 2, 3]);
     *     $.functionCall(aa, function(res){
     *         console.log('例一，值是方法返回的', res);
     *     });
     *     
     *     
     *     //例二，值是原始值
     *     var b = 123;
     *     var bb = $.functionDo(b);
     *     $.functionCall(bb, function(res){
     *         console.log('例二，值是原始值', res);
     *     });
     *     
     *     //例三，值是延时对象
     *     var c = function(name) {
     *         var dtd = $.Deferred(); //延时对象
     *         setTimeout(function(){
     *             dtd.resolve({name: name, age : 18}); // 改变Deferred对象的执行状态
     *         }, 1000)     
     *         return dtd.promise();
     *     };
     *     var cc = $.functionDo(c, ['xidada']);
     *     $.functionCall(cc, function(res){
     *         console.log('例三，值是延时对象', res);
     *     });
     *     
     *     //例四, 改变callback是里面的this
     *     $.functionCall(aa, function(res){
     *         console.log('例四，改变this', res, this);
     *     }, {name : 'xidada'});
     */
    functionCall : function(fn, callback, context){
        if(typeof fn === 'object' && fn.done) {
            fn.done(function(res){
                $.functionDo(callback, [res], context);
            });
        } else {
            $.functionDo(callback, [fn], context);
        }
    }
});