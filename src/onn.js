/**
 * Jquery on 事件改造, 增加时间阀的效果，在一定时间内，只执行一次。
 *
 * @method $().On
 * @for on
 * @param {String} event
 * @param {String} [selector]
 * @param {Object} [data]
 * @param {Object} handler(eventObject)
 * @param {Number} [lazytime]
 * @example
 *     //3秒内，最多点击一次
 *     $('body').On('click', 'div', function(){
 *         alert(1);
 *     }, 3000);
 *
 *     //滚动的时候，200毫秒执行一次
 *     $(window).On('scroll', function(){
 *         //do something
 *     }, 200);
 *
 *     //传入data
 *     function myHandler( event ) {
 *         alert( event.data.foo );
 *     }
 *     $('p').On('click', {foo : 'bar'}, myHandler, 1000);
 * @return {=> jQuery} [返回jQuery对象]
 */

$.fn.On = function() {
    //jquery 对象
    var el = this,
        delay,
        temparguments;

    //最后一个参数
    var lastArg = _.last(arguments);
    if (typeof lastArg === 'number') {
        delay = lastArg;
        temparguments = _.initial(arguments); //如果最后一个参数是时间,则去除
    } else {
        delay = 300;
    }

    //偷偷的把他的方法改了
    var arg = _.map(temparguments, function(item, index) {
        if (typeof item === 'function') {
            item = _.throttle(item, delay);
        }
        return item;
    });

    //重新绑定方法
    return el.on.apply(el, arg);
};