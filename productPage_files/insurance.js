var strInsuranceMess = "Программа «Защита покупки» доступна только физическим лицам";
var strInsuranceMessLite = "Программа «Защита покупки лайт» доступна только физическим лицам";
var strDopWarNo = "Программа «Комфорт+» доступна только физическим лицам";

function ShowDopI(id, pid, paket, obj){
    var dow;
    if (obj.checked) {//не работает вот так: $("#idDopW" + id).is(":checked") и так document.getElementById(idDopW + id).checked
        dow = "add";
    }else{
        dow = "del";
    }

    if (int_user_type == 2 || $('#prs_n').is(":checked")) {
      var msg = [];
      if($("#idDopW" + id).attr('checked')){
          msg.push(strDopWarNo);
          $("#idDopW" + id).prop('checked', '');
      }
      if(obj.checked){
          msg.push($("#idDopI" + id).attr('isLite')=='1'?strInsuranceMessLite:strInsuranceMess);
          $("#idDopI" + id).prop('checked', '');
      }
      if(msg.length) alert(msg.join("\n"));
    }else{
      if(window.Hprtl===undefined) Hprtl='http';
      document.location.href =  Hprtl + "://" + document.location.host + "/addwar/?" + dow + "=" + pid + "&paket=" + paket + '&insurance';
    }
}

function addInsurance2Prd(pid){
    if(window.Hprtl===undefined) Hprtl='http';
    document.location.href =  Hprtl + "://" + document.location.host + "/addwar/?add=" + pid + "&insurance";
}

function insuranceChoice(event){
    var c = confirm('Возможность оформить страховой полис есть только для зарегистрированных клиентов. Продолжить оформление без страхового полиса?');
    if(!c) event.preventDefault();
}

$(document).ready(function() {
    $('.popupOpen, .add_guartant_box').bind('click', function(){
        if($(this).attr('name') == 'sk_blagosostoyanie') {
            if($('#popupWindowBlagosostoyanie').is(':visible')){
                $('#popupWindowBlagosostoyanie').hide();
            } else {
                $('#popupWindowBlagosostoyanie div.h2 > span').html($(this).html());
                $('#popupWindowBlagosostoyanie').show();
                if($(this).html().match(/лайт/)){
                    $('#common_list').hide();
                    $('#lite_list').show();
                    $('#popupWindowBlagosostoyanie div b.btn_hru_ylw > a').attr('href', '/sk_blago/?lite=1');
                } else {
                    $('#common_list').show();
                    $('#lite_list').hide();
                    $('#popupWindowBlagosostoyanie div b.btn_hru_ylw > a').attr('href', '/sk_blago/');
                }
            }
            $('.guarant_cont').hide();
        } else {
            if($('.guarant_cont').is(':visible')){
                $('.guarant_cont').hide();
            } else {
                $('.guarant_cont').show();
            }
            $('#popupWindowBlagosostoyanie').hide();
        }
    });
    $('.popupClose').bind('click', function(){
        $('.guarant_cont').hide();
        $('#popupWindowBlagosostoyanie').hide();
    });
});

function addInsuranceBlgsst(element){
  if(int_user_type == 2 || $('#prs_n').is(":checked")){
    $(element).prop('checked', false);
    alert($(element).attr('isLite')=='1'?strInsuranceMessLite:strInsuranceMess);
    return false;
  }
  else {
    var inp = $('<input type="hidden">');
    inp.attr('name', 'pers');
    inp.attr('value', $('#prs_n').is(':checked')?2:1);
    $(element).closest('form').append(inp);
    $(element).closest('form').find("input[name='recalc_x']").click();
  }
}

function AddDopBlago(pid, paket){
  if (int_user_type == 2 || $('#prs_n').is(":checked")) {
    alert(strDopWarNo);
  }else{
    if (bolDebugLoad){
    }else{
      if (!$('.comfort_btn').hasClass('add_act')){
        addToCart(pid,'&insurance');
        $('.comfort_btn').html('<div class="add_messenge_b">Программа Страхование техники добавлена к товару<span></span></div><i></i><span>Перейти в корзину</span>');
        $('.comfort_btn').addClass('add_act');
        setTimeout( function(){$('.comfort_btn .add_messenge_b').animate({ opacity:0},1000); }, 3000);
      }else{
        window.location.href=Hprtl+'://'+ document.location.host+'/basket/';
      }
    }
  }
}
