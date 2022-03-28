"use strict";
$(function () {

    let mbloginall_item = $('.mbloginall_item');
    let register_form = $('.register_form');
    let login_form = $('.login_form');

    register_form.hide();
    login_form.show();

    mbloginall_item.removeClass('js-m-active');
    mbloginall_item.eq(0).addClass('js-m-active');

    mbloginall_item.on('click', function (e) {
        register_form.hide();
        login_form.hide();

        mbloginall_item.removeClass('js-m-active');
        $(this).addClass('js-m-active');

        if ($(e.target).text() == '會員註冊') {
            register_form.show();
        } else {
            login_form.show();
        }

    })


})