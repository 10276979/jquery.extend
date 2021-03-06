$.extend({
    /**
     * 模板+数据生成字符串
     * 
     * @method  $.template
     * @for template
     * @param  {String}         template  [模板字符串]
     * @param  {Array | Object} data      [数据]
     * @return {String}                   [生成后的字符串]
     * @example
     *     var tpl = '<li>姓名：<%= name%></li>';
     *     var str1 = $.template(tpl, {name : 'kyo'});
     *     console.log(str1);
     *     
     *     
     *     var data2 = [{
     *         name : 'kyo'
     *     },{
     *         name : 'iori'
     *     }];
     *     var str2 = $.template(tpl, data2);
     *     console.log(str2);
     */
    template : function(template, data) {
        if (data && data.length >= 1) {
            str = _.reduce(data, function(memo, value, key) {
                return memo + _.template(template)(value);
            }, '');
        } else {
            str = _.template(template)(data);
        }
        return str;
    }
});