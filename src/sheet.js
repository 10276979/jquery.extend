(function($){
    var sheetRoot; 
    var styleSheets;


    function addCSSRule(sheet, selector, rules, index) {  
        if("insertRule" in sheet) {  
            sheet.insertRule(selector + "{" + rules + "}", index);  
        }  
        else if("addRule" in sheet) {  
            sheet.addRule(selector, rules, index);  
        }  
    }
    
    function addRule (str) {
        if (!sheetRoot) {
            sheetRoot = document.createElement("style");
            sheetRoot.type="text/css";
            sheetRoot.media="all";
            document.getElementsByTagName("head")[0].appendChild(sheetRoot);
            styleSheets = document.styleSheets[0];
        }

        
        var newrule = str.split(/{|}/);

        for (var i = 0, len = newrule.length; i < len; i = i + 2) {
            if (newrule[i]) {
                addCSSRule(styleSheets, newrule[i], newrule[i + 1]);  
            }
        }
    }


    function loadStyle(url) {
        var d = document,
            cssLink = d.createElement('link'),
            head = d.getElementsByTagName('head')[0];
        cssLink.rel = 'stylesheet';
        cssLink.type = 'text/css';
        cssLink.href = url;
        head.appendChild(cssLink);
    }

    $.extend({

        /**
         * 向页面添加css样式表或url地址
         * @method  $.addCss
         * @for css
         * @param  {String} value [css样式 | CSS地址]
         * @return {} 
         * @example
         *     $.addCss('body{font-size:16px;}');
         *     $.addCss('http://static.huanhuba.com/css/lecai/hhb.min.css');
         */
        addCss : function(value) {
            if ($.testRegExp('url', value)) {
                loadStyle(value);
            } else {
                addRule(value);
            }
        }
    });
}($));