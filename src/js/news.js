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

    $.ajax({
        type: 'POST',
        url: 'php/news_notice.php',
        success: function (data) {
            let getData = JSON.parse(data);
            for (let i = 0; i < getData.length; i++) {
                $('#parkList').append(`
                <li class="news_item">
                    <a href="./news_detail.html?id=${getData[i].id}">
                        <img src="${getData[i].News_image}" alt="news${i}">
                        <div class="news_item_content">
                            <h6>${getData[i].News_title}</h6>
                            <p>${getData[i].News_document}</p>
                        </div>
                    </a>
                </li>
                `);
            }
        },
    });

    $.ajax({
        type: 'POST',
        url: 'php/news_event.php',
        success: function (data) {
            let getData = JSON.parse(data);
            for (let i = 0; i < getData.length; i++) {
                $('#activeList').append(`
                <li class="news_item">
                    <a href="./news_detail.html?id=${getData[i].id}">
                        <img src="${getData[i].News_image}" alt="news${i}">
                        <div class="news_item_content">
                            <h6>${getData[i].News_title}</h6>
                            <p>${getData[i].News_document}</p>
                        </div>
                    </a>
                </li>
                `);
            }
        },
    });

});