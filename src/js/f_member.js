"use strict";

$(function () {

    // 選擇圖片
    $('#ChoosePic').on('click', function () {
        $('#PicInput').click();
    });
    $('#PicInput').on('change', function () {
        // 內建語法
        let reader = new FileReader();
        // 內建函式
        reader.readAsDataURL(this.files[0]);
        // 針對reader綁定load事件(讀取完)
        reader.onload = function () {
            $('#PicBlock img').remove();
            $('#PicBlock').append(`<img class="member_pic" src="${this.result}">`);
        }
    });
    // tab切換
    let member_item = $('#FMember .member_body .member_list li.member_item');
    let member_form = $('#FMember .member_body form.member_form');
    member_form.hide();
    member_form.eq(0).show();
    member_item.eq(0).addClass('js-m-active');
    member_item.on('click', function () {
        member_item.removeClass('js-m-active');
        $(this).addClass('js-m-active');
        member_form.hide();
        let tab_id = $(this).data('tab');
        $('#' + tab_id).show();
    });

});