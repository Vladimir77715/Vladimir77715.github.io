$(function() {
    $('.dropdown.link-brands').on('show.bs.dropdown', function () {
        $('[data-lazy="image"]').lazy();
    });
});

$(function() {
    var myDefaultWhiteList = $.fn.popover.Constructor.Default.whiteList;

// To allow table elements
    myDefaultWhiteList.table = [];
    myDefaultWhiteList.thead = [];
    myDefaultWhiteList.tbody = [];
    myDefaultWhiteList.th = [];
    myDefaultWhiteList.tr = [];
    myDefaultWhiteList.td = [];
    myDefaultWhiteList.input = ['type'];
    myDefaultWhiteList.label = ['for'];
    myDefaultWhiteList.span = ['title'];

    var popoverTpl = '<div class="popover" role="tooltip"><div class="arrow"></div><div class="popover-close" data-dismiss="popover" aria-hidden="true"></div><div class="popover-body"></div></div>';

    $(document).on('click', '[data-toggle="popover"], [data-popover-service]', function (e) {
        $('.popover').each(function() {
            $(this).popover('hide');
        });
        $(this).popover('show');
        e.stopPropagation();
    });

    $(document).on('click', '.popover', function(e) {
        e.stopPropagation();
    });

    $(document).on('click', function() {
        $('.popover').popover('hide');
    });

    $(document).on('click', '.popover-close', function(e){
        e.stopPropagation();
        $('.popover').popover('hide');
    });

    $('[data-popover-content]').popover({
        trigger: 'manual',
        placement: function() {
            return $(this.element).attr('data-placement') || 'auto';
        },
        fallbackPlacement : [],
        html: true,
        template: popoverTpl,
        content: function () {
            var content = $(this).attr("data-popover-content");
            return $(content).html();
        }
    });

    $('[data-popover-service]').on('shown.bs.popover', function () {
        if($('.popover').length == 1) {
            if($(document).scrollTop() > $('.popover').position().top && $('.popover').position().top > 0){
                window.location.hash = '#' + $('.popover').attr('id');
            }
        }
    });
});

$(function() {
    // breakpoint where swiper will be destroyed
    var breakpoint = window.matchMedia( '(min-width:821px)' );

    // keep track of swiper instances to destroy later
    var mySwiper;

    var breakpointChecker = function() {

        // if larger viewport and multi-row layout needed
        if ( breakpoint.matches === true ) {

            // clean up old instances and inline styles when available
            if ( mySwiper !== undefined ) mySwiper.destroy( true, true );

            // or/and do nothing
            return;

            // else if a small viewport and single column layout needed
        } else if ( breakpoint.matches === false ) {

            // fire small viewport version of swiper
            return enableSwiper();
        }

    };

    var enableSwiper = function() {

        mySwiper = new Swiper ('.breadcrumb-wrapper .swiper-container', {
            slidesPerView: 'auto',
            a11y: true,
            keyboardControl: true,
            grabCursor: true,
        });

        // Dom7 array-like collection of slides HTML elements
        var collections = mySwiper.slides;
        // Length of a JavaScript object
        var counter = Object.keys(collections).length;

        // Run transition to the slide with index number equal to 'index' parameter for the duration equal to 'speed' parameter.
        mySwiper.slideTo(counter);
    };

    $('.breadcrumb-wrapper .swiper-container').each(function(){
        // keep an eye on viewport size changes
        breakpoint.addListener(breakpointChecker);

        // kickstart
        breakpointChecker();
    });
});

$(function() {
    $('.home-page .swiper-actions .swiper-container').each(function(){
        var swContainer = $(this);

        new Swiper(swContainer, {
            loop: false,
            lazy: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            simulateTouch: false,
            breakpoints: {
                959: {
                    simulateTouch: true
                }
            },
            navigation: {
                nextEl: swContainer.prev(),
                prevEl: swContainer.next(),
            },
            watchOverflow: true,
        });
    });
    $('.home-page .columns-sliders .swiper-container').each(function(){
        var swContainer = $(this);
        var swSlide = swContainer.find('.swiper-slide').length;

        new Swiper(swContainer, {
            lazy: true,
            slidesPerView: 2,
            slidesPerGroup: swSlide > 2 ? 2 : 1,
            spaceBetween: 30,
            simulateTouch: false,
            loop: swSlide > 1 ? 1 : 0,
            breakpoints: {
                1220: {
                    slidesPerView: 3,
                    slidesPerGroup: swSlide > 3 ? 3 : 1,
                },
                830: {
                    slidesPerView: 2,
                    slidesPerGroup: swSlide > 2 ? 2 : 1,
                    spaceBetween: 20,
                },
                400: {
                    slidesPerView: 1,
                    slidesPerGroup: 1,
                    spaceBetween: 0,
                }
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: swContainer.prev(),
                prevEl: swContainer.next(),
            },
            watchOverflow: true,
        });
    });
    $('.home-page .swiper-services .swiper-container').each(function(){
        var swContainer = $(this);
        var swSlide = swContainer.find('.swiper-slide').length;

        new Swiper(swContainer, {
            slidesPerView: 3,
            spaceBetween: 15,
            loop: swSlide > 1 ? 1 : 0,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            breakpoints: {
                1366: {
                    spaceBetween: 20,
                    slidesPerView: 3,
                },
                1280: {
                    spaceBetween: 25,
                    slidesPerView: 3,
                },
                1100: {
                    spaceBetween: 20,
                    slidesPerView: 2,
                },
                560: {
                    slidesPerView: 1,
                },
            },
            // lazy: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                dynamicBullets: true,
            },
            navigation: {
                nextEl: swContainer.prev(),
                prevEl: swContainer.next(),
            },
            watchOverflow: true,
        });
    });
    $('.home-page .swiper-we-better .swiper-container').each(function(){
        var swContainer = $(this);

        new Swiper(swContainer, {
            slidesPerView: 'auto',
            spaceBetween: 30,
            preloadImages: false,
            watchSlidesVisibility: true,
            lazy: {
                loadPrevNext: true,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                dynamicBullets: true,
            },
            navigation: {
                nextEl: swContainer.prev(),
                prevEl: swContainer.next(),
            },
            watchOverflow: true,
        });
    });

    $('.swiper-brands .swiper-container').each(function(){
        var swContainer = $(this);
        var swSlide = swContainer.find('.swiper-slide').length;

        new Swiper(swContainer, {
            slidesPerView: 7,
            spaceBetween: 50,
            loop: swSlide > 7,
            breakpoints: {
                1220: {
                    slidesPerView: 6,
                    spaceBetween: 50,
                },
                994: {
                    slidesPerView: 5,
                    spaceBetween: 50,
                },
                820: {
                    slidesPerView: 5,
                    spaceBetween: 20,
                },
                790: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                },
                610: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                }
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                dynamicBullets: true,
            },
            navigation: {
                nextEl: swContainer.prev(),
                prevEl: swContainer.next(),
            },
            watchOverflow: true,
        });
    });
    $('.swiper-action-brands .swiper-container').each(function(){
        var swContainer = $(this);
        var swSlide = swContainer.find('.swiper-slide').length;

        new Swiper(swContainer, {
            loop: swSlide > 1 ? 1 : 0,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: swContainer.prev(),
                prevEl: swContainer.next(),
            },
            watchOverflow: true,
            /*on: {
                init() {
                    this.el.addEventListener('mouseenter', () => {
                        this.autoplay.stop();
                    });

                    this.el.addEventListener('mouseleave', () => {
                        this.autoplay.start();
                    });
                    }
            }*/
        });
    });
    $('.swiper-catalog .swiper-container').each(function(){
        var swContainer = $(this);

        new Swiper(swContainer, {
            slidesPerView: 4,
            loop: true,
            spaceBetween: 8,
            breakpoints: {
                1140: {
                    slidesPerView: 3,
                },
                880: {
                    slidesPerView: 2,
                    spaceBetween: 8,
                },
                820: {
                    slidesPerView: 2,
                    spaceBetween: 0,
                }
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            simulateTouch: false,
            navigation: {
                nextEl: swContainer.prev(),
                prevEl: swContainer.next(),
            },
            watchOverflow: true,
        });
    });

    $('.swiper-accessories .swiper-container').each(function(){
        var swContainer = $(this);

        new Swiper(swContainer, {
            slidesPerView: 4,
            spaceBetween: 8,
            breakpoints: {
                1140: {
                    slidesPerView: 3,
                },
                880: {
                    slidesPerView: 2,
                    spaceBetween: 8,
                },
                820: {
                    slidesPerView: 2,
                    spaceBetween: 0,
                }
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            simulateTouch: false,
            navigation: {
                nextEl: swContainer.prev(),
                prevEl: swContainer.next(),
            },
            watchOverflow: true,
        });
    });

    $('.swiper-leaders-sells .swiper-container').each(function(){
        var swContainer = $(this);
        var swSlide = swContainer.find('.swiper-slide').length;

        new Swiper(swContainer, {
            slidesPerView: 6,
            loop: swSlide > 6 ? 1 : 0,
            spaceBetween: 6,
            breakpoints: {
                1550: {
                    slidesPerView: 5,
                    spaceBetween: 6,
                    loop: swSlide > 5 ? 1 : 0,
                },
                1290: {
                    slidesPerView: 4,
                    spaceBetween: 6,
                    loop: swSlide > 4 ? 1 : 0,
                },
                1050: {
                    slidesPerView: 3,
                    spaceBetween: 6,
                    loop: swSlide > 3 ? 1 : 0,
                },
                820: {
                    slidesPerView: 3,
                    spaceBetween: 0,
                    loop: swSlide > 3 ? 1 : 0,
                },
                720: {
                    slidesPerView: 2,
                    spaceBetween: 0,
                    loop: swSlide > 2 ? 1 : 0,
                },
                480: {
                    slidesPerView: 1,
                    spaceBetween: 0,
                    loop: true,
                }
            },
            navigation: {
                nextEl: swContainer.prev(),
                prevEl: swContainer.next(),
            },
            watchOverflow: true,
        });
    });

    $('.about-page .swiper-our-awards .swiper-container').each(function(){
        var swContainer = $(this);

        new Swiper(swContainer, {
            slidesPerView: 'auto',
            spaceBetween: 30,
            preloadImages: false,
            watchSlidesVisibility: true,
            lazy: {
                loadPrevNext: true,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                dynamicBullets: true,
            },
            navigation: {
                nextEl: swContainer.prev(),
                prevEl: swContainer.next(),
            },
            watchOverflow: true,
        });
    });

    $('.articles-page .swiper-ch .swiper-container').each(function(){
        var swContainer = $(this);

        var mySwiper = new Swiper(swContainer, {
            spaceBetween: 15,
            navigation: {
                nextEl: swContainer.prev(),
                prevEl: swContainer.next(),
            },
            watchOverflow: true,
        });

        $('#accordionHome').on('shown.bs.collapse', function () {
            mySwiper.update();
        })
    });

    $('.swiper-work-use .swiper-container').each(function(){
        var swContainer = $(this);
        var swSlide = swContainer.find('.swiper-slide').length;

        new Swiper(swContainer, {
            slidesPerView: 8,
            spaceBetween: 30,
            loop: swSlide > 8 ? 1 : 0,
            breakpoints: {
                1480: {
                    slidesPerView: 7
                },
                1280: {
                    slidesPerView: 6
                },
                1024: {
                    slidesPerView: 5
                },
                960: {
                    slidesPerView: 4
                },
                640: {
                    slidesPerView: 3
                },
                480: {
                    slidesPerView: 2
                }
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: swContainer.prev(),
                prevEl: swContainer.next(),
            },
            watchOverflow: true,
        });
    });
});

$(function() {
    $('.p-i-tile').each(function () {
       var product = $(this).find('.p-i-tile-overlay'),
           productTitle = product.find('.p-i-tile-title'),
           productTitleHeight = 50,
           triggerProductTitle = false,
           productComparison = product.find('.tools-comparison');

        if (productTitle.children().height() > productTitle.height() && productTitle.children().height() > productTitleHeight) {
            productTitle.removeClass('active');
        } else {
            productTitle.addClass('active');
        }

        product.on({
            mouseenter: function () {
                if (productTitle.children().height() > productTitle.height() && productTitle.children().height() > productTitleHeight) {
                    triggerProductTitle = true;

                    productTitle.animate({
                        height: productTitle.children().height(),
                        maxHeight: productTitle.children().height()
                    }, 300)
                }
                productTitle.addClass('active')
            },
            mouseleave: function () {
                if (triggerProductTitle) {
                    productTitle.animate({
                        height: productTitleHeight,
                        maxHeight: productTitleHeight
                    }, 200);

                    triggerProductTitle = false;
                    productTitle.removeClass('active')
                }
            }
        });

        productComparison.on('click', function () {
            var $this = $(this);

            if (!$this.hasClass('active')) {
                $(this).addClass('active');
            } else {
                $this.removeClass('active');
            }
        });
    });

    $('.preview-product').each(function () {
        var $thisProduct = $(this),
            $thisTitle = $thisProduct.find('.product-name'),
            $triggerTitle = false,
            $defaultTitleHeight = 45,
            $popoverComparison = $thisProduct.find('.icon-hru-note-comparison');

        if ($thisTitle.children().height() > $thisTitle.height() && $thisTitle.children().height() > 45) {
            $thisTitle.removeClass('active')
        } else {
            $thisTitle.addClass('active')
        }

        $thisProduct.on({
            mouseenter: function () {
                if ($thisTitle.children().height() > $thisTitle.height() && $thisTitle.children().height() > 45) {
                    $triggerTitle = true;

                    $thisTitle.animate({
                        height: $thisTitle.children().height(),
                        maxHeight: $thisTitle.children().height()
                    }, 300)
                }
                $thisTitle.addClass('active')
            },
            mouseleave: function () {
                if ($triggerTitle) {
                    $thisTitle.animate({
                        height: $defaultTitleHeight,
                        maxHeight: $defaultTitleHeight
                    }, 200);

                    $triggerTitle = false;
                    $thisTitle.removeClass('active')
                }
            }
        });

        $popoverComparison.on('click', function () {
            var $this = $(this);

            if (!$this.hasClass('active')) {
                $(this).addClass('active');
            } else {
                $this.removeClass('active');
            }
        });
    });
});

$(function() {
    $(window).scroll(function () {
        if( $(this).scrollTop() > 400) {
            $('.scroll-up').addClass('show');
        }
        else {
            $('.scroll-up').removeClass('show');
        }
    });
    $('.scroll-up').on('click', function () {
        $('html, body').stop().animate({scrollTop: 0}, 'slow', 'swing');
    });
});


$(function() {
    /*      ����� � header Accordion */
    var containerAccordionAbout = $('#accordionAbout');
    if (containerAccordionAbout.length > 0) {
        containerAccordionAbout.on('shown.bs.collapse', function(e) {
            window.location = '#' + e.target.previousElementSibling.id;
        });
    }

    var containerAccordionHome = $('#accordionHome');
    if (containerAccordionHome.length > 0) {
        containerAccordionHome.on('shown.bs.collapse', function(e) {
            window.location = '#' + e.target.previousElementSibling.id;
        });
    }

    var containerAccordionAction = $('#accordionAction');
    if (containerAccordionAction.length > 0) {
        containerAccordionAction.on('shown.bs.collapse', function(e) {
            window.location = '#' + e.target.previousElementSibling.id;
        });
    }

    var containerAccordionCardProduct = $('#accordionCardProduct');
    if (containerAccordionCardProduct.length > 0) {
        containerAccordionCardProduct.on('shown.bs.collapse', function(e) {
            window.location = '#' + e.target.previousElementSibling.id;
        });
    }

    /* ����� ���������� ���� - ����� */
    $('#modal-sign-in').on('show.bs.modal', function () {
        $('#modal-restore-password').modal('hide');
        $('#modal-check-in').modal('hide');
    });
    /* ������� ���������� ���� - ����� */
    $('#modal-sign-in').on('shown.bs.modal', function () {
        $('body').addClass('modal-open');
    });

    /* ����� ���������� ���� - ������ ������ */
    $('#modal-restore-password').on('show.bs.modal', function () {
        $('#modal-sign-in').modal('hide');
        $('#modal-check-in').modal('hide');
    });
    /* ������� ���������� ���� - ������ ������ */
    $('#modal-restore-password').on('shown.bs.modal', function () {
        $('body').addClass('modal-open');
    });

    /* ����� ���������� ���� - ����������� */
    $('#modal-check-in').on('show.bs.modal', function () {
        $('#modal-sign-in').modal('hide');
    });
    /* ������� ���������� ���� - ����������� */
    $('#modal-check-in').on('shown.bs.modal', function () {
        $('body').addClass('modal-open');
    });

    /* fancybox - media  */
    if (typeof $.fn.fancybox !== 'undefined') {
        $('.fancybox-media').fancybox({
            openEffect  : 'none',
            closeEffect : 'none',
            helpers : {
                media : {}
            }
        });
    }

    /* ��������� - tooltip */

    $('[data-toggle="tooltip"]').tooltip({
        trigger: 'hover',
        offset: 0,
        // container: '.view-list-col'
    });

    var currentPathName = window.location.pathname;
    var currentHash = window.location.hash;
    var currentLocation = currentPathName + currentHash;

    if (currentLocation === '/action/') {
        $('#accordionAction #collapseActions').collapse('show');
    } else if (currentLocation === '/action/leaders/') {
        $('#accordionAction #collapseSalesLeaders').collapse('show');
    } else if (currentLocation === '/action/new/') {
        $('#accordionAction #collapseReviewsNewProducts').collapse('show');
    } else if (currentLocation === '/about/#item-certificates') {
        $('#accordionAbout #collapse�ertificates').collapse('show');
    }
});
