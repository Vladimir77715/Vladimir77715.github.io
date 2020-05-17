var hrefDo;
var hrefDo_def  = 0;
var lngPriceReg = 0;
var actionRasrochka = 0;
var months = 36; //6
var firstpercent = 0; //10

$(document).ready(function(){
    if ($('#page_table').attr('data-options')=="true"){
        $(".credit_login2, .aut_login").css('display', 'block');
        $(".credit_login, .not_login").css('display', 'none');
    }else{
        $(".credit_login2, .aut_login").css('display', 'none');
        $(".credit_login, .not_login").css('display', 'block');
    }
    actionRasrochka =$('#credit').attr('data-actionRasrochka');
});

function doCredit(coockVal, bolLite) {//k15
  prodId = hrefDo;
  if (hrefDo_def != prodId) {
      hrefDo_def = prodId;
      var crdlite='';
      if (bolLite){
        document.cookie = 'creditLite=1; path=/;  domain='+$("#credit").attr('data-domain')+';';
        document.cookie = 'creditLite=1; path=/;  domain='+cookieDomain+';';
        crdlite='&show_cart=cart_credit_lite';
      }else{
        document.cookie = 'creditLite=0; path=/;  domain='+$("#credit").attr('data-domain')+';';
        document.cookie = 'creditLite=0; path=/;  domain='+cookieDomain+';';
      }
      document.cookie = $("#credit").attr('data-coockie')+'=' + coockVal + '; path=/;  domain='+$("#credit").attr('data-domain')+';';
      document.cookie = $("#credit").attr('data-coockie')+'=' + coockVal + '; path=/;  domain='+cookieDomain+';';
      ServiceClick=false;
      addToCart(prodId,crdlite);
  }
  return false;
}

function doCreditNL(coockVal, bolLite) {
    document.cookie = $("#credit").attr('data-coockie')+'=' + coockVal + '; path=/;  domain='+$("#credit").attr('data-domain')+';';
    document.cookie = $("#credit").attr('data-coockie')+'=' + coockVal + '; path=/;  domain='+cookieDomain+';';
    if (bolLite){
      document.cookie = 'creditLite=1; path=/;  domain='+$("#credit").attr('data-domain')+';';
      document.cookie = 'creditLite=1; path=/;  domain='+cookieDomain+';';
    }else{
      document.cookie = 'creditLite=0; path=/;  domain='+$("#credit").attr('data-domain')+';';
      document.cookie = 'creditLite=0; path=/;  domain='+cookieDomain+';';
    }
    document.location.href = '//' + document.location.host + '/credit/addcart/?hrefdo=' + hrefDo;
    return false;
}

function open_blok(hrefAdd, bolCreditLite, priceReg) {//k15
    console.log('block in open');
    hrefDo = hrefAdd;
    lngPriceReg = priceReg;
    $("div.credit_cont").css('display', 'block');
    if ($('#page_table').attr('data-options')=="true"){
        $(".credit_login2").css('display', 'block');
        $(".credit_login").css('display', 'none');
    } else {
        $(".credit_login2").css('display', 'none');
        $(".credit_login").css('display', 'block');
    }
    $("#credReg").show();
    if (bolCreditLite) {
        $("#idCredit").hide();
        $("#idCreditMore").hide();
        $("#idCreditMore2").hide();
        $("#hrefcred").hide();
        $("#hrefcredMC").hide();
        $("#idCreditLite").show();
        if ($('#credit').attr('data-actionRasrochka') == 0) {
          $("#idCreditMoreLite").show();
          $("#idCreditMoreLite2").show();
        }
        $("#hrefcredLite").show();
        $("#idUrlic").hide();
        $("#idUrlicLite").show();
        $("#mesPiter").hide();
        $("#mesPiterLite").show();
        if (priceReg == 0){
          $("#idCreditMoreLite2 #credReg #hrefcredLite").hide();
          $("#hrefcredLite").hide();
        }

    } else {
        $("#idCreditLite").hide();
        $("#idCreditMoreLite").hide();
        $("#idCreditMoreLite2").hide();
        $("#hrefcredLite").hide();
        $("#idCredit").show();
        $("#idCreditMore").show();
        $("#idCreditMore2").show();
        $("#hrefcred").show();
        $("#hrefcredMC").show();
        $("#idUrlic").show();
        $("#idUrlicLite").hide();
        $("#mesPiter").show();
        $("#mesPiterLite").hide();
    }
    if (priceReg <= 4000){
        $(".id3000").show();
    }else{
        $(".id3000").hide();
    }
    if (priceReg && !bolCreditLite){
        $(".calculator_box").show();
        initCreditCalc();
    }else{
        $(".calculator_box").hide();
    }
}
/*function close window block "Credit" page catalog*/
$(document).on('click',function(e) {
    var container = $('.credit_cont');
    if (container.has(e.target).length == 0 && !$(e.target).parents().hasClass('credit_link')
      && !$(e.target).parents().hasClass('block_mins') && container.css('display') != 'none'
      && !$(e.target).hasClass('add_credit_lite_box') ){
        close_credit_blok();
    }
});

function close_credit_blok(){
  $("div.credit_cont").css('display', 'none');
}

$(".credit_link").click(function(e){
  $("#credit").css('right','0px');
  $("div.credit_cont").css('top', e.pageY - 15).css('right', 5);
  if (typeof $(this).attr('data-credit-inf') != 'undefined') {
      //console.log($(this).attr('data-credit-inf'));
      var arr = $(this).attr('data-credit-inf').split('@');
      $('#idOnlineMonth').html(arr[0]);
      $('#idShopMonth').html(arr[1]);
      $('#idCredActURL').attr('href',arr[2]);
      $('#idCredActURLreg').attr('href',arr[2]);
  }
});

$(".add_credit_lite_box").click(function(e){
    $("div.credit_cont").css('top', e.pageY - 15).css('left', e.pageX+90).css('right', 'auto');
});

$(".block_mins").click(function(e){
    //console.log('in 1');
  if ($(this).parents('#white_back').length) {
      //console.log('in 2');
      var offset = $(this).offset();
      if ($("div.credit_form").css('width') == '418px'){
          $("div.credit_cont").offset({top: offset.top + 5, left: offset.left -310});
      }else{
          $("div.credit_cont").offset({top: offset.top + 5, left: offset.left -590});
      }

  } else {
      //console.log('in 3');
      if ($("div.credit_form").css('width') == '418px'){
          //console.log('in 4');
          $("div.credit_cont").css('top', e.pageY - 15).css('left', e.pageX-310);
      }else{
          //console.log('in 5');
          $("div.credit_cont").css('top', e.pageY - 15).css('left', e.pageX-590);
      }
  }
});

var intJSdomain = getCookieValue('intJSdomain');

if (intJSdomain != 1) {
  $(".add2cart a").click(function(e){
    document.cookie = $("#credit").attr('data-coockie')+'=; path=/;  domain='+$("#credit").attr('data-domain')+';';
  });
}

function initCreditCalc(){
  if (!bolMCcredit){ return;}

  if (!($('#idLoanTerm6').is(':checked') || $('#idLoanTerm12').is(':checked') || $('#idLoanTerm36').is(':checked'))){
    $("#idLoanTerm36").attr('checked', true);//6
  }

  if (!($('#idDownPayment0').is(':checked') || $('#idDownPayment10').is(':checked') || $('#idDownPayment20').is(':checked'))){
    $("#idDownPayment0").attr('checked', true);//10
  }

  if  (typeof months == 'undefined')  {
      var months = 6;
  }
  if ($('#idLoanTerm0').is(':checked'))  months = 6;
  if ($('#idLoanTerm12').is(':checked')) months = 12;
  if ($('#idLoanTerm36').is(':checked')) months = 36;

  var firstpercent = 0; //10
  if ($('#idDownPayment0').is(':checked')){
    firstpercent = 0;
  }else if ($('#idDownPayment10').is(':checked')){
    firstpercent = 10;
  }else{
    firstpercent = 20;
  }
  var percent  = 36.6;
  var downpayment = getdownpayment(firstpercent, lngPriceReg);
  var lngLoanAmount = lngPriceReg - downpayment;
  var apay = apayment(lngLoanAmount, percent, months);
  var ovrpay = overpayment(apay, months, lngLoanAmount);
  $('#idFirstPay').html(downpayment);
  $('#idOverPay').html(mceil(ovrpay));
  $('#idAPay').html(mceil(apay));

  document.cookie = 'creditC=' + firstpercent + '@' + months + '; path=/;  domain='+$("#credit").attr('data-domain')+';';
  document.cookie = 'creditC=' + firstpercent + '@' + months + '; path=/;  domain='+cookieDomain+';';
}

function getCreditCalc(obj){
  initCreditCalc();
}

function apayment(lngLoanAmount, percent, months){
    var p12 = percent/1200;
    var lngMonPay = lngLoanAmount* (p12 + p12/( Math.pow((1+p12),months) - 1 )) ;
    return lngMonPay;
}

function overpayment(apay, months, lngLoanAmount){
  return (apay*months - lngLoanAmount);
}

function mceil(n){
  return  (Math.ceil((n)*100)/100).toFixed(0); //2
}

function getdownpayment(firstpercent, cost) {
  return mceil(cost*firstpercent/100);
}
