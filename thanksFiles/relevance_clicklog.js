var rr = rr || {};
jQuery.loadScript = function (url, callback) {
    jQuery.ajax({
        url: url,
        dataType: 'script',
        success: callback,
        async: true
    });
};
rr.log_click = function (url) {
    var img = new Image();
    img.src = url;
    return true;
};

$(document).ready(function () {
    /*getRecommends*/
    var rrHref = $('#rr').attr('data-href');
    if (document.documentElement.clientWidth < 1350) {
        rrHref = rrHref + "&crosssell=horizontal";
    }
    if(rrHref != undefined){
        $.ajax ({
            url: "/ajax/getRecommends.php?" + rrHref,
            dataType: "json",
            success: function (data) {
                if (typeof (globalRichResponse) != 'undefined') {
                    globalRichResponse = data;
                }

                $.each(data, function(key, val){
                    $(('#' + key)).html(val);
                });

                $('.slider-recommend .swiper-container').each(function() {
                    var swContainer = $(this);
                    var swParent = swContainer.parents('.slider-recommend');
                    var swWrapper = swContainer.find('.swiper-wrapper');
                    var swSlide = swContainer.find('.swiper-slide').length;

                    if (swSlide) {
                        swParent.show();

                        if (swParent.hasClass('type-horizontal') && !swWrapper.is(':empty')) {
                            new Swiper(swContainer, {
                                lazy: true,
                                slidesPerView: 6,
                                slidesPerGroup: 1,
                                spaceBetween: 20,
                                breakpoints: {
                                    1560: {
                                        slidesPerView: 5,
                                        spaceBetween: 20,
                                    },
                                    1310: {
                                        slidesPerView: 4,
                                        spaceBetween: 20,
                                    },
                                    1050: {
                                        slidesPerView: 3,
                                        spaceBetween: 20,
                                    },
                                    785: {
                                        slidesPerView: 2,
                                        spaceBetween: 20,
                                    },
                                    535: {
                                        slidesPerView: 1,
                                        spaceBetween: 0,
                                    }
                                },
                                navigation: {
                                    nextEl: swContainer.next(),
                                    prevEl: swContainer.prev(),
                                },
                                watchOverflow: true,
                            });
                        } else if (swParent.hasClass('type-vertical') && !swWrapper.is(':empty')) {
                            new Swiper(swContainer, {
                                lazy: true,
                                direction: 'vertical',
                                slidesPerView: swSlide === 1 ? 1 : 2,
                                slidesPerGroup: swSlide === 1 ? 1 : 2,
                                spaceBetween: 20,
                                navigation: {
                                    nextEl: swContainer.next(),
                                    prevEl: swContainer.prev(),
                                },
                                watchOverflow: true,
                            });
                        }
                    } else {
                        swParent.hide();
                    }
                });
            }
        });
    }
});
