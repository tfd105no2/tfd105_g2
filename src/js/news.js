"use strict";

$(function () {

    // tab切換
    let info_item = $('#news main.news_box > .tab .tab_item');
    let info_content = $('main.news_box div.news_content');
    info_content.hide();
    info_content.eq(0).show();
    info_item.eq(0).addClass('js-i-active');
    info_item.on('click', function () {
       
        info_item.removeClass('js-i-active');
        $(this).addClass('js-i-active');
        info_content.hide();
        let tab_infoid = $(this).data('tab');
        $('#' + tab_infoid).show();
        
    })

});