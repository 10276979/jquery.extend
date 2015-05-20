$.extend({
    /** 
     * 获取常用正则
     * @for regExp
     * @method $.getRegExp
     * @param  {String} key         tel | phone | qq | email | url | idcard
     * @return {regExp}             [正则表式]
     * @example
     *     var z1 = $.getRegExp('email');
     *     console.log(z1);
     */
    getRegExp : function(key) {
        var list = {
            tel : /^\+?[0\s]*[\d]{0,4}[\-\s]?\d{0,6}[\-\s]?\d{4,12}$/,
            phone : /^\d{11}$/,
            qq : /^[1-9]\d{4,14}$/,
            email : /^\w+(?:[-+.']\w+)*@\w+(?:[-.]\w+)*\.\w+(?:[-.]\w+)*$/,
            idcard : /^(?:\d{17}[\d|X]|\d{15})$/,
            url : /^(?:http(?:s)?:\/\/(?:[\w-]+\.)+[\w-]+(?:\:\d+)*(?:\/[\w- .\/?%&=]*)?)$/
        };
        return list[key] ? list[key] : '';
    },

    /**
     * 是否为正则表达式
     * @for regExp
     * @method $.isRegExp
     * @param  {regExp}  value 
     * @return {Boolean}
     * @example
     *     var a1 = '1';
     *     var b1 = $.isRegExp(a1);
     *     console.log(b1);
     */
    isRegExp : function(value) {
        return Object.prototype.toString.call(value) === '[object RegExp]';
    },

    /**
     * 测式是否能通过正则表达式
     * @for regExp
     * @method $.testRegExp
     * @param  {regExp}  value        正则表达式或key，如果是key (tel | phone | qq | email | url | idcard)
     * @param  {regExp}  string       需要测试的字符串
     * @example
     *     //如果正则
     *     var out1 = $.testRegExp(/[0-9]/, '091123');
     *     console.log(out1);
     *     var out2 = $.testRegExp(/[0-9]/, 'abc');
     *     console.log(out2);
     *     
     *     
     *     //如果key
     *     var out3 = $.testRegExp('email', '1@163.com');
     *     console.log(out3);
     *     var out4 = $.testRegExp('email', '111#qq.com');
     *     console.log(out4);
     *     
     *     
     *     //如果其他值
     *     var out5 = $.testRegExp('', '1@163.com');
     *     console.log(out5);
     */
    testRegExp : function(key, string) {
        var zz = $.isRegExp(key) ? key : $.getRegExp(key);
        var out = false;
        if ($.isRegExp(zz)) {
            out = zz.test(string);
        }
        return out;
    }
});