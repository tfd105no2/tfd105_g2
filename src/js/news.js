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
        dataType: 'json',
        success: function (data) {
            for (let i = 0; i < data.length; i++) {
                $('#parkList').append(`
                <li class="news_item">
                    <a href="./news_detail.html?id=${data[i].id}">
                        <img src="${data[i].News_image}" alt="news${i}">
                        <div class="news_item_content">
                            <h6>${data[i].News_title}</h6>
                            <p>${data[i].News_document}</p>
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
        dataType: 'json',
        success: function (data) {
            for (let i = 0; i < data.length; i++) {
                $('#activeList').append(`
                <li class="news_item">
                    <a href="./news_detail.html?id=${data[i].id}">
                        <img src="${data[i].News_image}" alt="news${i}">
                        <div class="news_item_content">
                            <h6>${data[i].News_title}</h6>
                            <p>${data[i].News_document}</p>
                        </div>
                    </a>
                </li>
                `);
            }
        },
    });

    $('.more').on('click', function () {
        let tabNum = $('.js-i-active').data('tab');
        let newStyle = '';
        if (tabNum == 'TabInfor01') {
            newStyle = 0;
        } else {
            newStyle = 1;
        }
        $.ajax({
            type: 'POST',
            url: 'php/news_readmore.php',
            dataType: 'json',
            data: {
                status: newStyle,
            },
            success: function (data) {
                console.log(newStyle)
                if (newStyle == 0) {
                    $('#parkList').empty();
                } else {
                    $('#activeList').empty();
                }
                for (let i = 0; i < data.length; i++) {
                    if (newStyle == 0) {
                        // $('#parkList').empty();
                        $('#parkList').append(`
                        <li class="news_item">
                            <a href="./news_detail.html?id=${data[i].id}">
                                <img src="${data[i].News_image}" alt="news${i}">
                                <div class="news_item_content">
                                    <h6>${data[i].News_title}</h6>
                                    <p>${data[i].News_document}</p>
                                </div>
                            </a>
                        </li>
                        `)
                    } else {
                        $('#activeList').append(`
                        <li class="news_item">
                            <a href="./news_detail.html?id=${data[i].id}">
                                <img src="${data[i].News_image}" alt="news${i}">
                                <div class="news_item_content">
                                    <h6>${data[i].News_title}</h6>
                                    <p>${data[i].News_document}</p>
                                </div>
                            </a>
                        </li>
                        `)
                    }
                }
            }
        });
        // if (tabNum == 'TabInfor01') {
        //     console.log('1')
        // } else {
        //     console.log('2')
        // }
    })

});