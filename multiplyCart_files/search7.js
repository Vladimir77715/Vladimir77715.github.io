var selectedACPosition = 0; //Глобальная переменная с № выделенной строки из автокомплита Николая Юдина
var lastACRespose = ''; //Глобальная переменная с последним успешно полученным результатом автокомплита Николая Юдина
var lastACSearchLine = ''; //Глобальная переменная с последним поисковым запросом автокомплита Николая Юдина

window.bigBrotherBlockCache = {
    categories: '#bigbrother-block-cache71',
    products:   '#bigbrother-block-cache72',
    specoffers: '#bigbrother-block-cache73',
    time: '#bigbrother-block-cache74'
}

jQuery.fn.setCursorPosition = function(position){
    if(this.length == 0) return this;
    return $(this).setSelection(position, position);
}

jQuery.fn.setSelection = function(selectionStart, selectionEnd) {
    if(this.lengh == 0) return this;
    var input = this[0];
    if (input.createTextRange) {
        var range = input.createTextRange();
        range.collapse(true);
        range.moveEnd('character', selectionEnd);
        range.moveStart('character', selectionStart);
        range.select();
    } else if (input.setSelectionRange) {
        input.focus();
        input.setSelectionRange(selectionStart, selectionEnd);
    }
    return this;
}

;(function() {
    var replaceModule = (function() {
        var defaultPatternSymbol = '#';

        function normalizePattern(pattern) {
            var firstLetter= pattern.slice(0, 1),
                    lastLetter = pattern.slice(-1);

            if (firstLetter != defaultPatternSymbol) {
                pattern = defaultPatternSymbol + pattern;
            }

            if (lastLetter != defaultPatternSymbol) {
                pattern = pattern + defaultPatternSymbol;
            }
            return pattern;
        }

        function replace(string, replaceMap) {
            var reg = null;
            for (var pattern in replaceMap) {
                reg = new RegExp(normalizePattern(pattern), 'g');
                string = string.replace(reg, replaceMap[pattern]);
            }
            return string;
        }

        var moduleApi = {'byMap': replace }
        return moduleApi;
    })();

    var templateModule = (function(replace) {
        var defaultDomain = '//www.holodilnik.ru';

        function appendToDom(html, selector) {
            if (html.length) {
                $(function() {
                    $(selector).html(html);
                });
            }
        }

        function renderContainer(itemsHtml, template) {
            var containerHtml = '', replaceMap = {};
            if (itemsHtml.length) {
                replaceMap[template.itemsPattern] = itemsHtml;
                containerHtml = replace.byMap(template.container, replaceMap);
            }
            return containerHtml;
        }

        function renderItems(elements, template) {
            var elementsHtml = '';

            if ((typeof elements === 'object') && (elements != null)) {
                for (var index in elements) {
                    elementsHtml += renderSingleItem(elements[index], template);
                }
            }
            return elementsHtml;
        }

        function renderSingleItem(element, template) {
            var replaceMap = element;
            if (replaceMap.hasOwnProperty('url')) {
                replaceMap.url = replaceMap.url;
            }
            return replace.byMap(template.item, replaceMap);
        }

        function setCurrentDomain(url) {
            if ((typeof url === 'string') && (url.length)) {
                url = url.replace(new RegExp(defaultDomain, 'g'), '//' + window.location.hostname);
            }
            return url;
        }

        var moduleApi = {
            renderItems: renderItems,
            renderContainer: renderContainer,
            appendToDom: appendToDom
        }

        return moduleApi;
    })(replaceModule);

    var widgetModule = (function(templateModule) {
        function widgetObject() {
            this.template = null;
            this.selector = null;
            this.dataPartName = null;
            this.renderCallback = null;
        }
        widgetObject.prototype.setTemplate = function(template) {
            this.template = template;
            return this;
        }
        widgetObject.prototype.setSelector = function(selector) {
                this.selector = selector;
                return this;
        }
        widgetObject.prototype.setDataPartName = function(dataPartName) {
            this.dataPartName = dataPartName;
            return this;
        }
        widgetObject.prototype.setRenderCallback = function(renderCallback) {
            this.renderCallback = renderCallback;
            return this;
        }
        widgetObject.prototype.setNoDataCallback = function(noDataCallback) {
            this.noDataCallback = noDataCallback;
            return this;
        }

        widgetObject.prototype.render = function(json) {
            var dataPart = null,
                itemsHtml= null,
                fullHtml = null;

            if (this.dataPartName) {
                if (json.hasOwnProperty(this.dataPartName)) {
                    dataPart = json[this.dataPartName];
                } else {
                    dataPart = null;
                }
            } else {
                dataPart = json;
            }

            if (dataPart && (typeof dataPart == 'object') && dataPart.length) { //TODO - обратить внимание
                itemsHtml = templateModule.renderItems(dataPart, this.template),
                    fullHtml= templateModule.renderContainer(itemsHtml, this.template);
                templateModule.appendToDom(fullHtml, this.selector);
                if (typeof this.renderCallback === 'function') {
                    this.renderCallback(fullHtml);
                }
            } else {
                if (typeof this.noDataCallback === 'function') {
                    this.noDataCallback();
                }
            }
        return moduleApi;
    }

    function getNewWidgetObject() {
        return new widgetObject;
    }

    var moduleApi = { createWidget: getNewWidgetObject }
    return moduleApi;
})(templateModule);

var restModule = (function(replace) {
    var xhr = null,
        ajaxUrl = '',
        ajaxQuery = {},
        widgets = [],
        awaitingResponse = null;

    function setAjaxUrl(url) {
        ajaxUrl = url;
    }

    function setProductIdsInAjaxQuery(pids) {
        ajaxQuery['pid'] = pids;
        return moduleApi;
    }

    function setCategoryIdsInAjaxQuery(categoryId) {
        ajaxQuery['categoryId'] = categoryId;
        return moduleApi;
    }

    function setQueryStringInAjaxQuery(query) {
        ajaxQuery['query'] = query;
        return moduleApi;
    }

    function setIsArticulInAjaxQuery(isArticul) {
        ajaxQuery['articul'] = isArticul;
        return moduleApi;
    }

    function setSiteIdInAjaxQuery(siteId) {
        ajaxQuery['site_id'] = siteId;
        return moduleApi;
    }

    //Сначала делаем запрос в старый автокомплит, потом уже в новый.
    function loadBlock(successCallback) {
        ajaxQuery.query = ajaxQuery.query.trim();
        if (ajaxQuery.query != lastACSearchLine || (!$('.serch_result_bl').hasClass('active_w'))) {
            $.ajax({
                url: '/search/ac2.php',
                data: {'q': ajaxQuery.query, 'limit': 7},
                type: 'get',
                success: function (acLines) {
                    //Если найдена одна строка и она равна поисковой то не выводим ничего
                    if (acLines.trim() == $("#form_query input[type='text']").val()) {
                        acLines = '';
                    }
                    if (acLines != lastACRespose) {
                        selectedACPosition = 0;
                        lastACRespose = acLines;
                        if (acLines) {
                            var words = acLines.split("\n");
                            acLines = '<ul>';
                            for (var i = 0; i < words.length; i++) {
                                if (words[i] != '') {
                                    var className = (i % 2 == 0) ? 'ac_even' : 'ac_odd';
                                    acLines += '<li class="' + className + '" rel="' + i + '"><a href="#">' + words[i] + '</a></li>';
                                }
                            }
                            acLines += '</ul>';
                            $('.ac_results').html(acLines);
                            $('.ac_results li').mouseover(function() {
                                if (!$(this).hasClass('selected')) {
                                    $('.ac_results li').removeClass('selected');
                                    $(this).addClass('selected');
                                    selectedACPosition = parseInt($(this).attr('rel'), 10) + 1;
                                }
                            });
                            $(".ac_results li a").click(function(event){
                                $('#form_query input[type="text"]').focus();
                                event.preventDefault();
                                var html_el = $(this).html();
                                $('#form_query input').val(html_el).trigger('keyup');
                                $("form[name='search']").submit();
                            })
                        } else {
                            $('.ac_results').html('');
                        }
                    }
                    if (acLines && (!$('.serch_result_bl').hasClass('active_w'))) {
                        $('.serch_result_bl').addClass('active_w');
                    }
                    loadBBBlock(successCallback)
                },
                error: function() {
                    $('.ac_results').html('');
                    loadBBBlock(successCallback);
                }
            })
        }
        lastACSearchLine = ajaxQuery.query;
        return moduleApi;
    }

    /**
     * Загружает данные от bigbrother после загрузки данных автокомплита
     */
    function loadBBBlock(successCallback, acLines) {
        if (xhr) xhr.abort();
        xhr = $.ajax({
            url: ajaxUrl,
            dataType: "jsonp",
            data: ajaxQuery
        })
        .done(function(responce) {

            renderBlockHandler(responce);
            if (typeof successCallback == 'function') {
                successCallback(responce);
            }

            setTimeout(function(){
                var i = 0;
                $('.title_search_cat').each(function(){
                    if (($(this).html()=='' || $(this).html()==' ') && $('.ac_results').html() == ''){
                        i++;
                    }
                });
                if (i != 3) {
                    $('.serch_result_bl, #form_query').addClass('active_w');
                }
                else {
                    $('.serch_result_bl, #form_query').removeClass('active_w');
                }
                if (( $('#bigbrother-block-cache73').html()=='' || $('#bigbrother-block-cache73').html()==' ')/*  && $('.ac_results').html() == ''*/) {
                    $('#bigbrother-block-cache72').addClass('win_max');
                    $('#bigbrother-block-cache73').hide();
                }
                else {
                    $('#bigbrother-block-cache72').removeClass('win_max');
                    $('#bigbrother-block-cache73').show();
                }
                if (( $('#bigbrother-block-cache72').html()=='' || $('#bigbrother-block-cache72').html()==' ' )/* && $('.ac_results').html() == ''*/) {
                    $('#bigbrother-block-cache73').addClass('win_max');
                    $('#bigbrother-block-cache72').hide();
                }
                else {
                    $('#bigbrother-block-cache73').removeClass('win_max');
                    $('#bigbrother-block-cache72').show();
                }
            },100);
        }).fail(failLoading);
    }

    function addWidget(widget) {
        widgets.push(widget);
        if (awaitingResponse !== null) {
            for (var index in widgets) {
                widgets[index].render(awaitingResponse);
            }
            awaitingResponse = null;
        }

        return moduleApi;
    }

    function renderBlockHandler(response) {
        if (widgets.length) {
            for (var index in widgets) {
                widgets[index].render(response);
            }
        } else {
            awaitingResponse = response;
        }
    }

    function failLoading(xhr) {
        try {
            var response = $.parseJSON(xhr.responseText),
                code   = response.code || '500',
                message  = response.message || 'Error occurred';
        } catch (e) {
            var code  = xhr.status,
                message = xhr.statusText;
        }
        console.error(code, message);
    }

    var moduleApi = {
        setProductId: setProductIdsInAjaxQuery,
        setCategoryId: setCategoryIdsInAjaxQuery,
        setQueryString: setQueryStringInAjaxQuery,
        setIsArticul: setIsArticulInAjaxQuery,
        setSiteId: setSiteIdInAjaxQuery,
        setUrl: setAjaxUrl,
        loadBlock: loadBlock,
        addWidget: addWidget
    };

    return moduleApi;
})(replaceModule);

(function($) {
    $.fn.widgetSlider = function() {
        return this.each(function() {
            var $slider = $(this),
                sliderSelector = '.js-bigbrother-slider',
                sliderItemSelector = '.js-bigbrother-slider-item',
                leftButtonSelector = '.bigbrother-slider-button-left',
                rightButtonSelector = '.bigbrother-slider-button-right',
                disableButtonClass = 'npl-disabled',
                fadeSpeed = {
                    in: 200,
                    out: 200,
                    buttons: 500
                },
                buildingInterruption = false,
                paginator = {
                    page: 1,
                    num: 3,
                    getBegPosition: function() {
                        return (this.page - 1) * this.num
                    },
                    getEndPosition: function() {
                        return (this.page * this.num) - 1
                    },
                    isOnPage: function(position) {
                        var begPos = this.getBegPosition();
                        var endPos = this.getEndPosition();
                        return true;
                    },
                    onPageItems: $(),
                    offPageItems: $(),
                    animate: function() {
                        var onPageItems = this.onPageItems.filter(':hidden'), offPageItems = this.offPageItems.filter(':visible');

                        offPageItems.fadeOut(fadeSpeed.out, function() {
                            onPageItems.fadeIn(fadeSpeed.in);
                        });

                        setTimeout(setButtonStatus, fadeSpeed.buttons);
                    }
                };

                function initSlider() {
                    if (initPaginationParams()) {
                        buildPage();
                        setButtonStatus();
                        $slider.find(leftButtonSelector+':not(.'+disableButtonClass+')').on('click.widgetSlider', clickLeftButtonHandler);
                        $slider.find(rightButtonSelector+':not(.'+disableButtonClass+')').on('click.widgetSlider', clickRightButtonHandler);
                    }
                }

                function initPaginationParams()    {
                    var $sliderItems = $slider.find(sliderItemSelector),
                        $sliderBlock = $slider.find(sliderSelector),
                        sliderWidth = $sliderBlock.width(),
                        itemWidth = getSliderItemWeight(),
                        itemsMaxCount = Math.floor(sliderWidth / itemWidth),
                        itemsCount = Math.min($sliderItems.length, itemsMaxCount),
                        sliderMargin = getSliderMargin(sliderWidth, itemWidth);

                    paginator.num = itemsCount;
                    if (!paginator.num) return false;

                    $sliderBlock.css('margin-left', sliderMargin);
                    $sliderBlock.css('margin-right', sliderMargin);
                    return true;
                }

                function getSliderItemWeight()    {
                    var $sliderItem = $slider.find(sliderItemSelector).first();
                    if ($sliderItem.length) {
                        var width = $sliderItem.width(),
                            marginLeft = cssToInt($sliderItem.css('margin-left')),
                            marginRight = cssToInt($sliderItem.css('margin-right')),
                            paddingLeft = cssToInt($sliderItem.css('padding-left')),
                            paddingRight = cssToInt($sliderItem.css('padding-right'));
                        return width + marginLeft + marginRight + paddingLeft + paddingRight;
                    }
                    return 0;
                }

                function getSliderMargin(sliderWidth, itemWidth) {
                    var $sliderBlock = $slider.find(sliderSelector),
                        $sliderItems = $slider.find(sliderItemSelector);

                    if ($sliderBlock.length && $sliderItems.length) {
                        var sliderMargin = cssToInt($sliderBlock.css('margin-left')),
                            sliderMaxCount = Math.floor(sliderWidth / itemWidth),
                            sliderCount = Math.min(sliderMaxCount, $sliderItems.length),
                            sliderRealWidth = sliderCount * itemWidth,
                            additionalMargin = ~~((sliderWidth - sliderRealWidth) / 2);

                        return sliderMargin + additionalMargin;
                    }
                    return 0;
                }

                function cssToInt(value){
                    return ~~value.replace('px', '');
                }

                function buildPage() {
                    var $sliderItems = $slider.find(sliderItemSelector);
                    paginator.onPageItems = $('');
                    paginator.offPageItems= $('');
                    $sliderItems.each(function(index, domElement) {
                        if (paginator.isOnPage(index)) {
                            paginator.onPageItems = paginator.onPageItems.add(domElement);
                        } else {
                            paginator.offPageItems = paginator.offPageItems.add(domElement);
                        }
                    });
                    paginator.animate();
                }

                function setButtonStatus() {
                    var $leftButton = $slider.find(leftButtonSelector),
                        $rightButton = $slider.find(rightButtonSelector),
                        itemsCount = $slider.find(sliderItemSelector).length;

                    if (paginator.getBegPosition() > 0) {
                        enableButton($leftButton);
                    } else {
                        disableButton($leftButton);
                    }

                    if (paginator.getEndPosition() < (itemsCount -1)) {
                        enableButton($rightButton);
                    } else {
                        disableButton($rightButton);
                    }
                    buildingInterruption = false;
                }

                function disableButton($button) {
                    if (!$button.hasClass(disableButtonClass)) {
                        $button.addClass(disableButtonClass);
                    }
                }

                function enableButton($button) {
                    if ($button.hasClass(disableButtonClass)) {
                        $button.removeClass(disableButtonClass);
                    }
                }

                function disableAllButtons() {
                    var $buttons = $slider.find(leftButtonSelector + ', ' + rightButtonSelector);
                    disableButton($buttons);
                    buildingInterruption = true;
                }

                function clickLeftButtonHandler(e) {
                    if (buildingInterruption) return;

                    if (paginator.page > 1) {
                        disableAllButtons();
                        paginator.page--;
                        buildPage();
                    }

                    e.stopPropagation();
                }

                function clickRightButtonHandler(e) {
                    if (buildingInterruption) return;

                    disableAllButtons();
                    paginator.page++;
                    buildPage();

                    e.stopPropagation();
                }

                initSlider();
            });
    };
})(jQuery);

$(function() {
        var template = {
            categories: {
                itemsPattern: '#items#',
                container: '<!--<div class="bigbrother-block-cache result_cat_search" style="">' +
                        '<h2>Рекомендуем посмотреть:</h2>' +
                        '<div class="res_bl">#items#<div class="bottom_line"></div></div>' +
                        '</div>-->',
                item: '<div class="one_result_cat">' +
                        '<a href="#url#" data-id="#id#"><span class="npl-item-title">#name#</span></a>' +
                        '</div>'
            },
            products: {
                itemsPattern: '#items#',
                container: '<div class="bigbrother-block-cache js-widget-slider" style="">' +
                    '<div class="recommend-slider slider-size-element">' +
                    '<h2>Рекомендуем посмотреть:</h2>' +
                    '<div class="slider-wrapper js-bigbrother-slider">' +
                    '<div class="slides">#items#</div>' +
                    '</div>' +
                    '<div class="buttons"><span class="left-button bigbrother-slider-button-left"></span><span class="right-button bigbrother-slider-button-right"></span></div>' +
                    '</div>' +
                    '</div>' +
                    '</div>',
                item: '<div class="slider-item js-bigbrother-slider-item">' +
                    '<a href="#url#" data-id="#pid#">' +
                    '<div class="img-wrapper">' +
                    '<img src="#img#">' +
                    '</div>' +
                    '</a>' +
                    '<a href="#url#" data-id="#pid#">' +
                    '<span class="npl-item-title">#name#</span>' +
                    '</a>' +
                    '<span class="npl-category"><b>#price#</b> р.</span>' +
                    '<a href="#url#add/" class="to-basket" data-id="#pid#">' +
                    '<img src="//www.holodilnik.ru/img/add2cart2.png">' +
                    '</a>' +
                    '</div>'
            },
            specoffers: {
                itemsPattern: '#items#',
                container: '<div class="bigbrother-block-cache js-widget-slider" style="">' +
                    '<div class="recommend-slider slider-size-element">' +
                    '<h2>Cпецпредложения:</h2>' +
                    '<div class="slider-wrapper js-bigbrother-slider">' +
                    '<div class="slides_spec">#items#</div>' +
                    '</div>' +
                    '<div class="buttons"><span class="left-button bigbrother-slider-button-left"></span><span class="right-button bigbrother-slider-button-right"></span></div>' +
                    '</div>' +
                    '</div>' +
                    '</div>',
                item: '<div class="slider-item_special js-bigbrother-slider-item">' +
                    '<a class="link_spec" href="#url#" data-id="#id#">' +
                    '<span class="npl-item-title">#name#</span>' +
                    '</a>' +
                    '<a class="link_spec_img" href="#url#" data-id="#id#">' +
                    '<div class="img-wrapper">' +
                    '<img src="#picture#">' +
                    '</div>' +
                    '</a>' +
                    '<a href="#url#add/" class="to-basket" data-id="#id#">' +
                    '<img src="//www.holodilnik.ru/img/add2cart2.png">' +
                    '</a>' +
                    '</div>'
            }
        };

        if (typeof window.bigBrotherBlockCache != 'undefined') {
            restModule.setUrl('//bigbrother.holodilnik.ru/xhr/block/search/?ncat=0&nprod=6&nsp=2&blnct=2');

            for (var widgetName in window.bigBrotherBlockCache) {
                var widgetTemplate = template[widgetName],
                    widgetSelector = window.bigBrotherBlockCache[widgetName];
                var widget = widgetModule.createWidget();
                var i = 0;
                widget
                    .setTemplate(widgetTemplate)
                    .setSelector(widgetSelector)
                    .setDataPartName(widgetName)
                    .setRenderCallback(function() {
                        $(this.selector).widgetSlider();
                    })
                    .setNoDataCallback(function() {
                        $(this.selector).html('');//TODO - вернут, если надо оставить старые значени¤ было 'Ѕлок поисковых результатов: нет данных'
                        i++
                    });
                ;
                restModule.addWidget(widget);
            }
        }

        $(function() {
            var timeout = null;
            $('#form_query input').on('keydown', function(e) {
                //select yudin autocomplete lines
                var acLines = $('li', '.ac_results');
                var acLinesCount = acLines.length;
                if (acLinesCount > 0) {
                    if (e.keyCode == 40 ) {
                        $('.ac_results .selected').removeClass('selected');
                        selectedACPosition++;
                        if (selectedACPosition > acLinesCount) {
                            selectedACPosition = 1;
                        }
                        $(acLines[selectedACPosition - 1]).addClass('selected');
                    }
                    if (e.keyCode == 38 ) {
                        $('.ac_results .selected').removeClass('selected');
                        selectedACPosition--;
                        if (selectedACPosition < 1) {
                            selectedACPosition = acLinesCount;
                        }
                        $(acLines[selectedACPosition - 1]).addClass('selected');
                        //Курсор в конец
                        setTimeout(function() {
                            var searchString = $('#form_query input').val();
                            var endPos = searchString.length;
                            $('#form_query input').setCursorPosition(endPos);
                        }, 10);
                    }
                    if (e.keyCode == 13 ) {
                        var tmp = $('.ac_results .selected');
                        if (tmp.length == 1) {
                            var acSelectedText = $('.ac_results .selected a').text();
                            if (acSelectedText != $('#form_query input').val()) {
                               $('#form_query input').val(acSelectedText);
                               e.stopPropagation();
                               $("form[name='search']").submit();
                               return false;
                            }
                        }
                    }
                }
            })

            $('#form_query input').on('keyup', function(e) {
              //lock arrow up and arrow down
                if (e.keyCode == 40 || e.keyCode == 38 ) {
                return;
              }
              //Copy value to hidden field
              $("input[name=search]").val($(this).val());

              var widgetSelectors = [];
              for (var widgetName in window.bigBrotherBlockCache) {
                widgetSelectors.push(window.bigBrotherBlockCache[widgetName]);
              }
              var widgetSelectorString = widgetSelectors.join(' ,');

              if (timeout) {
                $(widgetSelectors).html('Ѕлок поисковых результатов.');
                clearTimeout(timeout);
              }

              var content = $('#form_query input[type="text"]').val(),
                isArticul = $('#form_isArticul').attr('checked') || 0, siteId = $('#form_siteId').val();
              if (content.length < 3) {
                if ($('.serch_result_bl').hasClass('active_w')) {
                  $('.serch_result_bl, #form_query').removeClass('active_w')
                }
                return false;
              }
              timeout = setTimeout(function() {
                $(widgetSelectors).html('Ѕлок поисковых результатов: загрузка...');
                restModule.setQueryString(content.trim());
                restModule.setIsArticul(isArticul);
                restModule.setSiteId(siteId);
                restModule.loadBlock();
              }, 300);
              return false;
            });
        });


        //синхронизация правок в нижнем инпуте с верхним
        $("input[name=search]").keyup(function() {
            $("#form_query input").val($(this).val());
            var re = new RegExp('^[0-9]+$', "ig");
            $('#incode2').prop('checked', re.test($(this).val()));
        })
        $("input[name=search]").change(function() {
            $("#form_query input").val($(this).val());
            $('#incode2').prop('checked', re.test($(this).val()));
        })

        $("form[name*='search']").submit(function(e) {
          //повторное заполнение, в случае вставки мышкой
          $("input[name=search]").val($("#form_query input").val());
        });
    });
})();
