jQuery(function($){

    $.getJSON('/js/privacy-policy.json', function (data) {
        try {
            $('#collapsePrivacyBody').html(data[0]);
        } catch(e) {}
    });


    $('div.one_click_box > div.one_click_hdr').click(function(){
        $('div.one_click_box > div.one_click_nav').toggleClass('one_click_open');
        $('div.one_click_box > div.one_click_info').toggle();
        if ($('div.one_click_box > div.one_click_info:visible').length) {
            initMask();
        }
    });
});

var successOneClick = function (id){
    if(needAnalitics) {
        try {
            ga('send', 'event', 'forms', 'submit', 'oneclick_na', 0);
        } catch (err) {
            console.log('we have error here: ' + err)
        }
        try {
            yaCounter42.reachGoal('oneclick_na');
        } catch (err) {
            console.log('we have error here: ' + err)
        }
    }
    $('#one_click_link').remove();
    $('.one_click_info').html('<p>Спасибо, Ваш заказ № '+id+' принят!<br><br>'+
        'В ближайшее время с Вами свяжется наш специалист для уточнения деталей заказа.<br><br>'+'Ожидайте звонка.</p>');
}

if(useOneClickOrder){
    successOneClick(oneClickData);
} else {
    function trimStr(s) {
        s = s.replace(/^\s+/, '');
        for (var i = s.length - 1; i >= 0; i--) {
            if (/\S/.test(s.charAt(i))) {
                s = s.substring(0, i + 1);
                break;
            }
        }
        return s;
    }

    $('#one_click_link').click(function () {
        var phone = $('#one_click_phone').val();
        if (phone) {
            if(!$.trim(phone).replace(/[\s\(\)\-]+/g,'').match(/\d{5,}/)){
                alert("Введите пожалуйста ваш телефон в правильном формате.");
                $('#one_click_phone').focus();
                return false;
            }
            var trmPhone =trimStr(phone);
            if(trmPhone=="" || trmPhone=='8(****)**-**-**' || trmPhone=='8(***)***-**-**' || trmPhone=='8' || (phone).match(/\*/)  ) {
                alert("Введите пожалуйста ваш телефон.");
                $('#one_click_phone').focus();
                return false;
            }

            var agreement = $('#check_in_confme_one_click');
            if (agreement.length > 0 && !agreement.is(':checked')) {
                alert("Подтвердите, что вы согласны на обработку Ваших персональных данных.");
                $('#check_in_confme_one_click').focus();
                return false;
            }


            var phone= $('#one_click_phone').val();
            if (phone) {
                $('#one_click_link').unbind('click');
                $('#one_click_link').html('Создание...');
                $.ajax({
                    type: "POST",
                    dataType: "json",
                    url: '/ajax/oneclick.php',
                    data: { phone: phone, id1c: ID1c },
                    success: function (response) {
                        debugger;
                        successOneClick(response.id);
                    }
                });
            }
        } else {
            alert("Введите, пожалуйста, Ваш телефон.");
        }
    });
}
