var strDopWarNo = "Программа «Комфорт+» доступна только физическим лицам";
var strWarLoc='';
var bolDebugLoad = bolDebugLoad || false;
if (window.Hprtl===undefined) Hprtl='http';
var ServiceClick=false;

function ShowDopW(id, pid, paket, obj){
    var dow;

    if (obj.checked) {
        dow = "add";
    }else{
        dow = "del";
    }

    if (int_user_type == 2 || $('#prs_n').is(":checked")) {
        var msg = [];
        if($("#idDopW" + id + ':checked').length) {
            $("#idDopW" + id).prop('checked', false);
            msg.push(strDopWarNo);
        }
        if(msg.length) {
            alert(msg.join("\n"));
        }
    }else{
        document.location.href = Hprtl + "://" + document.location.host + "/addwar/?" + dow + "=" + pid + "&paket=" + paket + '&warranty';
    }
}

function AddDopW(pid, paket){
    if (int_user_type == 2 || $('#prs_n').is(":checked")) {
        alert(strDopWarNo);
    }else{
        if (!$('.comfort_btn').hasClass('add_act')){
            addToCart(pid,'&warranty');
            $('.comfort_btn').html('<div class="add_messenge_b">Программа Комфорт+ добавлена к товару<span></span></div><i></i><span>Перейти в корзину</span>');
            $('.comfort_btn').addClass('add_act');
            setTimeout( function(){$('.comfort_btn .add_messenge_b').animate({ opacity:0 },1000);    }, 3000);
        }else{
            window.location.href = Hprtl + "://" + document.location.host + "/basket/";
        }
    }
}

function AddAdditionalServices(pid, warrantyPaket){
    var programs = [];

    str = "";
    if($('#warrantyCheck').is(':checked')) {
        str = '&warranty';
        programs.push("«Комфорт+»");
    }else{
        str = '&delete_warranty';
    }
    if($('#insuranceCheck').is(':checked')) {
        str = str + '&insurance';
        if($('#insuranceCheck').attr('isLite') == '1') {
            programs.push("«Защита покупки лайт»");
        } else {
            programs.push("«Защита покупки»");
        }
    }else{
        str = str +'&delete_insurance';
    }

    if (int_user_type == 2 && str!='') {
        programsStr = programs.join(' и ');
        alert('Программ'+(programs.length == 1 ?'а':'ы')+' '+programsStr+' доступн'+(programs.length == 1 ?'а':'ы')+' только физическим лицам!');
        $("#warrantyCheck").attr('checked', false);
        $("#insuranceCheck").attr('checked', false);
        $('.prc_btn').attr('href',$('.button_product').attr('data-href'));
        return false;
    }

    if(str == "") {
        $('.prc_btn').attr('href',$('.button_product').attr('data-href'));
        return false;
    }
    ServiceClick=true;
    addToCart(pid,str);
}

function setLinkWar(){
    if (intWarPID) strWarLoc = strWarLoc + '?pwarid=' + intWarPID;
    document.location.href =  strWarLoc;
    return false;
}

function close_guarant_blok(){
    $("div.guarant_cont").css('display', 'none');
}

function close_credit_kor_blok(){
  $("div.credit_kor_cont").css('display', 'none');
}
function close_credit_lite_blok(){
  $("div.credit_lite_cont").css('display', 'none');
}

function setScrollCookie(){
    setCookieValue("s_reg", 1, 14, '/', cookieDomain);
}


$(document).ready(function(){
    $("#warrantyCheck").click(function(){
        AddAdditionalServices($('.about_product_more').attr('data-id'), 2);
    });

    $("#insuranceCheck").click(function(){
        AddAdditionalServices($('.about_product_more').attr('data-id'), 2);
    });

    var intWarPID = 0;
    var strWarLoc = Hprtl + "://" + document.location.host + '/komfort/';
    $(".fts_name").click(function(e){
        e.preventDefault();
        blockId=$(this).attr('data-id');
        block=$("#"+blockId);

        if(block.css('display') == 'block'){
            block.css('display', 'none');
        } else {
            block.css('display', 'block');
            block.css('top', e.pageY + 15);
            block.css('left', (e.pageX - 500));
            //ССылка из КТ
            if($(this).attr('name') == 'sk_blagosostoyanie'){
                block.find('div.h2 > span').html('Программа '+$(this).html());
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
        }
    });
});
