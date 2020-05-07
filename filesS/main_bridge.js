if (window.cookieDomain===undefined) var cookieDomain='.holodilnik.ru';
if (window.Hprtl===undefined) var Hprtl='http';
var search = '';
var isBasket = false;
var removeFromUrl = new Array();
var timeoutId = null;
var isOpen = false;


function addToCart(prodId, params, success) {
  var cartUrl = "/ajax/cart.php";
  if (params.length>0) params = '&info='+params;
  if (prodId>0) cartUrl = cartUrl + "?prodId=" + prodId + params;

  $.ajax({
    url:cartUrl,
    dataType: "json",
    cache: false
  }).done(function (data) {

    if(data['products'] != undefined) {
      $.each(data['products'], function(key, val){
          changeBuyButton(val['id'],data);
      });

      var count = parseInt(data['total']['qty']);
      if (count > 0 && typeof count === 'number') {
          $('#numInCart, #numInCart2').html(count);
      }

      try{
          var isCredit=(hrefDo!=undefined);
      }catch(err) {
          var isCredit=false;
      }
      try{
          var isServiceClick=ServiceClick;
      }catch(err) {
          var isServiceClick=false;
      }

      if(isCredit && !isServiceClick){
          document.location.href = Hprtl+'://' + document.location.host + "/usercp/orders/new/";
      }
      if(data['redirectVisa']!=undefined && data['redirectVisa']==true){
          document.location.href = Hprtl+'://' + document.location.host + "/usercp/orders/new/";
      }
      if (success){
          success();
      }
    }
  }).fail(function () {
      height_def = 0;
      console.log('e:addToCart');
  });
}

function addProductsToCart(productsIDs, button){
  var cartUrl="/ajax/cart.php";
  if (productsIDs != '')
    cartUrl = cartUrl+"?productsIDs="+productsIDs;
  else return;

  if($(button).attr('data-action')=='notInCart')
    cartUrl=cartUrl+"&inCart=skip";
  $.ajax({
    url: cartUrl,
    dataType:   "json",
    cache: false
  }).done(function (data) {
      if(data['products']!=undefined){
          $.each(data['products'], function(key, val){
              changeBuyButton(val['id'],data);
          });

          var count = parseInt(data['total']['qty']);
          if (count > 0 && typeof count === 'number') {
              $('#numInCart, #numInCart2').html(count);
          }
          changeBuyGroupButton(button);
      }
  }).fail(function(){
      height_def = 0;
      console.log('e:addProductsToCart');
  });
}

function changeBuyGroupButton(button){
  href = Hprtl+'://' + document.location.host + "/usercp/orders/new/";
  ids  = $(button).attr('ids');
  type = $(button).attr('data-action');
  if (type=='notInCart'){
      href = Hprtl+'://' + document.location.host + '/basket/';
      newButton = $('<a href="'+href+'" class="prc_btn act_add"><div class="add_messenge_b">Товар добавлен в корзину<span></span></div><i></i>Перейти в корзину</a>');
      $('a[ids="' + ids + '"]').replaceWith(newButton);
  }
  aHref = Hprtl+'://'+ document.location.host +"/basket/";
  newButton = $('<a href="'+aHref+'" target="_blank" class="act_add"><span class="act_add_messenge">Товар добавлен в корзину</span>Перейти в корзину</a>');
  $('a[ids="'+ ids +'"]').replaceWith(newButton);
}

function getCartProducts() {
    let productStr = getCookieValue("_utm_prd");
    if (productStr === "") {
        return;
    }
    let products = productStr.split(",");
    if (products.length === 0){
        return;
    }
    $.each(products, function(key, val){
        simpleButtonChange(val);
    });
}

function simpleButtonChange(prodId) {
    $('[data-product-id="'+prodId+'"]').each(function () {
        if ($(this).hasClass('modal-ajax-call')) {
            return;
        }
        if (!$(this).hasClass('add_act')){
            if ('Предзаказ' == $(this).text() || 'Оформить предзаказ' == $(this).text()) {
                $(this).html('<div class="add_messenge_b">Добавлен к предзаказу<span></span></div><i></i>Перейти к предзаказу');
            } else {
                $(this).attr("href", Hprtl+'://'+ document.location.host+'/basket/');
                $(this).html('<div class="add_messenge_b">Товар добавлен в корзину<span></span></div><i></i>Перейти в');
            }

            $(this).addClass('add_act');
            setTimeout(function() {
                $('.add_messenge_b').animate({opacity: 0},1000,function(){
                    $(this).hide()
                });
            }, 2000);
            var temp=$(this).prev();
            if(temp.attr('class')=='birthday_catalog')temp.css("right","170px");
        }
    });
}

function changeBuyButton(prodId, data){
  $('[data-product-id="'+prodId+'"]').each(function () {

    if ($(this).hasClass('modal-ajax-call')) {
      return;
    }

    if (data['options']!=undefined && data['options']['warranty']!=undefined && data['options']['warranty'][prodId]>0){
      $(this).html('<div class="add_messenge_b">Программа «Комфорт+» добавлена к товару<span></span></div><i></i>Перейти в корзину');
      $(this).addClass('add_act');
      setTimeout(function() {
        $('.add_messenge_b').animate({ opacity:0},1000,function(){ $(this).hide() });
      }, 2000);
    }
    else if (!$(this).hasClass('add_act')){
      if ('Предзаказ' == $(this).text() || 'Оформить предзаказ' == $(this).text()) {
        $(this).html('<div class="add_messenge_b">Добавлен к предзаказу<span></span></div><i></i>Перейти к предзаказу');
      } else {
        $(this).attr("href", "/basket/");
        $(this).html('<div class="add_messenge_b">Товар добавлен в корзину<span></span></div><i></i>Перейти в');
      }

      $(this).addClass('add_act');
      setTimeout(function() {
        $('.add_messenge_b').animate({opacity: 0},1000,function(){
            $(this).hide()
        });
      }, 2000);
      var temp=$(this).prev();
      if(temp.attr('class')=='birthday_catalog')temp.css("right","170px");
    }
  });
}

function replaceLink() {
  var nl = document.querySelectorAll('.jsg-replace-link');
  var arr = [];
  for(var i = nl.length; i--; replaceLinkInner(nl[i]) );
}

function replaceLinkInner(oldEl){
  let href  = oldEl.getAttribute('data-href');
  oldEl.removeAttribute('data-href');
  let title = oldEl.getAttribute('data-title');
  if (title) {
    oldEl.removeAttribute('data-title');
  }
  oldEl.className = oldEl.className.replace('jsg-replace-link','');

  let elHtml = oldEl.outerHTML
    .replace(/^<\w+/, '<a href="' + href + '"' + (title ? ' title="' + title + '"' : ''))
    .replace(/\w+>$/, 'a>');
  oldEl.insertAdjacentHTML('afterend', elHtml);
  oldEl.parentNode.removeChild(oldEl);
}

function checkPath(ppath){
  let path = getCookieValue("path");
  if (path != ppath) {
    setCookieValue("path",  ppath, {path: '/', domain: cookieDomain});
    setCookieValue("prod_id", "0", {path: '/', domain: cookieDomain});
  }
}

function getCookieValue(name) {
    let setStr = '';
    let search = " " + name + "=";
    let cookie = " " + document.cookie;
    if (cookie.length > 0) {
        let offset = cookie.indexOf(search);
        if (offset != -1) {
            offset += search.length;
            let end = cookie.indexOf(";", offset)
            if (end == -1) {
                end = cookie.length;
            }
            setStr = unescape(cookie.substring(offset, end));
        }
    }
    return(setStr);
}

function setCookieValue(name, value, maxAgeDays, path, domain, secure) {
  document.cookie = name + "=" + escape(value) +
    ((maxAgeDays) ? "; max-age=" + maxAgeDays*24*3600 : "") +
    ((path) ? "; path=" + path : "") +
    ((domain) ? "; domain=" + domain : "") +
    ((secure) ? "; secure" : "");
}

function setCmpCookie(id){
  let pr_id = eval("document.comp_form." + id + ".value");
  let prod_id = getCookieValue("prod_id");
  if (prod_id != ""){
    let id_name = "," + pr_id;
    if (prod_id.indexOf(id_name) == -1){
      prod_id = prod_id + "," + pr_id;
      setCookieValue("prod_id", prod_id, { path: '/', domain: cookieDomain});
    }
  } else {
    setCookieValue("prod_id", pr_id, { path: '/', domain: cookieDomain});
  }
}

function unSetCmpCookie(id){
  let pr_id = eval("document.comp_form." + id + ".value");
  let prod_id = getCookieValue("prod_id");
  if (prod_id != ""){
    let id_name = "," + pr_id;
    let pos = prod_id.indexOf(id_name);
    if (pos != -1){
      prod_id = prod_id.substring(0, pos) + prod_id.substring(pos + id_name.length, prod_id.length);
      setCookieValue("prod_id", prod_id, { path: '/', domain: cookieDomain});
    }
  } else {
    setCookieValue("prod_id", pr_id, { path: '/', domain: cookieDomain});
  }
}

function Layer_Open(lr, cl, op) {
  try {
    $('#'+lr).removeClass("lr_close");
    $('#'+cl).removeClass("pic_close");
    $('#'+op).addClass("pic_close");
  } catch(e) {}
}

function Layer_Close(lr, cl, op){
  try {
    $('#'+lr).addClass("lr_close");
    $('#'+cl).addClass("pic_close");
    $('#'+op).removeClass("pic_close");
  } catch(e) {}
}

function ch_layer(kk, ttt){
  if(document.getElementById(kk).className=='hid'){
    document.getElementById(kk).className ='vis';
    document.getElementById(ttt).className='p_vis';
  }else{
    document.getElementById(kk).className ='hid';
    document.getElementById(ttt).className='p_hid';
  }
}

function loadScript(src, callback) {
    var r = false;
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = 'async';
    s.src = src;
    s.onload = s.onreadystatechange = function(a) {
        if ( callback && !r && (!this.readyState || this.readyState == 'complete') ) {
            r = true;
            callback();
        }
    };
    var x = document.getElementsByTagName('script')[0];
    x.parentNode.insertBefore(s, x);
}

function loadCss(src, callback) {
    var r = false;
    var s = document.createElement('link');
    s.type = 'text/css';
    s.async= 'async';
    s.rel  = 'stylesheet';
    s.href = src;
    s.onload = s.onreadystatechange = function(a) {
        if ( callback && !r && (!this.readyState || this.readyState == 'complete') ) {
            r = true;
            callback();
        }
    };
    var x = document.getElementsByTagName('link')[0];
    x.parentNode.insertBefore(s, x);
}

function showDiscountBlock(elm) {
  discountBlock = $(elm).next('.discount_info');
  if(window.discountWindowsZindex === undefined) window.discountWindowsZindex = 1000;
  $(discountBlock).off('click').on('click', function(){
      window.discountWindowsZindex++;
      $(this).css('z-index', window.discountWindowsZindex);
  });
  if (discountBlock.is(':visible')) {
    discountBlock.hide();
  } else {
    var yourClick = true;
    $(document).bind('click.myEvent', function (e) {
      if (!yourClick && $(e.target).closest('.discount_info').length == 0 && e.target.className != 'sz') {
        $('.discount_info').hide();
        $(document).unbind('click.myEvent');
      }
      yourClick = false;
    });
    discountBlock.show();
  }
}

function delProduct(id)  {
    let o = document.getElementById('show_cart');
    document.getElementById('itm_'+id).value = 0;
    o.operation.value = 'recalc';
    o.submit();
}

function hideSticker(stickerId) {
    setCookieValue('hide_sticker_id', stickerId, 14, '/', cookieDomain);
    //document.body.style.paddingTop = '0px';
}

function hideBanner(bannerId) {
    hiddenBanners.push(bannerId);
    setCookieValue('hidden_banners_ids', hiddenBanners.join(','), 14, '/', cookieDomain);
    $(document.body).removeClass('is-alert-common');
}

function safeCategoryVendor(path) {
    var result = '';
    if (typeof path[1] !== 'undefined') {
        result += path[1];
    } else {
        result += 'nocat';
    }
    if (typeof path[2] !== 'undefined') {
        result += '_' + path[2];
    } else {

        result += '_novend';
    }
    return result;
}

function getCurrentPath(url) {
    if (typeof(url)=='undefined') return '';
    let path = new Array();
    url = url.split('/');
    for(let i=0; i<url.length; i++) {
        if ('' !== url[i] && -1 === $.inArray(url[i], removeFromUrl)) {
            path.push(url[i]);
        }
    }
    return path;
}

function gaSend(event_category, event_action) {
  if (typeof(ga) !== "undefined" && event_category.length > 0 && event_action.length > 0){
    try {
      ga('send', 'event', event_category, event_action, '', 0);
      console.log(event_category, event_action);
    } catch(e){ }
  }
}

function urlAddLastSlash(url){
    tmp = url.split("/");
    if (tmp[tmp.length - 1].indexOf(".") > -1) {
        return url;
    }
    if (url.indexOf("?") > -1 && url.indexOf("/?") == -1) {
        return url.replace("?", "/?");
    }
    if (url.indexOf("#") > -1 && url.indexOf("/#") == -1 && url.indexOf("?") == -1) {
        return url.replace("#", "/#");
    }
    let lastChar = url.substr(url.length - 1, 1);
    if (url.indexOf("?") == -1 && url.indexOf("#") == -1 && lastChar != "/") {
        return url + "/";
    }

    return url;
}


function changeRegion(region, bottom) {
  try { //trouble !!!
    if (cookieDomain[0] != '.') cookieDomain = '.' + cookieDomain;
    setCookieValue(cookie_region, region, 14, '/', cookieDomain);

    if (typeof(all_regional_domains[region]) == 'undefined') {
        all_regional_domains[region]  = all_regional_domains[1];
    }
    if (typeof(regional_urls[region]) == 'undefined') {
        regional_urls[region] = '';
    }

    shops_page = 0;
    url = urlAddLastSlash(window.location.href);
    if (page404) {
        url = "//www.holodilnik.ru/";
    }
    url_bk = url;
    if (url.indexOf("/shops/")>0) { // false = -1
        shops_page = 1;
        url = "//" + all_regional_domains[region] + "/shops/";
    }

    if (reg_page_moscow == 1) {
        domain = all_regional_domains[region];
    } else {
        domain = all_regional_domains[1];
    }
    if (typeof(domain) == 'undefined') { //trouble ?
        domain = all_regional_domains[1];
    }

    urlparts = url.split('/');
    urlparts[2] = domain; //Зачем переписывать поддомен.holodilnik.ru на holodilnik.ru?
    url=urlparts.join("/");
    if (url.indexOf("/basket/order/?add=yes") > 0) {
        url = Hprtl+'://'+ document.location.host+"/basket/order/";
    }
    else if (url.indexOf("/usercp/orders/new/?add=yes") > 0) {
        url = Hprtl+'://'+ document.location.host+"/usercp/orders/new/";
    } else {
        if (reg_page_moscow == 1) {
            tmp = url.split("/");
            if (tmp[tmp.length - 1].indexOf(".") > -1) {
                tmp = tmp[tmp.length - 1];
                url = url.replace(tmp, "");
                if (tmp == "index.php") {
                   tmp = "";
                }
            } else {
                tmp = "";
            }
            url = url.replace("#headerBoxberry","");

            if (url.indexOf("?") + 1) {
                url = url.replace("?", regional_urls[region] + "/" + tmp + "?");
            }
            else if (url.indexOf("#") + 1) {
                url = url.replace("#", regional_urls[region] + "/"+ tmp + "#");
            }
            else {
                url = url + regional_urls[region] + "/"+tmp;
            }

            for (i = 1; i<=count_regions; i++) {
                if (i != region) {
                    url = url.replace("#"+regional_urls[i], "#"+regional_urls[region]);
                }
            }
        } else {
            var parser = document.createElement("a");
            parser.href = url;
            var pathname = parser.pathname.split('/').filter(function(value){ return value != ""});
            var lastIndex = pathname.length - 1;
            for (var i = 0; i<count_regions; i++) {
                if (i + 1 != region) {
                    parser.hostname = parser.hostname.replace(regional_urls[i + 1], regional_urls[region]);
                    parser.hash = parser.hash.replace("#"+regional_urls[i+1], "#"+regional_urls[region]);
                    if ('omsk' == regional_urls[i + 1] && 'tomsk' == regional_urls[region]) {
                        continue;
                    }
                    if (pathname[lastIndex] != 'bonus_samara16') pathname[lastIndex] = pathname[lastIndex].replace(regional_urls[i + 1], regional_urls[region]);
                }
            }
            parser.hostname = all_regional_domains[region] || 'www';
            parser.pathname = "/" + pathname.join("/") + "/";
            url = parser.href;
        }

        if ((region == 1) && shops_page == 0) url = url.replace("moscow/", "");
        //откуда берется алиас региона в домене и в хвосте ?
        if (special_regional_domains[region] == 1 && shops_page == 0) url = url.replace("/" + regional_urls[region] + "/", "/");
        if (shops_page == 1) {
           url = processUrlShopRegion(url, region);
        }
    }

    if (bottom || isOpen) {
      if (url == url_bk && !page404) {
         window.location.reload();
      } else {
         window.location.href = url;
      }
    }

} catch(e) {}

  return false;
}

function clearTimer() {
  clearTimeout(timeoutId);
}

function triggerTimer() {
  timeoutId = setTimeout("closeRegionList()",2500);
}

function closeRegionList() {
    $('.top_reg_list').hide();
    switchOffAllLetters();
    clearTimer();
    isOpen = false;
}

function initMask() {
  try {
    var fld = $('[type="tel"]');
    if (fld.length)
     fld.inputmask({
        "mask": ["+7 (999) 999-99-99", "8 (999) 999-99-99"],
        "clearIncomplete": true,
        autoUnmask: false,
        removeMaskOnSubmit: false,
    });
  } catch (e) {}
}

function switchOffAllLetters(){
    $('.all_reg').removeClass('on');
    $('.reg_letter .is').each(function(){
        $(this).removeClass('on');
    });
    $('#reg_list ul a').each(function(){
        $(this).removeClass('unselected');
    });
    $('#reg_list ul span').each(function(){
        $(this).removeClass('unselected');
    });
}

function switchOnCurrentLetter(element){
    $('.reg_letter .is').each(function(){
        $(this).removeClass('on');
    });
    element.addClass('on');
    $('.all_reg').addClass('on');
}

function switchOffCurrentLetter(element){
    element.removeClass('on');
    $('.all_reg').removeClass('on');
}

function toggleRegionsVisibility(letter, switcher, tag){
    $('#reg_list ul '+tag).each(function(){
        $(this).removeClass('unselected');
        if(switcher){
            regionName = $(this).text();
            if(regionName.charAt(0) != letter) $(this).addClass('unselected');
        }
    });
}

function showRegionsOfSelectedLetter(letter){
    toggleRegionsVisibility(letter, true, 'a');
    toggleRegionsVisibility(letter, true, 'span');
}

function hideRegionsOfSelectedLetter(letter){
    toggleRegionsVisibility(letter, false, 'a');
    toggleRegionsVisibility(letter, false, 'span');
}

function toggleStyleOfRegionsLinks(element){
    switcher = false;
    letter = element.text();
    elementClass = element.attr('class');

    if(elementClass != 'is on') {
        switchOnCurrentLetter(element);
        showRegionsOfSelectedLetter(letter);
    } else {
        switchOffCurrentLetter(element);
        hideRegionsOfSelectedLetter(letter);
    }
}


$(document).click( function(event){
  if( $(event.target).closest('.serch_result_bl, #form_query').length )  return;
  $('.serch_result_bl, #form_query').removeClass('active_w');
  event.stopPropagation();
});


// ******   Document READY  ********
$(document).ready(function () {

    jQuery.browser = {};
    jQuery.browser.mozilla = /mozilla/.test(navigator.userAgent.toLowerCase()) && !/webkit/.test(navigator.userAgent.toLowerCase());
    jQuery.browser.webkit  = /webkit/.test(navigator.userAgent.toLowerCase());
    jQuery.browser.opera = /opera/.test(navigator.userAgent.toLowerCase());
    jQuery.browser.msie  = /msie/.test(navigator.userAgent.toLowerCase());

    for (let k in regional_urls) {
        removeFromUrl.push(regional_urls[k]);
    }
    removeFromUrl.push('new_production');

    replaceLink();
    getCartProducts();

    try{
      isBasket=(IsCartPage);
    } catch(err) { }

    onlyNotify = 0;
    if (!isBasket) {  /*click button add cart catalog*/
      $('.button_product').on('click','.uvedomit',function(event){
          event.preventDefault();
          onlyNotify=1;
      });
      $('.prc_td').on('click','.uvedomit',function(event){
        onlyNotify=1;
        return false;
      });

      $('.add2cart2').on('click','.btn', function(event){
        prodId = $(this).attr('data-product-id');
        if (prodId==0 && $(this).attr('data-repair-id')>0){
            let params={};
            prodId = $(this).attr('data-repair-id');
            $(".subscribe_cont").addClass('subscribe_catalog');
            $("div.subscribe_cont").css('position','absolute').css('top', event.pageY + 21).css('right', 5);
            addDecorOrder(prodId,params);
        }
        else if (prodId>0){
          event.preventDefault();
          if (onlyNotify==0 ) {
              if ($(this).hasClass('modal-ajax-call')){return;}
            if (!$(this).hasClass('add_act')) {
                prodInfo = $(this).attr('data-info');
                if(prodInfo == undefined) prodInfo=false;
                addToCart(prodId, prodInfo);
            } else {
                window.location.href = Hprtl+'://'+ document.location.host+'/basket/';
            }
          }
          onlyNotify=0;
        }
      });

      /*click button add cart big button*/
      $('.button_product').on('click','.prc_btn',function(event){
          event.preventDefault();
          if($(this).attr('data-product-id')==0){
              var params={};
              prodId = $(this).attr('data-repair-id');
              var pos_t = $(this).offset().top + $(this).height() + 11;
              var pos_lf = $(this).offset().left - 175;
              $(".subscribe_cont").addClass('subscribe_catalog');
              $("div.subscribe_cont").css('position','absolute').css('top', pos_t ).css('left', pos_lf);
              $("div.subscribe_int").css('top', 0);
              addDecorOrder(prodId,params);
          }
          else if(onlyNotify==0){
              if ($(this).hasClass('modal-ajax-call')){return;}
              if (!$(this).hasClass('add_act')){
                  prodId = $(this).attr('data-product-id');
                  prodInfo = $(this).attr('data-info');
                  addToCart(prodId, prodInfo);
               }else{
                  window.location.href = Hprtl+'://'+ document.location.host+'/basket/';
               }
          }
          onlyNotify=0;
      });

      /*click button add cart mini button - old version*/
      $('.prc_td').on('click','.mini_buy_btn',function(event){
          event.preventDefault();
          if($(this).attr('data-product-id')==0){
              var params={};
              prodId=$(this).attr('data-repair-id');
              var pos_t = 41;
              var pos_lf = $(this).offset().left - 265;
              $(".subscribe_cont").addClass('subscribe_catalog');
              $("div.subscribe_cont").css('position','fixed').css('top', pos_t).css('left', pos_lf).css('z-index', 51);
              $("div.subscribe_int").css('top', 35);
              addDecorOrder(prodId, params);
          }
          else{
           if ($(this).hasClass('modal-ajax-call')){return;}
           if (!$(this).hasClass('add_act')){
              prodId=$(this).attr('data-product-id');
              prodInfo = $(this).attr('data-info');
              addToCart(prodId, prodInfo);
           }else{
              window.location.href = Hprtl+'://'+ document.location.host+'/basket/';
           }
          }
          onlyNotify=0;
      });
    } // if(!isBasket){


    /*shadow for text with limited height - animate for show */
    if ($('.state_lim').find('small').height() > $('.state_lim').height() && $('.state_lim').find('small').height() > 41){
      $('.state_lim').find('.shadow_ds').show();
    } else {
      $('.state_lim').find('.shadow_ds').hide();
    }

    let triger_stat = false;
    let default_stat = 75;
    let default_padding = 0;
    $('.state_lim').on({ // view 3 line text
      mouseenter: function(){
        let elem_disrc = $(this).find('small');
        default_padding = parseInt(elem_disrc.css('padding-top')) + parseInt(elem_disrc.css('padding-bottom'));
        if( (elem_disrc.height() + $(this).find('span').height() + default_padding) > $(this).height() && (elem_disrc.height() + $(this).find('span').height() + default_padding) > 41){
         triger_stat = true;
         $(this).animate({
          height: elem_disrc.height()+$(this).find('span').height() + default_padding,
          maxHeight: elem_disrc.height()+$(this).find('span').height() + default_padding
         },300);
         $(this).find('.shadow_ds').hide();
        }
      },
      mouseleave: function () {
        if (triger_stat){
          $(this).animate({
            height: default_stat,
            maxHeight: default_stat
          },200);
          $(this).find('.shadow_ds').show();
          triger_stat = false;
        }
      }
    });


    try {
      $('.tips:not(.filter-tipsy)').each(function () {
        $(this).tipsy({live: true, html: true, title : function () {
          let tth_id = $(this).attr('desc');
          return  $('#tth_desc_' + tth_id).html();
        }});
      });

      var login_topmenu=$('.line_up_kt .user_bl');
      var linkKabinet=$('.login_box').html();
      if(login_topmenu.length>0 && linkKabinet.indexOf('usercp')>0){
          login_topmenu.html(linkKabinet);
      }
      var numIncart=$('#numInCart');
      if(numIncart.length>0) numIncart.html($(".cart_info").attr("data-num"));

       $(".email2validate").focusout(function(){
         if ($(this).hasClass("email2validate")) {
            input = $(this);
            $.post("/ajax/email2validate.php", {value: $(this).val()}, function(txt){
              if (txt.length < 80 && txt.length > 0) {
                input.val(txt);
                input.removeClass("email2validate");
              }
            });
         }
       });

       $("#office-info").click(function(){
         if ($(this).hasClass("noInfo")) {
            input = $("#office-info-block");
            pid = input.attr("data-id");
            $.post("/ajax/getofcinfo.php", {id: pid}, function(txt){
              if (txt.length > 0) {
                input.html(txt);
                $(this).removeClass("noInfo");
              }
            });
         }
       });

       $("#ivtb .inner").click(function(){
         if ($(this).hasClass("noInfo")) {
            input = $(this);
            pid = input.attr("data-id");
            input.css("cursor","not-allowed");
            $.post("/ajax/getvtbinfo.php", {id: pid}, function(txt){
              if (txt.length > 0) {
                input.html(txt);
                input.removeClass("noInfo");
                input.css("cursor","help");
              }
            });
         } else input.html('');
       });

      let top_search = $("#top_srch_inp");
      if(top_search.length>0) {
        var acWidth = top_search.width() + parseInt(top_search.css('padding-left'));
        top_search.autocomplete('/search/ac2.php', {
          cacheLength: 2,
          width: acWidth,
          max: 7,
          scroll: true,
          scrollHeight: 300,
          matchContains: true,
          minChars: 2,
          selectFirst: false,
          formatItem: function(data) {
            data = data.toString();
            if (data.indexOf("<!DOCTYPE") >= 0) return "\n";
            if (data.indexOf("<") >= 0 || data.indexOf("&quot;") >= 0) return false;
            return data;
          }
         });
      }

    }
    catch(e) { console.log(e); }



    // ########################  COMPARE functional  ########################
    $('.form-note-comparison :checkbox').change(function() {
        let $parentNoteLink = $(this).parent().find('label.custom-control-label + span'),
        $parentNoteLabel = $(this).parent().find('label.custom-control-label');
        let pid = this.getAttribute('value');
        if ($(this).is(':checked')) {
            $parentNoteLabel.hide();
            $parentNoteLink.addClass('active');
            setCmpCookie('box_'+pid);
        } else {
            $parentNoteLabel.show();
            $parentNoteLink.removeClass('active');
            unSetCmpCookie('box_'+pid);
        }
    });
    $('.form-note-comparison span.custom-control-label').on('click', function() {
      $(this).removeClass('active').prev().show();
      $check = $(this).parent().find('input:checkbox');
      let pid = $check.prop('value');
      unSetCmpCookie('box_'+pid);
      $check.prop('checked', false);
      $check.removeAttr('checked');
    });
    $('span.product-comparison').on('click', function(e) {
      var pid = this.getAttribute('data-id');
      var chckd = false;
      if ($(this).hasClass('active')) {
        $('#bx_'+pid).remove();
        $(this).removeClass('active');
        chckd = false;
      } else {
        $(this).append('<input type="hidden" id="bx_'+pid+'" name="compare[]" value="'+pid+'">');
        $(this).addClass('active');
        chckd = true;
      }
      if (chckd){
        setCmpCookie('bx_'+pid);
      } else {
        unSetCmpCookie('bx_'+pid);
      }
    });
    $('span.cmplink').on('click', function(e) {
      e.stopPropagation();
      document.comp_form.submit();
    });
    $('span.cmplink2').on('click', function(e) {
      e.stopPropagation();
      document.comp_form.submit();
    });

    /* $(".db-delivery-category__hint").click(function(e) {
        //закрываем другие всплывашки этого же типа
        this.setAttribute('skip', '1');
        var tmp = document.getElementsByClassName('db-delivery-category__hint');
        for (var i = 0; i < tmp.length; i++) {
            if (tmp[i].getAttribute('skip') != '1') {
                $(tmp[i]).children(".title_box").fadeOut();
            }
        }
        this.removeAttribute('skip');
        $(this).children(".title_box").fadeIn();
       return false;
    });*/

    $(".dlv_close").click(function(e){
        $(this).parents(".title_box").fadeOut();
        return false;
    });

    $(document).click(function(e) {
        $(".title_box").fadeOut();
    });

    $(".rate_box .ttl").click(function(){ //table on delivery page
        $(".rate_info").slideToggle("slow");
        $(this).toggleClass("active");
    });

    /*add new size text for up menu*/
    $('.top_menu').each(function(){
        let hide_text = $(this).find('.hide_text_menu').html();
        $(this).find('.default_size_mn').after(hide_text);
    });

    $("#defence_btn").click(function(e) {
        setCookieValue('_defnice', 1, 30, '/', cookieDomain);
        return true;
    });


// ##############   google analytics events  #################
    $('[data-ga-click]').on('click', function(e){
        try {
            const data = $(this).data('gaClick').split(',');
            gaSend(data[0], data[1]);
        } catch (e) {
            console.log('data-ga-click');
        }
    });

    $('[data-ga-view]').each(function() {
        try {
            const data = $(this).data('gaView').split(',');
            gaSend(data[0], data[1]);
        } catch (e) {
            console.log('data-ga-view');
        }
    });

    // parser
    var eventAction = '';
    var path = getCurrentPath(window.location.pathname);

    /*if($('.widget-leaders-sells .row a').length > 0) {
        // 1 SalesLaderView
        eventAction = safeCategoryVendor(path);
        gaSend('SalesLaderView', eventAction);

        // 2 SaleaderClick
        $('.widget-leaders-sells .row a').on('click', function(){
            eventAction = safeCategoryVendor(path);
            gaSend('SaleaderClick', eventAction);
        })
    }*/

    // Constants
    const PRODUCT_LIST_PREVIEW = $('.preview-product .product-image a:not(.icon-row-look-3d), .preview-product .product-name a');
    const PRODUCT_LIST_BUY = $('.add2cart2 .btn-order:not(.modal-ajax-call)');
    const FIRST_PAGE = -1 === window.location.search.indexOf('page');


    // listing
    let marker = '';
    let isAction = false;
    if (path.length > 0) {
        switch (path[0]) {
            case 'repair':
            case 'sales':
            case 'decor':
                marker = path[0];
                break;

            case 'action':
                isAction = true;
                break;
        }
    }

    // Catalog
    if ((2 === path.length || 3 === path.length || marker) && $('#comp_form').length > 0 && !isAction) {
        marker = marker ? '_' + marker : '_norm';
        eventAction = safeCategoryVendor(path);
        eventAction += marker;

        if (FIRST_PAGE) {

            gaSend('ProdListFirstView', eventAction);

            PRODUCT_LIST_PREVIEW.on('click', function(){
                let path = getCurrentPath($(this).attr('href'));
                let eventAction = safeCategoryVendor(path);
                eventAction += marker;
                gaSend('ProdListFirstGoToKT', eventAction);
            });

            PRODUCT_LIST_BUY.on('click', function(){
                let path = getCurrentPath($(this).data('href'));
                let eventAction = safeCategoryVendor(path);
                eventAction += marker;
                gaSend('ProdListFirstGoToKT', eventAction);
            });
        }

        gaSend('ProdListView', eventAction);

        PRODUCT_LIST_PREVIEW.on('click', function(){
            let path = getCurrentPath($(this).attr('href'));
            let eventAction = safeCategoryVendor(path);
            eventAction += marker;
            gaSend('ProdListGoToKT', eventAction);
        });

        PRODUCT_LIST_BUY.on('click', function(){
            if ($(this).hasClass('modal-ajax-call')){return;}
            let path = getCurrentPath($(this).data('href'));
            let eventAction = safeCategoryVendor(path);
            eventAction += marker;
            gaSend('ProdListBuyButtonClick', eventAction);
            try {
                ga('send', 'pageview', '/addtocart');
            }catch(e) {  }
        });
    }

    // search
    if (1 === path.length && path[0] === 'search') {
        if (FIRST_PAGE) {
            gaSend('SearchListFirstView', 'novend');

            PRODUCT_LIST_BUY.on('click', function(){
                let href = $(this).data('href') || $(this).attr('href');
                let path = getCurrentPath(href);
                let eventAction = safeCategoryVendor(path);
                gaSend('SearchListFirstBuyButtonClick', eventAction);
            });
        }

        gaSend('SearchListView', 'novend');

        PRODUCT_LIST_PREVIEW.on('click', function(){
            let path = getCurrentPath($(this).attr('href'));
            let eventAction = safeCategoryVendor(path);
            gaSend('SearchListGoToKT', eventAction);
        });

        PRODUCT_LIST_BUY.on('click', function(){
            let path = getCurrentPath($(this).data('href'));
            let eventAction = safeCategoryVendor(path);
            gaSend('SearchListBuyButtonClick', eventAction);
            try {
                ga('send', 'pageview', '/addtocart');
            }catch(e) {  }
        });
    }

    // KT
    if (4 === path.length) {
        marker = marker ? '_' + marker : '_norm';
        eventAction = safeCategoryVendor(path) + marker;
        gaSend('ProdKTView', eventAction);

        $('a.mini_buy_btn, .button_product a').on('click', function(){
            gaSend('ProdKTBuyButtonClick', eventAction);
            try {
                ga('send', 'pageview', '/addtocart');
            }catch(e) {  }
        })
    }

    if ('action' === path[0]) {
        let activeTab = 'action';
        if (1 === path.length) {
            $('.tabs.clearfix a').on('click', function(){
                switch ( $(this).attr('rev') ) {
                    case 't2':
                        activeTab = 'action';
                        break;
                    case 't3':
                        activeTab = 'leaders';
                        break;
                    case 't4':
                        activeTab = 'new';
                        break;
                }
                gaSend('ActionsListFirstView', activeTab);
            });
        }

        $('.tabs-tbl-name a ').on('click', function(){
            gaSend('ActionsListGoToAction', activeTab);
        });

        if (2 <= path.length) {
            eventAction = path[1];
            eventAction += typeof path[2] !=='undefined' ? '_' + path[2] : '_nocat';
            eventAction += typeof path[3] !=='undefined' ? '_' + path[3] : '_novend';
            gaSend('ActionListView', eventAction);

            PRODUCT_LIST_PREVIEW.on('click', function(){
                gaSend('ActionListGoToKT', eventAction);
            });

            if (FIRST_PAGE) {
                PRODUCT_LIST_BUY.on('click', function(){
                    gaSend('ActionListFirstBuyButtonClick', eventAction);
                });
            }

            PRODUCT_LIST_BUY.on('click', function(){
                gaSend('ActionListBuyButtonClick', eventAction);
            });
        }
    }

    $('#top_search').on('focus', function() {
        eventAction = path[0] + '_' + safeCategoryVendor(path);
        gaSend('SearchLineUse', eventAction);
    });

    $('body').on('click','.border_meybe_bl',function(){
        if ( $(this).find('.but_fview').length > 0 ) {
            var path = getCurrentPath(window.location.pathname);
            eventAction = safeCategoryVendor(path);
            gaSend('ProdKTPreView', !eventAction ? path[0] : eventAction);
        }
    });

    $('body').on('click', '.sale_one', function() {
        var path = getCurrentPath(window.location.pathname);
        eventAction = safeCategoryVendor(path);
        gaSend('ProdKTPrevBuyButtonClick', !eventAction ? path[0] : eventAction);
    });

    // from phones
    var str_url = '';
    $('#phone_top .your_reg').click(function () {
        try { /*google analytics*/
            str_url = window.location.href;
            if ( str_url.indexOf('orders')>1 || str_url.indexOf('basket')>1) {
                if (typeof(trackClick) != 'undefined') trackClick('RegionsForm', 'Click header cart');
            }
            else {
                if (typeof(trackClick) != 'undefined') trackClick('RegionsForm', 'Click header');
            }
        } catch(err){}  /*end google analytics*/

        if($('#phone_top .all_reg')[0].innerHTML.length<200) {
            $.ajax({
            url: "/ajax/getRegionsTab.php?_=w",
            cache: true,
            success: function (data) {
                $('#phone_top .all_reg')[0].innerHTML = data;
                $('#reg_list').show();
                isOpen = true;
                $('.reg_letter .is').click( function(){
                    toggleStyleOfRegionsLinks($(this));
                });
            }
            });
        }else{
            $('#reg_list').show();
            isOpen = true;
        }
    });

    $('#reglist_order a').click(function () {
        if (isOpen) return false;
        try { /*google analytics*/
            str_url = window.location.href;
            if ( str_url.indexOf('orders')>1 || str_url.indexOf('basket')>1) {
                if (typeof(trackClick) != 'undefined') trackClick('RegionsForm', 'Click order cart');
            }
            else {
                if (typeof(trackClick) != 'undefined') trackClick('RegionsForm', 'Click order');
            }
        } catch(err){}  /*end google analytics*/

        if($('#reglist_order .all_reg')[0].innerHTML.length<200) {
            $.ajax({
                url: "/ajax/getRegionsTab.php?_=q",
                cache: true,
                success: function (data) {
                    $('#reglist_order .all_reg')[0].innerHTML = data;
                    $('.order_reglist').show();
                    isOpen = true;
                    $('.reg_letter .is').click( function(){
                        toggleStyleOfRegionsLinks($(this));
                    });
                }
            });
        }else{
            $('.order_reglist').show();
            isOpen = true;
        }
        return false;
     });

    $('#reg_list .reg_name').click(function () {
        closeRegionList();
    });

    $('.top_reg_list').mouseout(function () {triggerTimer();}).mouseover(function () {clearTimer();});
    $('.reg_letter .is').each(function(){
        $(this).bind('click', function(){
            toggleStyleOfRegionsLinks($(this));
        });
    });

    initMask();
});


//Костыль для лидеров продаж, убирающий категорию (длинную) в слое, содержащем товар-лидер при просмотре товаров одной категории
document.addEventListener('DOMContentLoaded', function() {
    /**
     * Функция-обработчик изменения ширины экрана. Берет глобальную переменную (array) adaptiveElements
     * и по ней показывает или прячет нужные строки в блоках с лидерами продаж
     */
    function resizeHandler() {
        for (var i = 0; i < adaptiveElements.length; i++) {
            var width = parseInt(adaptiveElements[i]['container'].style.width, 10);
            //console.clear(); console.log(width);
            $('.variableVis', adaptiveElements[i]['container']).css('display', width < adaptiveElements[i]['min-width']? 'none': 'inline-block');
        }
    }

    /**
     * Название категории (полное соблюдение вплоть до регистра), и минимальная ширина контейнера с лидером, меньше которой категория будет скрыта
     */
    var textMap = [
        ['Встраиваемая электрическая варочная панель', 279],
        ['Встраиваемый однокамерный холодильник', 292],
        ['Встраиваемый двухкамерный холодильник', 275],
        ['Встраиваемая газовая варочная панель', 242],
        ['Встраиваемый газовый духовой шкаф', 245],
        ['Встраиваемый электрический духовой шкаф', 283],
        ['Встраиваемая микроволновая печь СВЧ', 258],
        ['Полновстраиваемая посудомоечная машина', 250]
    ]
    var adaptiveElements = []; //Массив, содержащий слой-контейнер с товаром-лидером; ширину, меньше которой надо скрыть текст; и сам объект текста с переменной видимостью
    //Поиск элементов
    var elements = document.getElementsByClassName('swiper-slide');
    for (var i = 0; i < elements.length; i++) {
        var el = recursionSearch(elements[i]);
        if (el) {
            adaptiveElements.push({'container': elements[i], 'min-width': el['min-width']})
        }
    }
    setTimeout(function() {resizeHandler()}, 200);
    window.addEventListener('resize', function() {resizeHandler()});

    function recursionSearch(element, text) {
        var children = element.childNodes;
        if (children.length == 1 && typeof (children[0].tagName) == 'undefined') {
            var text = element.innerHTML;
            for (var j = 0; j < textMap.length; j++) {
                if (text.indexOf(textMap[j][0]) > -1) {
                    //Оборачиваем длинное название категории в span
                    text = text.replace(textMap[j][0], '<span class="variableVis">' + textMap[j][0] + '</span>');
                    element.innerHTML = text;
                    return {'min-width': textMap[j][1]};
                }
            }
        } else {
            for (var j = 0; j < children.length; j++) {
                var rv = recursionSearch(children[j]);
                if (rv) return rv;
            }
        }
        return false;
    }
}, false)


// URL tricks
function UrlTricks() {
  if (typeof(arguments[0]) != 'undefined') {
    var url = arguments[0];
  } else {
    var url = window.location.href;
  }
  UrlTricks.prototype.init(url);
}

UrlTricks.prototype = {
  initialized: false,
  hash: '',
  getParameters: {},
  regionalUrl: '',
  clearUrl: '',
  domain: '',
  subdomain: '',
  mobileDomain: '',
  protocol: '',
  regions: {},
  _backupInfo: {},

  init: function(url) {
    if (this.initialized) return;

    for (var regionId in regional_urls) {
      this.addRegion(regionId, regional_urls[regionId], special_regional_domains[regionId]);
    }

    var tmp = url.split('#');
    if (typeof(tmp[1]) != 'undefined') {
        this.hash = '#' + tmp[1];
    }
    var _url = tmp[0];
    tmp = _url.split('?'); _url = tmp[0];
    if (typeof(tmp[1]) != 'undefined') {
      var getParameters = tmp[1];
      tmp = getParameters.split('&');
      for (var i = 0; i < tmp.length; i++) {
        var getParameter = tmp[i];
        var tmp2 = getParameter.split('=');
        this.getParameters[tmp2[0]] = tmp2[1];
      }
    }

    if (!(/[\/]$/.test(_url))) {
      _url += '/';
    }
    for (var i in this.regions) {
      if (this.regions[i].regionalUrl != '' && _url.indexOf(this.regions[i].regionalUrl) > -1) {
        this.regionalUrl = this.regions[i].regionalUrl;
        _url = _url.replace(this.regions[i].regionalUrl, '');
        break;
      }
    }

    tmp = _url.split('//');
    if (typeof(tmp[1]) != 'undefined') {
      this.protocol = tmp[0];
      _url = tmp[1];
    }
    this.protocol += '//';
    tmp = _url.split('/');
    for (var i = 1; i < tmp.length; i++) {
      this.clearUrl += '/' + tmp[i];
    }
    var domain = tmp[0];
    if (domain.indexOf('m.') == 0) {
      this.mobileDomain = 'm.'
      domain = domain.replace('m.', '');
    }
    this.domain = domain;
    for (i in this.regions) {
      if (domain.indexOf(this.regions[i].subdomain) > -1) {
        this.subdomain = this.regions[i].subdomain;
        this.domain = domain.replace(this.regions[i].subdomain, '');
      }
    }

    this._backupInfo.clearUrl = this.clearUrl;
    this._backupInfo.regionalUrl = this.regionalUrl;
    this._backupInfo.getParameters = {};
    for (var parameter in this.getParameters) {
      this._backupInfo.getParameters[parameter] = this.getParameters[parameter];
    }
    this._backupInfo.hash = this.hash;
    this.initialized = true;
  },

  setParameter: function(parameter, value) {
    this.getParameters[parameter] = value;
  },

  removeParameter: function (parameter) {
    var _getParameters = {};
    for (var _parameter in this.getParameters) {
      if (parameter != _parameter) {
        _getParameters[_parameter] = this.getParameters[_parameter];
      }
    }
    this.getParameters = _getParameters;
  },

  getParameter: function(parameter) {
    return this.getParameters[parameter];
  },

  setHash: function(hash) {
    this.hash = '#' + hash;
  },

  getHash: function() {
    if (typeof(this.getParameters['discount']) != 'undefined' || typeof(this.getParameters['vendor_id']) != 'undefined') {
      return '#boxact_reviews'
    } else {
      if (this.hash == '#boxact_reviews' && (typeof(this._backupInfo.getParameters['discount']) != 'undefined' || typeof(this._backupInfo.getParameters['vendor_id']) != 'undefined')) {
        return '';
      } else {
        return this.hash;
      }
    }
  },

  setUrl: function(url) {
    if (!(/[\/]$/.test(url))) {
      url += '/';
    }
    if (!(/^[\/]/.test(url))) {
      url = '/' + url;
    }
    this.clearUrl = url;
  },

  setRegionalUrl: function(regionalUrl) {
    if (regionalUrl != '' && (!(/[\/]$/.test(url)))) {
      url += '/';
    }
    this.regionalUrl = url;
  },

  changeRegion: function(regionId) {
    if ((this.domain != 'holodilnik.ru' || this.mobileDomain != '') && this.regions[regionId].hasSubdomain == 0) {
      this.subdomain = '';
    } else {
      this.subdomain = this.regions[regionId].subdomain;
    }
    this.regionalUrl = this.regions[regionId].regionalUrl;
  },

  getUrl: function () {
    var _get = [];
    for (var parameter in this.getParameters) {
      _get.push(parameter + '=' + this.getParameters[parameter]);
    }
    _get = _get.join('&');
    if (_get != '')  _get = '?'+_get;
    var _rv = this.protocol + this.mobileDomain + this.subdomain + this.domain + this.clearUrl + this.regionalUrl + _get + this.getHash();
    return _rv;
  },

  reset: function() {
    this.clearUrl = this._backupInfo.clearUrl;
    this.regionalUrl = this._backupInfo.regionalUrl;
    this.getParameters = {};
    for (var parameter in this._backupInfo.getParameters) {
      this.getParameters[parameter] = this._backupInfo.getParameters[parameter];
    }
    this.hash = this._backupInfo.hash;
  },

  addRegion: function(regionId, regionalUrl, hasSubdomain) {
    this.regions[regionId] = {'subdomain': hasSubdomain == 1? regionalUrl + '.': 'www.',
      'regionalUrl': (hasSubdomain == 0 && regionId > 1)? regionalUrl + '/': '',
      'hasSubdomain': hasSubdomain
    }
  }
}

var urlTricks = new UrlTricks();

//Возвращает href для ссылки на фильтрацию по определенной скидке
function setDiscountHref(discount) {
    urlTricks.reset();
    urlTricks.setParameter('discount', discount);
    url = urlTricks.getUrl();
    if (document.getElementById('discount' + discount)) {
        document.getElementById('discount' + discount).href = url;
    }
    var tmp = document.getElementsByClassName('discount_' + discount);
    for (var i = 0; i < tmp.length; i++) {
        tmp[i].href = url;
    }
}