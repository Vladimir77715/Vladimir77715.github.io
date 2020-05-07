// достать параметры кредита

$(function () {

    // IF .popover ALREADY setted in main.js - comment this:
    // const popoverTpl =
    //     '<div class="popover" role="tooltip">' +
    //     '<div class="arrow"></div><div class="popover-close" data-dismiss="popover" aria-hidden="true"></div><div class="popover-body"></div>' +
    //     '</div>';
    // $('[data-popover-service][data-popover-content][data-credit-inf]').popover({
    //     trigger: 'manual',
    //     placement: function() {
    //         return $(this.element).attr('data-placement') || 'auto';
    //     },
    //     html: true,
    //     template: popoverTpl,
    //     content: function () {
    //         var content = $(this).attr("data-popover-content");
    //         return $(content).html();
    //     }
    // });


    $('[data-popover-service][data-credit-inf]').on('show.bs.popover', function () {

        $(document).on('click', '#idCredSber', function (e) {
            if (typeof doCreditSber != 'undefined') {
                doCreditSber();
                return false;
            }
        });

        $(document).on('click', '#idCredShow', function (e) {
            if (typeof doCreditNew != 'undefined') {
                doCreditNew();
                return false;
            }
        });

        $(document).on('click', '#idCredShopShow', function (e) {
            if (typeof doCreditShopNew != 'undefined') {
                doCreditShopNew();
                return false;
            }
        });

        $(document).on('click', '#credReg', function (e) {
            if (typeof doCreditNLNew != 'undefined') {
                doCreditNLNew();
                return false;
            }
        });

        $(document).on('click', '#idCredLiteShow', function (e) {
            if (typeof doCreditLiteNew != 'undefined') {
                doCreditLiteNew();
                return false;
            }
        });

        $(document).on('click', '#credLiteReg', function (e) {
            if (typeof doCreditLineNLNew != 'undefined') {
                doCreditLineNLNew();
                return false;
            }
        });

        var strCreditData = $(this).data('credit-inf');
        var strOnlineMonth = '';
        // данные
        if (typeof strCreditData !== 'undefined') {
            var arr = strCreditData.split('@');
            hrefDo = arr[3];

            if (typeof arr[4] !== 'undefined') {

                var arr2 = arr[4].split(';');

                switch (arr2[0]) {
                    case 'all': {
                        initCreditOnlineAndShop();
                        strOnlineMonth = arr[0];
                        initMonth(arr);
                        break;
                    }
                    case 'online': {
                        initCreditOnline();
                        strOnlineMonth = arr[0];
                        initMonth(arr);
                        break;
                    }
                    case 'shop': {
                        initCreditShop();
                        strOnlineMonth = arr[0];
                        initMonth(arr);
                        break;
                    }
                    default: {
                    }
                }//switch
            }

            if (typeof arr[5] !== 'undefined') {
                switch (arr[5]) {
                    case 'cart': {
                        if (strOnlineMonth != '') $('.cartOnlineMonth').html(strOnlineMonth);
                        $(".btn.btn-order").hide();
                        $(".btn.btn-credit").hide();
                        $(".btn.btn-installment").hide();

                        break;
                    }
                    default: {
                    }
                }//switch
            }

            if (typeof arr[6] !== 'undefined') {
                switch (arr[6]) {
                    case '1000': {
                        $('#idsber1000').html('<b>1000</b>');
                        break;
                    }
                    default: {
                        $('#idsber1000').html('');
                    }
                }//switch
            }

            if (typeof arr[7] !== 'undefined') {
                    $('#idMCPay').html('<b>'  + arr[7] + '</b>');
            }

            if (typeof arr[8] !== 'undefined') {
                $('#idSberPay').html('<b>'  + arr[8] + '</b>');
            }

        }
    });
});

function initCreditShop() {
    $("#credOnlineWin").removeClass("d-flex flex-column justify-content-between").hide();
    $("#idcontent").removeClass("popover-service-credit").removeClass("popover-service-installment").addClass("popover-service-installment");
    $("#credShopWin").removeClass("d-flex flex-column justify-content-between").addClass("d-flex flex-column justify-content-between").show().css("max-width", "100%");
}

function initCreditOnline() {
    $("#credShopWin").removeClass("d-flex flex-column justify-content-between").hide();
    $("#idcontent").removeClass("popover-service-credit").removeClass("popover-service-installment").addClass("popover-service-installment");
    $("#credOnlineWin").removeClass("d-flex flex-column justify-content-between").addClass("d-flex flex-column justify-content-between").show().css("max-width", "100%");
}

function initCreditOnlineAndShop() {
    $("#idcontent").removeClass("popover-service-credit").removeClass("popover-service-installment").addClass("popover-service-credit");
    $("#credOnlineWin").removeClass("d-flex flex-column justify-content-between").addClass("d-flex flex-column justify-content-between").show().css("max-width", "100%");
    $("#credShopWin").removeClass("d-flex flex-column justify-content-between").addClass("d-flex flex-column justify-content-between").show().css("max-width", "100%");
}

function initMonth(arr) {
    if (arr[0] === '10') {
        $('#idotp29').html('<b>С 29 ноября по 1 декабря 2019 г. </b>');
        $('#idotpOT').html('от АО "ОТП-Банк" ');
    } else {
        $('#idotp29').html('');
        $('#idotpOT').html('');
    }

    $('#idOnlineMonth').html(arr[0]);
    $('#idOnlineMonth').show();
    $('#idShopMonth').html(arr[1]);
    $('#idCredActURL').attr('href', arr[2] + '?' + arr[3]);
    $('#idCredActURLreg').attr('href', arr[2] + '?' + arr[3]);
}
