"use strict";

$(function () {

    // tab切換
    let info_item = $('main.info_box > .info_list .info_item');
    let info_content = $('main.info_box div.info_content');
    // 內容
    info_content.addClass('js-hide');
    info_content.eq(0).removeClass('js-hide');
    // tab title
    info_item.eq(0).addClass('js-i-active');
    info_item.on('click', function () {
        // tab title
        info_item.removeClass('js-i-active');
        $(this).addClass('js-i-active');
        // 內容
        let tab_infoid = $(this).data('tab');
        info_content.each(function () {
            let that = $(this);
            // 判斷顯示內容
            if (tab_infoid == that.attr('id')) {
                that.removeClass('js-hide');
                that.addClass('js-show');
                // 預設顯示
                that.addClass('js-active');
            } else {
                that.removeClass('js-show');
                that.addClass('js-hide');
            }
        });
    })

    // 滑入
    $(window).on('scroll', function () {
        $('.js-slide').each(function () {
            let dY = $(window).scrollTop() + $(window).height();
            // scroll至該項頂端顯示
            if (dY > $(this).offset().top) {
                $(this).addClass('js-active');

                // 垂直視差
                $(this).addClass('js-float');
                let that = $(this);
                setTimeout(function () {
                    that.removeClass('js-float');
                }, 300)

            } else {
                $(this).removeClass('js-active')
            }



        });
    });

});