/**
 * jquery module
 *
 * @method $().module
 * @param {Object} options
 * @param {String} [options.css] css样式
 * @param {Array | Function | Object} [options.data] 模块的数据，可以对象组数和方法。
 * @param {Array | String} [options.template] 模块渲染需要的模板.
 * @param {Object} [options.event(opt)] 事件写在这里面.
 * @param {String | Number} [type] 加载类型, 传'scroll'为滚动加载，传数值为延时加载时间
 * @return {deferred} 返回jquery延时对象
 * @example 
 *     //定义一个模块方法
 *     var f = $('#scroll').module({
 *         data : { text : 'hehe'},
 *         template : function (){
 *             return '<%= text %>';
 *         },
 *         css : function () {
 *             return '#scroll{color:#fff;}';
 *         },
 *         event : function(){
 *              //需要执行的事件
 *         }
 *     }, 'scroll');
 *
 *     //执行f这个方法的操作
 *     f();
 *
 * @example 
 *     //定义一个延时加载的模块
 *     var g = $('#lazyLoad').module({
 *         data : {text : 'hehe'},
 *         template : function (){
 *             return '<%= text %>';
 *         },
 *         css : function () {
 *             return '#lazyLoad{color:#fff;}';
 *         },
 *         event : function(){
 *             //需要执行的事件
 *         }
 *         }, 3000);
 *     g();
 *
 * @return {object} //jQuery的延时对象
 * @for module
 */
$.fn.module = function(opt, type) {

    var el = this;

    var dtd = $.Deferred(); //延时对象

    function needdo(o) {
        var options = opt || {},
            ccs,
            data,
            template;

        // css
        css = $.functionDo(opt.css);
        $.addCss(css);

        //模板
        template = $.functionDo(opt.template);

        //数据
        data = $.functionDo(opt.data);

        $.functionCall(data, function(res){
            var str = $.template(template, res);
            el.html(str);
        });

        if (typeof opt.event === 'function') {
            opt.event.call(el, o);
        }

        dtd.resolve(); // 改变Deferred对象的执行状态
    }

    function srolldo(o) {
        //滚动的时候加载
        var eTop = el.offset().top - 200, //获取对象距离顶部的高度
            eHeight = el.height(), //获取对象自身高度
            eBottom = eTop + eHeight + 200,
            winHeight = $(window).height(), //可视区高度
            time2 = _.now() + _.random(0, 100000);

        $(window).On('load scroll.' + time2, function() {
            var scrollTop = $(window).scrollTop(),
                winBottom = scrollTop + winHeight,
                load1 = eBottom > scrollTop && eBottom < winBottom,
                load2 = eTop > scrollTop && eTop < winBottom,
                load3 = eTop < scrollTop && eBottom > winBottom;

            if (load1 || load2 || load3) {
                needdo(o);
                $(window).off('scroll.' + time2);
            }
        }, 100);
    }

    function init(opt) {
        if (type === 'scroll') {
            srolldo();
        } else {
            //延时加载
            if (type > 0) {
                setTimeout(function() {
                    needdo(opt);
                }, type);
            } else {
                needdo(opt);
            }
        }

        return dtd.promise();
    }

    return init;
};