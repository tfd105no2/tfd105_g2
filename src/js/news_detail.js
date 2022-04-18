"use strict";
$(function () {

    let urlParams = new URLSearchParams(window.location.search);
    let news_id = urlParams.get('id');
    $.ajax({
        type: 'POST',
        url: 'php/news_detail.php',
        data: {
            id: news_id
        },
        success: function(res) {
            let getRes = JSON.parse(res)
            console.log(getRes)
            $('#detailBox').append(`
            <img src="${getRes[0].News_image}" alt="${getRes[0].News_title}">
            <div class="text_area">
                <h6>${getRes[0].News_update}</h6>
                <h5>${getRes[0].News_title}</h5>
                <p>${getRes[0].News_document}</p>
                <div class="back">
                    <img src="img/news_detail_bg1.png" alt="backgroundPic1">
                    <a href="./newnews.html">返回</a>
                    <img src="img/news_detail_bg2.png" alt="backgroundPic2">
                </div>
            </div>
            `)
        }
    })

})