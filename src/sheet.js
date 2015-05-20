(function($){
    var sheetRoot; 
    var styleSheets;

    /**
     * 向页面添加css样式
     * @method  $.addCss
     * @for css
     * @param  {String} str [css样式]
     * @return {} 
     * @example
     *     $.addCss('body{font-size:16px;}');
     */
    function _add (str) {
        if (!sheetRoot) {
            sheetRoot = document.createElement("style");
            sheetRoot.type="text/css";
            sheetRoot.media="all";
            document.getElementsByTagName("head")[0].appendChild(sheetRoot);
            styleSheets = document.styleSheets[0];
        }

        function addCSSRule(sheet, selector, rules, index) {  
            if("insertRule" in sheet) {  
                sheet.insertRule(selector + "{" + rules + "}", index);  
            }  
            else if("addRule" in sheet) {  
                sheet.addRule(selector, rules, index);  
            }  
        }

        var newrule = str.split(/{|}/);

        for (var i = 0, len = newrule.length; i < len; i = i + 2) {
            if (newrule[i]) {
                addCSSRule(styleSheets, newrule[i], newrule[i + 1]);  
            }
        }
    }

    $.extend({
        addCss : _add
    });
}($));