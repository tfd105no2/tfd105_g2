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
        $('#PicBlock').css('background-image', 'none');
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

    // 會員資料
    let userEmail = sessionStorage.getItem('account');
    $.ajax({
        type: 'POST',
        url: 'php/member.php',
        data: {
            email: userEmail,
        },
        success: function (data) {
            let getData = JSON.parse(data);
            $('#MemberAccount').val(getData[0].email);
            $('#MemberName').val(getData[0].Name);
            $('#MemberPhone').val(getData[0].phone_number);
            $('#MemberCoupon').val(getData[0].coupon);
        },
    });

    // 更新資料
    $('#updateButton').on('click', function (e) {
        e.preventDefault();
        let newName = $('#MemberName').val();
        let newPhone = $('#MemberPhone').val();
        $.ajax({
            type: 'POST',
            url: 'php/member_update.php',
            data: {
                mail: userEmail,
                name: newName,
                phone: newPhone,
            },
            success: function (res) {
                if (res == '更新成功') {
                    swal({
                        title: "修改成功",
                        type: "success"
                    });
                }
            }
            // error: function () {
            //     alert('連線失敗');
            // },
        });
    })

    // 訂單查詢
    // $.ajax({
    //     type: 'POST',
    //     url: 'php/member_order.php',
    //     data: {
    //         email: userEmail,
    //     },
    //     success: function (data) {
    //         let getData = JSON.parse(data);
    //         // $('#MemberAccount').val(getData[0].email);
    //         // $('#MemberName').val(getData[0].Name);
    //         // $('#MemberPhone').val(getData[0].phone_number);
    //         // $('#MemberCoupon').val(getData[0].coupon);
    //     },
    //     // error: function () {
    //     //     alert('連線失敗');
    //     // },
    // });


});