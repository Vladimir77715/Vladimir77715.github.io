var menuTimer = null;
var moreTimer = null;
var menuDelay = 300;
var alertTimer = null;

// для маски телефонов на аяксовых формах
function phoneMaskAjax(selector) {
    initMask();
}

// Miele remove item
function rmMiele(id) {
    $.ajax({
        url: '/ajax/product/miele.php?product=' + id,
        method: 'delete',
        dataType: 'html'
    }).done(function(response) {
        const m = $('#modal-product-miele');
        m.modal('hide');
        setTimeout(function() { m.replaceWith(response) }, 300);
    });
}


$(function () {
    /** samsung branding slider click **/
    $('#newtop_samsung .item-product a').on('click', function(e) {
        e.preventDefault();
        try {
            gaSend('BZ_samsung', 'HomeLeadersClick');
        } catch (e) {}
        document.location.href="/brands/samsung/";
    }).attr('href', '/brands/samsung/');

    // Miele new form
    $(document).on('click', '.miele-submit',function(e){
        e.preventDefault();

        const form = $('#modal-product-miele form');
        $.ajax({
            url: '/ajax/product/miele.php',
            method: 'post',
            data: form.serialize(),
            dataType: 'json',
            beforeSend: function() {
                form.find('.is-invalid').removeClass('is-invalid');
            }
        }).done(function( json ) {
            const response = $.extend(
                { status: null, message: null, method: null},
                json
            );

            if (response.method) {
                window[response.method]( response.message );
            }
            else if ('error' === response.status) {
                let formErrors = [];
                for(let name in response.message) {
                    // form.find('[name='+name+']').addClass('is-invalid');
                    if (response.message[name]) {
                        formErrors.push(response.message[name]);
                    }
                }
                $.hruPopupMessage( formErrors.join("<br/>") )
            }
            else if ('success' === response.status) {
                form.replaceWith( response.message );
            }
        });
        return false;
    });

    $(document).on('click', function(e){
        if (alertTimer) {
            $('.hru-alert-error').removeClass('shown');
        }
        // privacy policy check
        if ($(e.target).hasClass('privacy-label-check')) {
            $(e.target).prev().trigger('click');
        }
    });

    // меню категорий
    $(".navbar-menu .dropdown")
        .on('mouseenter', function() {
            var $this = $(this);
            if (null !== menuTimer) {
                clearTimeout(menuTimer);
            }
            menuTimer = setTimeout(function(){
                $this.find('.dropdown-menu').stop(true, true).fadeIn(300);
            }, menuDelay);
        }).on('mouseleave', function() {
            if (null !== menuTimer) {
                clearTimeout(menuTimer);
            }
            $(this).find('.dropdown-menu').stop(true, true).fadeOut(300);
        });

    // меню ещё
    $('.dropdown.link-more').on('mouseenter', function(){
        if (null !== moreTimer) {
            clearTimeout(moreTimer);
        }
    }).on('mouseleave', function(){
        if ($(this).hasClass('show')) {
            var $this = $(this);
            moreTimer = setTimeout(function(){
                $this.find('.dropdown-toggle')[0].click();
            }, 750);
        }
    });

    // категории
    const match = document.cookie.match(new RegExp('(^| )region_position_nn=([^;]+)'));
    const clientRegion = !!match ? match[2] : 1;
    var container = $('.navbar-menu .dropdown');

    $.getJSON({
        url: '/i/cache/catsmenu/categories_' + clientRegion + '.json',
    }).done(function( json ) {
        var i         = 0;
        var counter   = 0;
        var innerHtml = '';

        if (!json || !json.length) {
            return console.log('You have an error in categories json');
        }

        var length = json[counter].length;
        if (!length) return;
        while ( i <= length ) {
            var category = json[counter][i];
            if(!category){
                i++;
                continue;
            }
            innerHtml += '<a id="cm-' + category.id + '" href="' + category.href + '" class="card card-columns-title '+category.style+'">'+category.title+'</a>'
            for(var j = 0; j < category.items.length; j++) {
                innerHtml += '<a id="cm-' + category.items[j].id + '" href="'+category.items[j].href+'" class="card '+category.items[j].style+'">'+category.items[j].title+'</a>';
            }
            i++;
            if (json[counter].length - i < 1) {
                $(container[counter]).append(
                    '<div class="dropdown-menu"><div class="card-columns">'
                    + innerHtml
                    + '</div></div>'
                );
                if (typeof json[ ++counter ] === 'undefined') {
                    break;
                }
                length    = json[counter].length;
                innerHtml = "";
                i = 0;
            }
        }
    });

    /*   PREVENT DEFAULT   */
    $(document).on('click', '.null-click',function(e){
        e.preventDefault();
        return false;
    });

    /*   AJAX MODAL CALL   */
    $(document).on('click', '.modal-ajax-call', function(e) {
        e.preventDefault();
        e.stopPropagation();

        var multiCall   = $(this).data('multi');
        var data        = $(this).data();
        var selector    = data.target;

        $('.hru-modal.show').modal('hide');

        if (0 == $(selector).length) {

            var parts  = selector.replace('#modal-', '').split('-');
            var path   = '/ajax/' + parts.shift() + '/' + parts.join('-') + '.php';
            var params = {};
            for (var name in data) {
                var real = name.split(/(?=[A-Z])/).join('_').toLowerCase();
                params[real] = data[name];
            }

            $.ajax({
                url: path,
                data: params,
                dataType: 'html',
                method: 'post'
            }).done(function(response) {
                $('body').append(response);

                $(selector).modal('show').on('hide.bs.modal', function() {
                    $(selector).find('.is-invalid').removeClass('is-invalid');
                }).on("hidden.bs.modal", function () {
                    if (multiCall) {
                        $(this).remove();
                    }
                }).on('shown.bs.modal', function(){
                    setTimeout(function(){
                        $('body').addClass('modal-open');
                    }, 300);
                });

                // bind form submit
                $(selector).find('form').hruAjaxSubmit( path );

            }).fail(function(){
                console.log('Error in modal-ajax-call');
            });
        }
    });

    /* Display filters  */
    $(document).on('click', '#filter-show', function( e ) {
        e.preventDefault();
        $('.catalog-view.view-filter-on .item-select').addClass('shown');
        $('body').addClass('state-overflow');
    });

    $(document).on('click', '#filter-close', function( e ) {
        e.preventDefault();
        $('.catalog-view.view-filter-on .item-select').removeClass('shown');
        $('body').removeClass('state-overflow');
    });

    $(window).on('resize', function() {
        if ($(this).width() > 820) {
            $('.catalog-view.view-filter-on .item-select').removeClass('shown');
            $('body').removeClass('state-overflow');
        }
    });
});

/* forward user to cp */
function userMoveToCp() {
    document.location.href = '/usercp/';
}

function showLoginForm() {
    $('#hru-top-login-link').first().click();
}

function closeModal() {
    $('.hru-modal.show').modal('hide');
}

function showModalReview (product_id) {
    $('.hru-modal.show').modal('hide');
    $('[data-target="#modal-product-review"]').first().click();
    //hruAjaxCall('/ajax/product/review.php?product_id=' + product_id, {});
}

function hruAjaxCall(path, params) {
    $.ajax({
        url: path,
        data: params,
        dataType: 'html',
        method: 'post'
    }).done(function(response) {
        $('body').append(response);
    });
}

function collapseTerms(el) {
    el = $(el);
    if (el.hasClass('collapse-link')) {
        if (el.hasClass('collapsed')) {
            el.text('Свернуть');
        } else {
            el.text('Подробнее');
        }
    }
    return false;
}

/* bind submit form */
(function ( $ ) {

    $.fn.hruAjaxSubmit = function( path ) {
        var form = $(this);

        form.find('input[type="tel"]').each(function() {
            phoneMaskAjax(this);
        });

        form.off('submit').on('submit', function(e) {
            e.preventDefault();

            $.ajax({
                url: path,
                method: 'post',
                data: form.serialize(),
                dataType: 'json',
                beforeSend: function() {
                    form.find('.is-invalid').removeClass('is-invalid');
                }
            }).done(function( json ) {
                var response = $.extend(
                    { status: null, message: null, method: null},
                    json
                );
                if (response.method) {
                    window[response.method]( response.message );
                }
                else if ('error' == response.status) {
                    var formErrors = [];
                    for(var name in response.message) {
                        form.find('[name='+name+']').addClass('is-invalid');

                        if (response.message[name]) {
                            formErrors.push(response.message[name]);
                        }
                    }
                    $.hruPopupMessage( formErrors.join("<br/>") )
                }
                else if ('success' == response.status) {
                    form.replaceWith( response.message );
                }
            });
        });
        return form;
    }

    /* alert message */
    $.hruPopupMessage = function( message ) {
        var hruAlert = $('.hru-alert-error');
        if (! hruAlert.length) {
            hruAlert = $('<div class="hru-alert-error"><div class="d-flex justify-content-center"></div><button type="button" class="close" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>');
            $('body').append(hruAlert);
        }
        hruAlert.find('.d-flex').html( message );

        if (alertTimer) {
            clearTimeout(alertTimer);
        }

        setTimeout(function(){
            hruAlert.addClass('shown');
            alertTimer = setTimeout(function() {
                hruAlert.removeClass('shown');
            }, 5000);
        },100);
    }
})(jQuery);
