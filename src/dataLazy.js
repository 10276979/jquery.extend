/**
 * jquery module
 * 
 * @method $().datalazy
 * @example
 *     //在需要延时加载的地方，外面包一个textarea. 然后外层div使用此方法.
 *     $('.box').datalazy();
 * @return {object} 返回jQuery对象。
 *
 * @for dataLazy
 */
$.fn.datalazy = function() {
    var el = this;
    el.each(function() {
        var my = $(this),
            tpl = my.find('textarea').text() || '';
        if (tpl) {
            $(my).module({template: tpl}, 'scroll')();
        }
    });
    return el;
};