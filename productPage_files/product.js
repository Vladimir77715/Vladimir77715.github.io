var isMobile = {
  Android: function(){ return navigator.userAgent.match(/Android/i); },
  BlackBerry: function() { return navigator.userAgent.match(/BlackBerry/i); },
  iOS: function() {    return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
  Opera: function() {  return navigator.userAgent.match(/Opera Mini/i); },
  Windows: function(){ return navigator.userAgent.match(/IEMobile/i); },
  any: function() {
    return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
  }
};

//var sizeElem_def = 3; // global variable size element horizont slider page KT

$(document).ready(function(){
    showUp();
    $(window).scroll(function() {
      if($(this).scrollTop() > 500) {
        $('#upper').fadeIn();
      } else {
        $('#upper').fadeOut();
      }
    });
    $('#upper').click(function() {
      $('body,html').animate({scrollTop:0},600);
    });

    page_all = Math.ceil($("#acs").attr("data-num")/12);

    $(document).on('click', '.cat', function(){
      cat = this.id;
      get_p_all(cat);
    });

    $(document).on('click','.pp_a', function(){
      page = this.id;
      get_prd_list(page, cat, page_all);
    });

    $('#acs').click(function() {
      if (!has_acs) {
        get_prd_list(1, cat, page_all);
        has_acs = true;
      }
    });
    $('#sim').click(function() {
      if (!has_sim) {
        get_sim_list();
        has_sim = true;
      }
    });
    $('#cert').click(function() {
      if (!has_cert) {
        get_cert_list();
        has_cert = true;
      }
    });

// ###### adaptive tabs click      ########
    $('#compactAccessories').click(function() {
      if (!has_acs) {
        get_prd_list(1, cat, page_all);
        has_acs = true;
      }
    });
    $('#compactSimilar').click(function() {
      if (!has_sim) {
        get_sim_list();
        has_sim = true;
      }
    });
    $('#compactCert').click(function() {
      if (!has_cert) {
        get_cert_list();
        has_cert = true;
      }
    });


    if ("#reviews" == window.location.hash) {
        if (isMobile.any()) {
            $('#headingReviews').click();
        } else {
            $('#rev').click();
        }
    }

    // Включить закладку с отзывами
    $(".rating_info").on('click', function(e) {
        if (isMobile.any()) {
            $('#headingReviews').click();
        } else {
            $('#rev').click();
        }
    });


    window.tab_hit_first_time = true;
    var tabContainers = $('div.product_content > div.det-content');
    tabContainers.hide().filter(':first').show();

    let HG = $('div.det-content').height();
    $('div.tth_wr div.rt_brd ').height(HG);



    if ($('.link_big_photo').attr('href') == $('.link_big_photo img').attr('src')){
        $('.link_big_photo').addClass('not_zoom');
    }
    // run js to reload description
    var needToRun = false;
    if (typeof document.location.search !== 'undefined') {
        //if (document.location.search.match('version=1')) {
        //    needToRun = true;
        //}
    }

    if (needToRun) {
        var str = $('#full_description').html();
        var arr = str.split('\n');
        str = '';
        for (var i in arr) {
            str += '<span>' + arr[i] + '</span>';
        }
        $('#full_description').html(str);

        var fullWidth = $('#full_description').outerWidth();
        var maxWidth = 0;
        $('#full_description span').each(function () {
            if ($(this).outerWidth() > maxWidth) {
                maxWidth = $(this).outerWidth();
            }
        });

        var htmlDescription = '';
        var columns = (fullWidth - fullWidth % maxWidth) / maxWidth;
        columns = columns > 3 ? 3 : columns;
        if (columns > 1) {
            var innerHeight = $('#full_description').innerHeight();
            var columnHeight = (innerHeight - innerHeight % columns) / columns;
            var currentHeight = 0;
            var div = [];
            var row = [];
            $('#full_description > span').each(function () {
                currentHeight += $(this).outerHeight();
                row.push($(this).html());

                if (currentHeight >= columnHeight) {
                    div.push(row);
                    row = [];
                    currentHeight = 0;
                }
            });
            if (row.length) div.push(row);

            $(div).each(function () {
                    htmlDescription += '<div>' + this.join("\n") + '</div>';
            });

            $('#full_description').html(htmlDescription);
            $('#full_description > div:not(:last-child)').attr('style', 'float:left;margin:0 50px 20px 0;');

        } else {
            var row = [];
            $('#full_description > span').each(function () {
                row.push($(this).html());
            });
            $('#full_description').html(row.join("\n"));
        }
    }
    /*** DESCRIPTION END ***/

    const swBox = $('.card-product-img__preview');
    const swContainer = swBox.find('.swiper-container');
    const swSlidesLength = swContainer.find('.swiper-slide').length;

    if (swSlidesLength === 1) {
        swBox.css('display', 'none')
    }

    const galleryThumbs = new Swiper(swContainer, {
        lazy: true,
        spaceBetween: 8,
        slidesPerView: 4,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        watchOverflow: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            480: {
                slidesPerView: 3,
                spaceBetween: 10,
            }
        },
    });
    const galleryTop = new Swiper('.card-product-img__inner .swiper-container', {
        lazy: true,
        spaceBetween: 10,
        effect: 'fade',
        simulateTouch: false,
        thumbs: {
            swiper: galleryThumbs
        }
    });

    $('.card-product-img__inner .swiper-slide').fancybox({
        buttons: ["close"],
        baseClass: "card-product-img__inner",
        infobar: false,
        idleTime: false,
        caption: function (instance, item) {
            let caption = $(this).data('caption') || '';
            let steps = 'Фото <span data-fancybox-index></span> из <span data-fancybox-count></span>';
            if ($(this).data('hideSteps')) {
                steps = '';
            }
            return (caption.length ? caption + '<br />' : '') + steps;
        }
    });


    $('.action_block_head .bonus_box').click(function(){
        index_el = $(this).index();
        if(index_el>0 && !$(this).hasClass('bonus_act')){
                $('.action_block').removeClass('action_close');
                $('.action_block_head .bonus_box').removeClass('bonus_act');
                $(this).addClass('bonus_act');
                $('.prod_one_actoin').hide();
                $('.prod_one_actoin').eq(index_el-1).show();
        }
        else if(index_el>0 && $(this).hasClass('bonus_act')){
                $('.bonus_box').removeClass('bonus_act');
                $('.action_block').addClass('action_close');
        }
    });
    $('.action_block_head div.hdr').click(function(){
        $('.bonus_box').removeClass('bonus_act');
        $('.action_block').toggleClass('action_close');
            if($('.action_block .action_close').length==0){
                $('.bonus_box').eq(0).addClass('bonus_act');
            }
    });
    $('.action_about .close').click(function(){
        $('.bonus_box').removeClass('bonus_act');
        $('.action_block').addClass('action_close');
    });

    $('.shopLink .sh_nm span').click(function(event) {
        event.preventDefault();
        event.stopPropagation();
        ur=$(this).parent().parent().attr('data-uri');
        if(ur!='#') {
            window.open(ur, '_blank');
        }else{
            return false;
        }
    })

    var sliderContent=$('#imagesSlider').html();
    $('.jcarousel').html(sliderContent);
    $('.jcarousel2').html(sliderContent);
    $('.jcarousel3').html(sliderContent); //horizontal slider product

    $('div.pickup_tp span.dtd').click(function(event) {
        event.stopPropagation();
        $(this).next().show();
    });

    $('div.pickup_tp').mouseenter(function() {
        clearTimeout(timeout);
    })

    $('div.disc_products_box').click(function(event) {
        event.stopPropagation();
        $(this).prev().show();
        $("div.lr_open").css('top',event.pageY + 14);
    });

    $('div.cut_goods').mouseleave(function() {
        timeout = setTimeout(function() {
            $('div.cut_goods').hide();
        },2000)
    }).mouseenter(function() {
            clearTimeout(timeout);
    });

    if($('.jcarousel3').length > 0)  {
        $('.jcarousel3').css('height', 112);
        $('.horis_slider').show();
        $('.jcarousel3').jCarouselLite({
            btnNext: ".next_sl3",
            btnPrev: ".prev_sl3",
            visible: 2,
            circular: false,
            vertical: false
        });

        $('.jcarousel3 li:first-child').addClass('active');
        var open_win = false;
        var list_index = 0;

        $('.jcarousel li a').click(function (event) {
            event.preventDefault();
            $('.jcarousel li').removeClass('active');
            $(this).parent().parent().parent().addClass('active');
            list_index = $(this).parent().parent().parent().index();
            var link_mini = $(this).attr('href');
            var link_big = $(this).attr('rel');
        });

        $('.jcarousel3 li a').click(function (event) {
            event.preventDefault();
            list_index = $(this).parent().parent().parent().index();
            $('#middle_imge_kt li').hide();
            var new_height_img = $('#middle_imge_kt li').eq(list_index).show().height();
            $('#middle_imge_kt').height(new_height_img);
            $('.jcarousel3 li').removeClass('active');
            $(this).parent().parent().parent().addClass('active');
        });
    }

    $('.prev_sl').addClass('disabled');
    $('.prev_sl3').addClass('disabled');
    if($('.jcarousel li').length < 2 ||  $('.jcarousel li').length == 2) {
        $('.next_sl, .prev_sl').addClass('disabled');
    }

    if($('.jcarousel3 li').length < 2 ||  $('.jcarousel3 li').length == 2) {
        $('.next_sl3, .prev_sl3').addClass('disabled');
    }

    $("body,.button_close").click(function(e) {
        $(".win_slider, #back_win").css("display","none");
    });
    $(".win_slider").click(function(e) {
        e.stopImmediatePropagation();
    });

    $(window).resize(function(){
        if ($('.win_slider').is(":visible")) {
            ImageViewKT(Number($('.jcarousel2 .active a').attr('data-width')), Number($('.jcarousel2 .active a').attr('data-height')));
            ImageResizeKT();
        }
        if ($('.jcarousel3').length && (document.body.clientWidth <= '1090')) {
            $('.jcarousel3').css('height', 112);
            $('.jcarousel3').jCarouselLite({
                btnNext: ".next_sl3",
                btnPrev: ".prev_sl3",
                visible: 2,
                circular: false,
                vertical: false
                });

            $('.jcarousel3 li').removeClass('active');
            $('.jcarousel3 li').eq(list_index).addClass('active');
            $('.jcarousel3 li a').click(function(event){
                event.preventDefault();
                list_index = $(this).parent().parent().parent().index();
            });
            }
    });

    $(document).on("click", ".mile_bonus[name=href]", function(event){
        event.preventDefault();
        event.stopPropagation();
        window.open('/aeroflot/', '_blank');
    });
    $(document).on('click', '.spasibosberbank_bonus', function(event){
      event.preventDefault();
      event.stopPropagation();
      window.open('/spasibosberbank/', '_blank');
    });
    $(document).on('click','.mnogo_bonus', function(event){
      event.preventDefault();
      event.stopPropagation();
      window.open('/mnogo/', '_blank');
    });

    $(document).on('click','.aut_login .btn_credit', function(e){
      e.preventDefault();
      if (prodId==0) {
        prodId = $(this).closest('.prc_box').find('.button_product .prc_btn').attr('data-product-id');
      }
      doClearCredit();
      addToCart(prodId,'&visa');
    });

    $(document).click(function(event) {
      if(!$(event.target).closest('div.pickup_tp').length) {
        if($('div.pickup_info').is(":visible")) {
          $('div.pickup_info').hide();
          clearTimeout(timeout);
        }
      }
    })

    $(document).click(function(event) {
      if(!$(event.target).closest('div.cut_goods').length) {
        if($('div.cut_goods').is(":visible")) {
          $('div.cut_goods').hide();
          clearTimeout(timeout);
        }
      }
    })

    // add group of products (for action purposes)
    $(document).on('click','.add_products',function(e){
        e.preventDefault();
        productsIDs = $(this).attr('ids');
        addProductsToCart(productsIDs, this);
    })

    $(document).mouseup(function (e){
        var popap_div = $(".guarant_cont");
        if (!popap_div.is(e.target)
            && popap_div.has(e.target).length === 0
                && !$("a[data-id=add_guarant]").is(e.target)
                && !$("span.add_guartant_box").is(e.target)) {
            popap_div.hide();
        }
        popap_div = $(".popupWindowBlagosostoyanie");
        if (!popap_div.is(e.target)
                && popap_div.has(e.target).length === 0
                && !$('a[data-id=popupWindowBlagosostoyanie]').is(e.target)
                && !$("span.popupOpen").is(e.target)) {
            popap_div.hide();
        }
    });

    $(document).mouseup(function (e){
        var popap_div2 = $(".credit_cont");
        if (!popap_div2.is(e.target) && popap_div2.has(e.target).length === 0) {
            popap_div2.hide();
        }
    });


    if ($('#page_table').attr('data-options')=="true"){
      $(".credit_login2, .aut_login").css('display', 'block');
      $(".credit_login, .not_login").css('display', 'none');
    }else{
      $(".credit_login2, .aut_login").css('display', 'none');
      $(".credit_login, .not_login").css('display', 'block');
    }

    $(".add2cart2 .visa_discount").on('click',function(e){
     $(".visa_cont").addClass('visa_catalog');
        $(".visa_cont").show();
        $("div.visa_cont").css('position','absolute').css('top', e.pageY + 10).css('right', 5);
        prodId=$(this).attr('product-id');
    });

    $(document).on("click", ".disc_lt_box", function(event){
        event.preventDefault();
        $(this).parent().find(".visa_cont").show();
        prodId=$(this).attr('product-id');
    });

    $('div.bonuses_box > div.bonuses_nav').click(function(){
      $(this).toggleClass('bonuses_open');
      $('div.bonuses_box > div.bonuses_info').toggle();
    });

    var draggle_var = true;
    var scroll_mob = true;
    var repos_mob = true;

    //disable photodrag
    if(isMobile.any()){
        draggle_var = false;
        scroll_mob  = false;
        repos_mob   = false
    }

    var slideCount = $('.slick-slider > div').length;
    if(slideCount) {
        $('.slick-slider').not('.slick-initialized').show().slick({
            prevArrow: $('div.prev_sl3'),
            nextArrow: $('div.next_sl3'),
            slidesToShow: 2,
            lazyLoad: 'ondemand'
        });

        // change slide on click
        $('.slick-slider').on('click', '.slick-slide', function (e) {
            e.preventDefault();
            e.stopPropagation();
            var index = $(this).data("slick-index");
            if ($('.slick-slider').slick('slickCurrentSlide') !== index) {
                $('.slick-slider').slick('slickGoTo', index);
            }

            if (2 == slideCount) {
                changeBigPicture(index);
                $('.slick-slide').removeClass('slick-current');
                $(this).addClass('slick-current');
            }
        });

        // change if more then
        $('.slick-slider').on('afterChange', function(event, slick, currentSlide) {
            changeBigPicture(currentSlide);
        });
    }
});

function ImageResizeKT(){
    var widthWindow  = $('.win_slider').width();
    var heightWindow = $('.win_slider').outerHeight();
    var widthUser  = $(window).width();
    var heightUser = $(window).height();
}

/*open big pictures */
function ImageViewKT(img_width,img_height) {
    img_width = parseInt(img_width);
    img_width = parseInt(img_height);
    var heightCarousel = $('.jcarousel2').height();
    var heightImagebl = $(window).height() - 44 - 30;
    var winHeight = $(window).height() - ($('.win_slider').outerHeight() - $('.win_slider').height());
    if($('.win_slider').outerHeight() > $(window).height() && $('.win_slider .b_image').height() < img_height){ // if height popup-window > screen height by user
        //$('.win_slider').css('max-height',$(window).height());
    } else {
        $('.win_slider').height('auto');
        $('.b_image img').css('max-height','100%');
    }
    if( img_height > heightImagebl) {
        $('.b_image img').css('max-height',heightImagebl).css('max-width','100%');
    }    else {
        $('.b_image img').css('max-height','auto').css('max-width','auto');
    }
    var el_img = $('.b_image img');
}

function sliderProductOne(){
    if ($('.jcarousel3 li').length == 1){
        $('.jcarousel3, .horis_slider').hide();
    }    else {
        $('.horis_slider').show();
        $('.horis_slider ul').css('width',$('.jcarousel3').width());
    }
    if ($('.jcarousel2 li').length == 1){
        $('.jcarousel2, .block_slider_win').hide();
        $('.b_image').css('padding-left','0px');
    }    else {
        $('.block_slider_win').show();
        $('.block_slider_win ul').css('width',$('.jcarousel2').width());
    }
}

// pictures.
function changeBigPicture(index) {
    $('#middle_imge_kt > li').hide();
    $('#middle_imge_kt > li:eq(' + index + ')').show();
}

function doClearCredit(){
    document.cookie = "credit_key_ver2=; path=/;  domain="+$("#credit").attr('data-domain')+'; samesite=strict;';
    document.cookie = 'creditLite=0; path=/;  domain='+$("#credit").attr('data-domain')+'; samesite=strict;';
}

function doVisaNL(){
    doClearCredit();
    if(typeof prodId != 'undefined'){
        addToCart(prodId, '&visa', function (){
            document.location.href = 'https://' + document.location.host + '/auth/';
        });
    } else {
        document.location.href = 'https://' + document.location.host + '/auth/';
    }
}

function track_tab_hit(tab_text){
  if(window.tab_hit_first_time){
    window.tab_hit_first_time=false;
    return;
  }
  var tab_name='', tab_title='';
  if(tab_text.match(/характеристики/i) !== null){
    tab_name = 'specs';
    tab_title = 'Технические характеристики';
  }else if(tab_text.match(/Отзывы/i) !== null){
    tab_name = 'reviews';
    tab_title = 'Отзывы';
  }else if(tab_text.match(/Аксессуары/i) !== null){
    tab_name = 'accessories';
    tab_title = 'Аксессуары';
  }else if(tab_text.match(/Похожие/i) !== null){
    tab_name = 'similars';
    tab_title = 'Похожие товары';
  }else{
    return;
  }
  if(typeof(metrica_hit_tab) === "function" ){
    metrica_hit_tab(tab_name, tab_title);
  }
  if(typeof(live_internet_hit_tab) === "function" ){
    live_internet_hit_tab(tab_name, tab_title);
  }
  if(typeof(ga_hit_tab) === "function" ){
    ga_hit_tab(tab_name, tab_title);
  }
}


/*function show line up, mini information to product*/
function showUp(){
  let tscroll = $('.region_block .status_box');
  if(tscroll.length < 1) return;

  let top_scroll = 630; // position show .line_up_kt /*tscroll.offset().top;*/
  if ($(window).scrollTop()> top_scroll ){
      if (!$('.line_up_kt').hasClass('fixed_tab')){
        $('.line_up_kt').addClass('fixed_tab');
        if(typeof(close_subscribe_blok) === "function" ){
          close_subscribe_blok();
        }
      }
  } else {
    if($('.line_up_kt').hasClass('fixed_tab')){
        if(typeof(close_subscribe_blok) === "function" ){
          close_subscribe_blok();
        }
    }

    $('.line_up_kt').removeClass('fixed_tab');
    $('.jquery-selectbox-list').hide();
    $('.jquery-selectbox').removeClass('selecthover');
    $('.jquery-selectbox-list').removeClass('res_reg_top');
    $('.jquery-selectbox-list').removeClass('res_reg');
  }
}

$(window).on('scroll', function(){
    showUp();
});


var timeout = null;
var cat  = "";
var vend = "";
var page = "";
var has_acs  = false;
var has_sim  = false;
var has_cert = false;
var page_all = 0;
var prodId   = 0;
var onlyNotify = 0;

function get_p_all(cat){
    let region = getCookieValue("region_position_nn");
    if (region=='undefined' || region=='') region = 1;
    vend = $("#acs").attr("data-vid");

    $.get("/ajax/get_accessories.php", {key: $("#acs").attr("data-key"), id: $("#acs").attr("data-id"), act:'gp', ajregion:region, cat:cat, ven:vend },
      function(data){
        if (data > 0) page_all = data;
        get_prd_list(1, cat, page_all);
    });
}

function get_prd_list(page, cat, page_all){
    let region = getCookieValue("region_position_nn");
    if (region=='undefined' || region=='') region = 1;
    let str_page = "Страницы ";
    vend = $("#acs").attr("data-vid");

    $.get("/ajax/get_accessories.php", {
        key: $("#acs").attr("data-key"),
        id: $("#acs").attr("data-id"),
        page: page,
        ajregion:region,
        cat:cat,
        ven:vend
    }, function(data){
      $("#prd_list").html(data);

      for(i=1; i <= page_all; i++){
        if(i==page){
          str_page = str_page + ' <span class="pp" id="'+i+'">['+i+']</span> ';
        }else{
          str_page = str_page + ' <span class="pp_a" id="'+i+'">'+i+'</span> ';
        }
      }
      $("#str_page").html(str_page);

      if (typeof(iteration) != 'undefined' && (iteration > 0)) {
        $('.pp_a').click(function() {
            page = this.id;
            get_prd_list(page, cat, page_all);

        })
        $('.cat').click( function(){
            cat = this.id;
            get_p_all(cat);
        });
      }

      getCartProducts();
      $('#prd_list .add2cart2').on('click','.notify',function(event){
        event.preventDefault();
        $("div.subscribe_cont").css('left','inherit').css('right','inherit');
        prodId=$(this).parent().attr('data-product-id');
        var offset_win = $(this).offset();
        var params={};
        onlyNotify=1;
        $(".subscribe_cont").addClass('subscribe_catalog');
        $("div.subscribe_cont").css('position','absolute');
      });

      $('#prd_list .add2cart2').on('click','.btn',function(event){
        event.preventDefault();
        if(onlyNotify==0){
          if ($(this).hasClass('modal-ajax-call')){return;}
          if (!$(this).hasClass('add_act')){
            prodId=$(this).attr('data-product-id');
            addToCart(prodId,'');
          }else{
            window.location.href = Hprtl+'://'+ document.location.host+'/basket/';
          }
        }
        onlyNotify=0;
      });
    });
}

function get_sim_list(){
  $.get("/ajax/get_similar.php", {id: $("#sim").attr("data-id"), key: $("#sim").attr("data-key")}, function(data){
    $("#fivex").html($(data));

    replaceLink();
    getCartProducts();

    $('#fivex .add2cart2').on('click','.notify-admission',function(event){
        event.preventDefault();
        prodId=$(this).parent().attr('data-product-id');
        var params={};
        //onlyNotify=1;
        $(".subscribe_cont").addClass('subscribe_catalog');
        $("div.subscribe_cont").css('position','absolute');
    });
    $('#fivex .add2cart2').on('click','.btn',function(event){
        event.preventDefault();
        if(onlyNotify==0){
            if ($(this).hasClass('modal-ajax-call')){return;}
          if (!$(this).hasClass('add_act')){
            prodId=$(this).attr('data-product-id');
            addToCart(prodId,'');
          }else{
            window.location.href = Hprtl+'://'+ document.location.host+'/basket/';
          }
        }
        onlyNotify=0;
    });
  });
}

function get_cert_list(){
    $.get("https://api.holodilnik.ru/cert/",
      {id: $("#cert").attr("data-id"), key: $("#cert").attr("data-key"), act: "view_prd"},
      function(data){
        $("#cert_box").html(data);
      }
    );
}


// ORPHUS **************
window.size = function() {
  var w = 0;
  var h = 0;

  //IE
  if(!window.innerWidth) {
    //strict mode
    if(!(document.documentElement.clientWidth == 0)) {
      w = document.documentElement.clientWidth;
      h = document.documentElement.clientHeight;
    }  else {   //quirks mode
      w = document.body.clientWidth;
      h = document.body.clientHeight;
    }
  }  else { //w3c
    w = window.innerWidth;
    h = window.innerHeight;
  }
  return {width:w,height:h};
}

window.center = function() {
  var hWnd = (arguments[0] != null) ? arguments[0] : {width:0,height:0};

  var _x = 0;
  var _y = 0;
  var offsetX = 0;
  var offsetY = 0;

  //IE
  if(!window.pageYOffset)  {
    //strict mode
    if(!(document.documentElement.scrollTop == 0)){
      offsetY = document.documentElement.scrollTop;
      offsetX = document.documentElement.scrollLeft;
    } else { //quirks mode
      offsetY = document.body.scrollTop;
      offsetX = document.body.scrollLeft;
    }
  }  else { //w3c
    offsetX = window.pageXOffset;
    offsetY = window.pageYOffset;
  }

  _x = ((this.size().width-hWnd.width)/2)+offsetX;
  _y = ((this.size().height-hWnd.height)/2)+offsetY;

  return{x:_x,y:_y};
}

function orphus(){var _1="5.01";
var _2="!usndkih@lodoliin.kur";
var hq="https://www.holodilnik.ru/utils/descr_bug_send.php?qu1g8ahbitxyn5r8cu6e";
var _4="<!!!>";
var _5="<!!!>";
var _6=60;
var _7=1256;
var _8={// Russian (\u0420\u0443\u0441\u0441\u043A\u0438\u0439)
alt:        "Выделите ошибку мышью и нажмите Ctrl+Enter.",
badbrowser: "Ваш обозреватель не поддерживает перехват выделенного текста. Возможно, старая версия или другая ошибка.",
toobig:     "Вы выбрали слишком большой объём текста!",
thanks:     "Спасибо за сотрудничество!",
subject:    "Ошибка",
docmsg:     "Документ:",
intextmsg:  "Орфографическая ошибка в тексте:",
ifsendmsg:  "<b>Сообщить об ошибке?</b>\n<span class=\"gray\">(страница останется на том же месте)</span>",
gohome:     "Перейти на домашнюю страницу системы Orphus?",
newwin:     "Страница откроется в новом окне.",
name:       "Система Orphus",
author:     "Автор: Дмитрий Котеров.",
to:         "Пользователь Orphus",
// 5.0
send:       "Сообщить",
cancel:     "Отмена   ",
entercmnt:  "Комментарий (по желанию):"

};
var _9 ="css";
var _a =0;
var  w =window;
var  d =w.document;
var  b =d.body;
var _e =null;
var _f ={};
var _10=false;
var _11="";
var _12=function(){if(_2.substr(0,1)=="!"){_2=_2.substr(1).replace(/(.)(.)/g,"$2$1");}
setTimeout(function(){var _13=_14();if(_13){_13.onclick=_15; _13.title=_13.childNodes[0]&&_13.childNodes[0].alt;}},100);
d.onkeypress=_16; _8.gohome+=" "+_8.newwin;};
var _14=function(){return d.getElementById("orphus");};
var _15=function(){with(_8){if(confirm(name+" v"+_1+".\n"+author+"\n\n"+alt+"\n\n"+gohome)){w.open(hq,"_blank");}return false;}};
var _17=function(){var n=0;
var _19=function(){if(++n>20){return;}w.status=(n%5)?_8.thanks:" "; setTimeout(_19,100);};
_19();};
var _1a=function(e){e.style.position="absolute";
e.style.top="-10000px";
if(b.lastChild){b.insertBefore(e,b.lastChild);}else{b.appendChild(e);}};
var _1c=function(_1d){var div=d.createElement("DIV");
div.innerHTML="<iframe name=\""+_1d+"\"></iframe>";
_1a(div);
return d.childNodes[0];};
var _1f=function(url,_21,_22){var _23="orphus_ifr";
if(!_e){_e=_1c(_23);}var f=d.createElement("FORM");
f.style.position="absolute";
f.style.top="-10000px";
f.action=hq;
f.method="post";
f.target=_23;                                                                                                           //c_tag1:_4,c_tag2:_5,
var _25={version:_1,email:_2,to:_8.to,subject:_8.subject,ref:url,c_pre:_21.pre,c_sel:_21.text,c_suf:_21.suf,c_pos:_21.pos,charset:d.charset||d.characterSet||"",comment:_22};
for(var k in _25){var h=d.createElement("INPUT"); h.type="hidden"; h.name=k; h.value=_25[k]; f.appendChild(h); }
_1a(f);
f.submit();
f.parentNode.removeChild(f);};
_f.confirm=function(_28,_29,_2a){var ts=new Date().getTime();
var _2c=confirm(_8.docmsg+"\n   "+d.location.href+"\n"+_8.intextmsg+"\n   \""+_28+"\"\n\n"+_8.ifsendmsg);
var dt=new Date().getTime()-ts;
if(_2c){_29("");}else{if(!_2a&&dt<50){var sv=d.onkeyup;
d.onkeyup=function(e){if(!e){e=window.event;}if(e.keyCode==17){d.onkeyup=sv;
_f.confirm(_28,_29,true);}};}}};
_f.css=function(_30,_31){if(_10){return;}_10=true;
var div=d.createElement("DIV");
var w=350;
if(w>b.clientWidth-10) { w=b.clientWidth-10;} div.innerHTML=""+"<div class='orphus_hdr' style='width:"+w+"px; '><div class='ohdr'>"+_8.ifsendmsg.replace(/\n/,"<br/>")+"</div>"+"<form><fieldset><div class='tiny'><i class='gray'>..."+_30.replace(_4,"<b>").replace(_5,"</b>")+"...</i></div><br>"+"<div class='tiny2'>"+_8.entercmnt+"</div>"+"<input type='text' maxlength=\"250\" class=\"tiny\" style=\"width:100%; margin: 0 0 0.5em 0\" />"+"<div class='btn_row'><b class='btn_hru'><input type='submit' value=\""+_8.send+"\" onfocus=\"blur()\" /></b> <br><br> "+"<b class='btn_hru_red'><input type='button' value=\""+_8.cancel+"\"  onfocus=\"blur()\" /></b></div></fieldset></form><br>"+"<div class='tiny3' ></div>"+"</div>"+"";
_1a(div);
var _34=div.getElementsByTagName("input");
var _35=div.getElementsByTagName("form");
var t=_34[0];
var _37=null;
var _38=[];
var _39=function(){d.onkeydown=_37;
_37=null;
div.parentNode.removeChild(div);
for(var i=0;i<_38.length;i++){_38[i][0].style.visibility=_38[i][1];}_10=false;
_11=t.value;};
var pos=function(p){var s={x:0,y:0};
while(p.offsetParent){s.x+=p.offsetLeft;
s.y+=p.offsetTop;
p=p.offsetParent;}return s;};
setTimeout(function(){var w=div.clientWidth;
var h=div.clientHeight;
var x=(b.clientWidth-w)/2+b.scrollLeft;
if(x<10){x=10;}var y=(b.clientHeight-h)/2+b.scrollTop-10;
if(y<10){y=10;}div.style.left=x+"px";
//div.style.top=y+"px";

div.style.top=this.center().y+"px";

if(navigator.userAgent.match(/MSIE (\d+)/)&&RegExp.$1<7){var _42=d.getElementsByTagName("SELECT");
for(var i=0;i<_42.length;i++){var s=_42[i];
var p=pos(s);
if(p.x>x+w||p.y>y+h||p.x+s.offsetWidth<x||p.y+s.offsetHeight<y){continue;}_38[_38.length]=[s,s.style.visibility];
s.style.visibility="hidden";}}t.value=_11;
t.focus();
t.select();
_37=d.onkeydown;
d.onkeydown=function(e){if(!e){e=window.event;}if(e.keyCode==27){_39();}};
_35[0].onsubmit=function(){_31(t.value);
_39();
_11="";
return false;};
_34[2].onclick=function(){_39();};},10);};
var _47=function(_48){return (""+_48).replace(/[\r\n]+/g," ").replace(/^\s+|\s+$/g,"");};
var _49=function(){var _4a=null;
var _4b=null;
if(w.getSelection){_4b=w.getSelection();}else{if(d.getSelection){_4b=d.getSelection();}else{_4b=d.selection;}}var _4c=null;
if(_4b!=null){var pre="",_4a=null,suf="",pos=-1;
if(_4b.getRangeAt){var r=_4b.getRangeAt(0);
_4a=r.toString();
var _51=d.createRange();
_51.setStartBefore(r.startContainer.ownerDocument.body);
_51.setEnd(r.startContainer,r.startOffset);
pre=_51.toString();
var _52=r.cloneRange();
_52.setStart(r.endContainer,r.endOffset);
_52.setEndAfter(r.endContainer.ownerDocument.body);
suf=_52.toString();}else{if(_4b.createRange){var r=_4b.createRange();
_4a=r.text;
var _51=_4b.createRange();
_51.moveStart("character",-_6);
_51.moveEnd("character",-_4a.length);
pre=_51.text;
var _52=_4b.createRange();
_52.moveEnd("character",_6);
_52.moveStart("character",_4a.length);
suf=_52.text;}else{_4a=""+_4b;}}var p;
var s=(p=_4a.match(/^(\s*)/))&&p[0].length;
var e=(p=_4a.match(/(\s*)$/))&&p[0].length;
pre=pre+_4a.substring(0,s);
suf=_4a.substring(_4a.length-e,_4a.length)+suf;
_4a=_4a.substring(s,_4a.length-e);
if(_4a==""){return null;}return {pre:pre,text:_4a,suf:suf,pos:pos};}else{alert(_8.badbrowser);return;}};
var _56=function(){if(!_2||navigator.appName.indexOf("Netscape")!=-1&&eval(navigator.appVersion.substring(0,1))<5){alert(_8.badbrowser);return;}
var _57=function(_58){alert("Wrong installation (code "+_58+"). Please reinstall Orphus.");};
var i=1;
var _5c=_49();
if(!_5c){return;}with(_5c){pre=pre.substring(pre.length-_6,pre.length).replace(/^\S{1,10}\s+/,"");
suf=suf.substring(0,_6).replace(/\s+\S{1,10}$/,"");}var _5d=_47(_5c.pre+_4+_5c.text+_5+_5c.suf);
if(_5d.length>_7){alert(_8.toobig);
return;}_f[_9](_5d,function(_5e){_1f(d.location.href,_5c,_5e);
_17();});};
var _16=function(e){var _60=0;var we=w.event;
if(we){_60=we.keyCode==10||(we.keyCode==13&&we.ctrlKey);}else{if(e){_60=(e.which==10)||(e.keyCode==0&&e.charCode==106&&e.ctrlKey)||(e.keyCode==13&&e.ctrlKey);}} //&&e.modifiers==2
if(_60){_56();return false;}
};
_12();}

orphus();
