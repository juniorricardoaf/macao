'use strict';

$(window).on('scroll', function () {
    if ($(window).scrollTop()) {
        $('#header_principal').addClass('barra');
    } else {
        $('#header_principal').removeClass('barra');
    }
})