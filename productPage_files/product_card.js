var obj = document.getElementsByClassName('prc_val');
var href = window.location.href;
var isIE = (navigator.userAgent.indexOf("Chrome") == -1 && navigator.userAgent.indexOf('OPR') == -1 && navigator.userAgent.indexOf('Firefox') == -1)

if (obj.length && href.indexOf('#noss') == -1 && !isIE) {
    var orig = [];
    var origObjs = [];
    var masked = [];
    var liters = 'qwertyuiopasdfghjklzxcvbnm1234567890';
    var obj = obj[0];
    var iter = 0;
    do {
        var className = obj.getAttribute('class');
        className = className.split(' ')[0];
        if (className != null && typeof (className) != 'undefined') {
            var a = liters[Math.floor(Math.random() * 26)];
            for (var i = 0; i <= 7; i++) {
                a += liters[Math.floor(Math.random() * 36)];
            }
            orig.push(className);
            masked.push(a);
            origObjs.push(obj);
        }
        obj = obj.parentNode;
        iter++;
        if (iter > 6) break;
    } while (className != 'product');

    var css = [];
    var stylesheets = document.getElementsByTagName('link');
    for (var i = 0; i < stylesheets.length; i++) {
        var href = stylesheets[i].getAttribute('href');
        if (href.indexOf('/main.css') > 0 || href.indexOf('/holodilnik.css') > 0 || href.indexOf('/bootstrap.css') > 0) {
            css.push(stylesheets[i]);
        }
    }
    var _css = '';
    var postLine = '';
    for (var k = 0; k < css.length; k++) {
        for (var i = 0; i < css[k].sheet.rules.length; i++) {
            var cssLine = css[k].sheet.rules[i].cssText;
            if (cssLine.indexOf('.nav_color .status_box {') > -1) {
                postLine = cssLine + "\n";
            }
            var changed = false;
            for (var j = 0; j < orig.length; j++) {
                var regexp = new RegExp('\\.' + orig[j] + '\\b', 'g');
                var matches = (regexp.test(cssLine) && cssLine.indexOf(orig[j] + '-') == -1) || cssLine.indexOf('.' + orig[j] + ',') > -1;
                if (matches) {
                    changed = true;
                    cssLine = cssLine.replace(regexp, '.' + masked[j]);
                }
            }
            if (changed) _css += cssLine + "\n";
        }
    }

    var newElem = document.createElement('style');
    newElem.setAttribute('type', 'text/css');
    newElem.innerHTML = _css + postLine;
    document.body.appendChild(newElem);
    for (var j = 0; j < orig.length; j++) {
        var classAttr = origObjs[j].getAttribute('class');
        origObjs[j].setAttribute('class', classAttr.replace(orig[j], masked[j]));
    }
    document.body.insertAdjacentHTML('afterBegin', '<div class="region_block" style="display: none;"><div class="status_box"></div></div>');
}