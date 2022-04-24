"use strict";
$(function () {

    let urlParams = new URLSearchParams(window.location.search);
    let news_id = urlParams.get('id');
    $.ajax({
        type: 'POST',
        url: 'php/news_detail.php',
        dataType: 'json',
        data: {
            id: news_id
        },
        success: function (res) {
            $('#detailTitle').text(res[0].News_title)
            if (res[0].news_style == 0) {
                $('#newsStyle').text('園區公告');
            } else {
                $('#newsStyle').text('限定公告');
            }
            $('#detailBox').append(`
            <img src="${res[0].News_image}" alt="${res[0].News_title}">
            <div class="text_area">
                <h6>${res[0].create_date}</h6>
                <h5>${res[0].News_title}</h5>
                <p>${res[0].News_document}</p>
                <div class="back">
                    <img src="img/news_detail_bg1.png" alt="backgroundPic1">
                    <a href="./news.html">返回</a>
                    <img src="img/news_detail_bg2.png" alt="backgroundPic2">
                </div>
            </div>
            `)
        }
    })

})