function PCTooltip(options) {
    this.init(options)
}

PCTooltip.prototype = {
    defaults: {
        selector: '.delivery_cat',
        container_class: 'delivery_div',
        content: 'Контент не определен',
        css: 'box-shadow: 0 0 10px rgba(0, 0, 0, 0.4); margin-left: -600px; background: white; width: 800px;',
        time: 2
    },
    closable: true,
    stopPropagation: true,
    timer: false,
    marginLeftOrig: 0,
    widthOrig: 0,

    /**
     * Метод добавления всплывашки на указанный селектор
     * @param options
     */
    init: function(options) {
        for (var key in options) {
            this.defaults[key] = options[key];
        }

        $(document).ready(function() {
            var tmp = $(PCTooltip.prototype.defaults.selector);
            for (var i = 0; i < tmp.length; i++) {
                var newElem = document.createElement("div");
                newElem.className = PCTooltip.prototype.defaults.container_class;
                newElem.innerHTML = '<div class="canv_bl_deliv" style="width: 40px; height: 18px; z-index: 9;">'
                    + '<canvas id="myCanvas" width="40" height="18" style="margin-bottom: 0px; display: inline-block;"></canvas>'
                    + '</div>'
                    + '<div class="container" style="z-index: 8; padding: 3px 30px 30px 30px;">'
                        + '<div style="float: right; margin: 0px -19px 0 0;cursor:pointer;"><img src="/img/action_close.png" onclick="PCTooltip.prototype.hide()"></div>'
                        + '<div style="clear: both"></div>'
                        + PCTooltip.prototype.defaults.content
                    + '</div>';
                newElem.style.display = 'none';
                newElem.style.position = 'absolute';
                newElem.style.marginTop = '-14px';
                newElem.style.zIndex = 75;
                document.body.appendChild(newElem);

                var tooltipObj = $('.container', newElem);
                PCTooltip.prototype.marginLeftOrig = parseInt($(tooltipObj).css('margin-left'));
                PCTooltip.prototype.widthOrig = parseInt($(tooltipObj).css('width'));

                var c = document.getElementById("myCanvas");
                var ctx = c.getContext("2d");
                ctx.shadowBlur = 10;
                ctx.fillStyle = '#FFFFFF';
                ctx.shadowColor = '#999';
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 0;
                for (var y = 10; y <= 18; y++) {
                    var x1 = Math.round(20 - (y - 10) / 2);
                    ctx.fillRect(x1, y, (y - 10) + 1, 1);
                }
                //pure /\
                ctx.shadowBlur = 0;
                for (var y = 10; y <= 18; y++) {
                    var x1 = Math.round(20 - (y - 10) / 2);
                    ctx.fillRect(x1, y, (y - 10) + 1, 1);
                }

                $(tmp[i]).after(newElem);
                $(tmp[i]).on('click',function() {
                    clearTimeout(PCTooltip.prototype.timer);
                    PCTooltip.prototype.closable = false; //Сбрасываем флаг, т.к. в $('body').click окно закрывать не надо
                    PCTooltip.prototype.stopPropagation = true; //Останавливать распространение события при клике по всплывашке
                    var expanded = $(this).attr('expanded');
                    if ((typeof expanded == 'undefined') || expanded == 0) {
                        //Не открывалось ни разу или уже было закрыто
                        $('.' + PCTooltip.prototype.defaults.container_class).hide(); //Убираем соседские окна
                        var tooltipObj = $(this).next('.' + PCTooltip.prototype.defaults.container_class).children('.container');
                        $(tooltipObj).css('margin-left', PCTooltip.prototype.marginLeftOrig + 'px');
                        $(tooltipObj).css('width', PCTooltip.prototype.widthOrig + 'px');
                        var marginLeft = parseInt($(tooltipObj).css('margin-left'));
                        var marginMin = parseInt($(this).offset().left) * -1 + 50;
                        if (marginLeft < marginMin) {
                            $(tooltipObj).css('margin-left', marginMin + 'px');
                        }
                        var maxWidth = document.body.clientWidth - 160;
                        var width = parseInt($(tooltipObj).css('width'));
                        if (maxWidth < width) {
                            $(tooltipObj).css('width', maxWidth + 'px');
                        }
                        $(this).next('.' + PCTooltip.prototype.defaults.container_class).fadeIn();
                        $(this).attr('expanded', 1);
                        PCTooltip.prototype.timer = setTimeout('PCTooltip.prototype.hide()', PCTooltip.prototype.defaults.time * 1000);
                    } else {
                        return;
                    }
                });
            }

            $('body').click(function() {
                setTimeout('PCTooltip.prototype.hide()', 10);
            })

            $('.' + PCTooltip.prototype.defaults.container_class + ' a').mouseover(function() {
                PCTooltip.prototype.stopPropagation = false;
                PCTooltip.prototype.closable = false;
            })
            $('.' + PCTooltip.prototype.defaults.container_class + ' a').mouseout(function() {
                PCTooltip.prototype.stopPropagation = true;
                PCTooltip.prototype.closable = true;
            })
            $('.' + PCTooltip.prototype.defaults.container_class + ' .container').on('click',function(e) {
                if (PCTooltip.prototype.stopPropagation) {
                    e.stopPropagation();
                }
            })
            $('.' + PCTooltip.prototype.defaults.container_class + ' .container').mouseover(function() {
                clearTimeout(PCTooltip.prototype.timer);
            })
            $('.' + PCTooltip.prototype.defaults.container_class + ' .container').mouseout(function() {
                PCTooltip.prototype.timer = setTimeout('PCTooltip.prototype.hide()', PCTooltip.prototype.defaults.time * 1000);
            })
        })
    },

    hide: function() {
        if (!this.closable) {
            this.closable = true;
            return;
        }
        $('.' + PCTooltip.prototype.defaults.container_class).fadeOut();
        $(PCTooltip.prototype.defaults.selector).attr('expanded', 0);
        $('body').find('.delivery_cat').attr('expanded', 0)
    }
}
