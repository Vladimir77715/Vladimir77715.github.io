/**
 * Created by s10 on 15/11/17
 */

;(function($){

    $.fn.sideNavigation = function( options ) {

        var resizeTimer;
        var lockClick = false;
        var blockNumber = 0;
        var $this = $(this);
        var $body = $('body');

        var defaults = {
            show_class: 'm-side_state-visible',
            hide_class: '',
            // ham_selector: '.icon-hamburger',
            // close_selector: '.icon-close',
            nav_parent: '.nav-parent',
            side_content:  '.m-side-content',
            state: 'm-side-content_state-visible',
            nav_ajax:   '.nav-ajax',
            nav_back:   '.nav-back',
        };

        var o = $.extend(defaults, options || {});

        function _showBlock(elem) {
            $(elem).addClass(o.state);
            setTimeout(function() { lockClick = false;}, 300);
        }

        function _hideBlock(elem) {
            $(elem).removeClass(o.state);
            setTimeout(function() { lockClick = false;}, 300);
        }

        function _buildList(data) {
            var ul = $('<ul/>');
            $.each(data, function(key, obj) {
                var li = $('<li/>')
                    .addClass(o.nav_ajax.substr(1))
                    .addClass(obj.ProductCount > 0 ? '' : o.nav_parent.substr(1))
                    .addClass('category-level-' + obj.CategoryLevel)
                    .attr('data-category', obj.CategoryID)
                    .attr('data-current-id', ++blockNumber)
                    .append(
                        $('<a/>').attr('href', obj.CategoryHref).attr('class', 'prop_' + obj.CategoryAlias).text(obj.CategoryName)
                    );
                ul.append(li);
            });
            return ul;
        }

        function _renderBlock(li, ul) {
            var parent_id  = parseInt(li.parents(o.side_content).attr('data-current-id'));
            var current_id = parseInt(li.attr('data-current-id'));

            if (ul.length) {
                var div = $('<div/>')
                    .addClass('m-side-content')
                    .attr('data-current-id', current_id);
                /*
                if ($(ul).find('li.nav-parent').length > 0) {
                    let classes = 'm-side-content-parent';
                    if ($(li).hasClass('catalog_menu')) {
                        classes += '-0';
                    } else if ($(li).hasClass('category-level-1')) {
                        classes += '-1';
                    } else if ($(li).hasClass('category-level-2')) {
                        classes += '-2';
                    } else if ($(li).hasClass('category-level-3')) {
                        classes += '-3';
                    } else if ($(li).hasClass('category-level-4')) {
                        classes += '-4';
                    }
                    div.addClass(classes);
                }
                */
                ul.prepend(
                    '<li class="back-link"><a href="#" data-parent-id="{{parent_id}}">{{title}}</a></li>'
                        .replace('{{title}}', li.children('a').text())
                        .replace('{{parent_id}}', parent_id.toString())
                );

                div.append(ul);
                $this.append(div);
            }
        }

        function _getAjaxData(category_id) {
            return $.ajax({
                url: '/ajax/getSubCategories.php',
                method: 'get',
                data: {category_id: category_id}
            })
        }

        // copy region list from bottom to head for navigation
        let regListBtm = $('#regList');
        let reglistTop = $('#reglistTop');
        if (regListBtm.length>0 && reglistTop.length>0) {
          reglistTop.html(regListBtm.html());
        }

        // hide all at start
        if (!$this.hasClass(o.hide_class)) {
            $this.addClass(o.hide_class)
        }

        // open navigation
        $this.showEvent = function() {
            $this.addClass(o.show_class);
            $body.addClass('state-overflow');
        };

        // close navigation
        $this.hideEvent = function() {
            $this.removeClass(o.show_class);
            // $this.find('.m-side-content').removeClass(o.state);
            $body.removeClass('state-overflow');
        };

        // build catalog
        $this.buildEvent = function (targetElement) {
            var a   = targetElement;
            var li  = targetElement.parent();
            var id  = li.attr('data-current-id');
            var dfd = $.Deferred();

            // ajax if needed
            if (li.hasClass(o.nav_ajax.substr(1)) && 0 === $this.find(o.side_content + '[data-current-id='+id+']').length) {
                _getAjaxData(
                    li.attr('data-category')
                ).done(function(json) {
                    var data = JSON.parse(json);
                    var ul   = _buildList(data);
                    if (data.length) {

                        _renderBlock(li, ul);

                        // delay for the first time
                        setTimeout(function() {
                            dfd.resolve();
                        }, 200);
                    } else {
                        document.location.href = a.attr('href');
                    }
                }).fail(function() {
                    document.location.href = a.attr('href');
                });
            } else {
                dfd.resolve();
            }

            // rotate block
            $.when(dfd).then(function() {
                var child  = $this.find(o.side_content + "[data-current-id="+id+"]");
                _showBlock(child);
            });
        };

        // close icon
        /*
        $this.find(o.close_selector).on('click', function(e){
            e.preventDefault();
            $this.hideEvent();
            setTimeout(function() {
                $this.find(o.side_content).removeClass(o.show_class + ' ' + o.hide_class).first().addClass(o.show_class);
            }, 400);
        });
        */

        // hamburger icon
        // $this.find(o.ham_selector).on('click', function (e){
        //     e.preventDefault();
        //     $this.find(o.side_content).removeClass(o.show_class).removeClass(o.hide_class).first().addClass(o.show_class);
        // });

        // render first block
        var first =
            $('<div/>')
                .addClass((o.side_content).substr(1))
                .attr('data-current-id', ++blockNumber)
                .append($this.find('ul').first().remove());

        $this.append(first);

        // render others
        $this.find('li').each(function() {
            var li = $(this);
            var ul = li.find('ul');
            if (ul.length || li.hasClass(o.nav_ajax.substr(1))) {
                li.addClass(o.nav_parent.substr(1)).attr('data-current-id', ++blockNumber);
                _renderBlock(li, ul);
            }
        });

        // back link click
        $this.on('click', o.side_content + ' .back-link > a', function(e){
            e.preventDefault();

            var id = parseInt($(this).attr('data-parent-id'));

            if (id) {
                var current = $(this).parents(o.side_content);
                _hideBlock(current);
            } else {
                $this.hideEvent();
                setTimeout(function() {
                    $this.find(o.side_content).removeClass(o.show_class + ' ' + o.hide_class).first().addClass(o.show_class);
                }, 400);
            }
        });

        // menu click
        $this.on('click', o.nav_parent + ' > a', function(e) {

            if (lockClick) {
                return false;
            } else {
                lockClick = true;
            }

            e.preventDefault();

            $this.buildEvent($(this));
        });

        $this.data('navigation', {
            show: $this.showEvent,
            hide: $this.hideEvent,
            build: $this.buildEvent
        });
        return $this;
    }

}( jQuery ));


$(function(){
    const sideNavigation = $('#side-navigation').sideNavigation();

    $(window).on('resize', function() {
        if ($(this).width() > 820) {
            if ($('#side-navigation').hasClass('m-side_state-visible')) {
                sideNavigation.hideEvent();

                $('.m-side-content').removeClass('m-side-content_state-visible');

                $('.navbar-toggler:first').removeClass('active');
            }
        }
    });

    $('.navbar-catalog').on('click', function (e) {
        e.preventDefault();

        $('html, body').animate({
            scrollTop: $('.hru-header').offset().top
        }, 400);

        sideNavigation.buildEvent($('.catalog_menu a'));
        sideNavigation.showEvent();
        $('.m-side-content[data-current-id=1]').addClass('m-side-content_state-visible');
        $('.m-side-content[data-current-id=3]').addClass('m-side-content_state-visible');

        $('[data-lazy="image"]').lazy();
        $('.navbar-toggler:first').toggleClass('active');
    });

    $('.navbar-toggler').on('click', function (e) {
        e.preventDefault();

        $('html, body').animate({
            scrollTop: $('.hru-header').offset().top
        }, 400);


        if ($('#side-navigation').hasClass('m-side_state-visible')) {
            sideNavigation.hideEvent();
        } else {
            sideNavigation.showEvent();

            $('.m-side-content[data-current-id=1]').addClass('m-side-content_state-visible');
        }

        $('[data-lazy="image"]').lazy();
        $('.navbar-toggler:first').toggleClass('active');
    });

    $('.nav-reload').on('click', function(e) {
        window.scrollTo(0, 0);
        setTimeout(function(){ location.reload(); }, 500);
    })
});
