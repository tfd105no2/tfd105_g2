"use strict";

$(function () {

    // 折扣馬歸戶
    // $.ajax({
    //     type: 'POST',
    //     url: 'php/get_coupon.php',
    //     success: function (data) {
    //         $('#MemberCoupon').val(data);
    //     }
    // });

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
        dataType: 'json',
        data: {
            email: userEmail,
        },
        success: function (data) {
            $('#MemberAccount').val(data[0].email);
            $('#MemberName').val(data[0].Name);
            $('#MemberPhone').val(data[0].phone_number);
            $('#MemberCoupon').val(data[0].coupon);
        },
    });

    // 修改密碼
    let oldPwd = $('#MemberPassword');
    let newPwd = $('#MemberNewPw');
    let cekPwd = $('#MemberCfPw');
    let isText = /^[a-zA-Z0-9]+$/;
    let include = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/;

    $('#changePwd').on('click', function (e) {
        e.preventDefault();
        if (oldPwd.val() != '' && newPwd.val() != '' && cekPwd.val() != '') {
            if (newPwd.val() != cekPwd.val()) {
                swal({
                    title: "確認密碼錯誤",
                    type: "error"
                });
            } else if (!isText.test(newPwd.val())) {
                swal({
                    title: "密碼請勿包含特殊字元",
                    type: "error"
                });
            } else if (newPwd.val().length < 6) {
                swal({
                    title: "密碼請勿少於6個字",
                    type: "error"
                });
            } else if (newPwd.val().length > 15) {
                swal({
                    title: "密碼請勿超過15個字",
                    type: "error"
                });
            } else if (!include.test(newPwd.val())) {
                swal({
                    title: "密碼至少包括一個大小寫字母或數字",
                    type: "error"
                });
            } else {
                $.ajax({
                    type: 'POST',
                    url: 'php/change_password.php',
                    data: {
                        email: userEmail,
                        oldPwd: oldPwd.val(),
                        newPwd: newPwd.val(),
                    },
                    success: function (res) {
                        res = JSON.parse(res)
                        if (res != '') {
                            swal({
                                title: "修改成功",
                                type: "success"
                            }).then(function () {
                                location.href = 'f_member.html';
                            });
                        } else {
                            swal({
                                title: "密碼錯誤",
                                type: "error"
                            })
                        }
                    }
                });
            }
        } else {
            swal({
                title: "資料未填完整",
                type: "error"
            });
        }
    })

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
        });
    })

    // 訂單查詢
    $.ajax({
        type: 'POST',
        url: 'php/member_order.php',
        dataType: 'json',
        data: {
            email: userEmail,
        },
        success: function (data) {
            for (let i = 0; i < data.length; i++) {
                if (data[i].order_status == 1) {
                    data[i].order_status = '已確認'
                } else {
                    data[i].order_status = '已取消'
                }
                $('#oderDetail').append(`
                <tr>
                    <td>${data[i].order_id}</td>
                    <td>${data[i].createdate.substr(0, 10)}</td>
                    <td>${data[i].order_status}</td>
                    <td>${data[i].total}</td>
                    <td><button class="checkTicket" value="${i}" type="button">查看</button></td>
                    <td><button class="checkDetail" value="${i}" type="button">查看明細</button></td>
                    <td><button class="btnCancel" value="${i}" type="button">取消</button></td>
                </tr>
                `)

                if ($('#oderDetail').find(`tr:nth-child(${i + 1}) td:nth-child(3)`).text() == '已取消') {
                    $('#oderDetail').find(`tr:nth-child(${i + 1}) td:nth-child(7) button`).css({
                        "background": "#828282",
                        "pointer-events": "none"
                    });
                    $('#oderDetail').find(`tr:nth-child(${i + 1}) td:nth-child(7) button`).attr("disabled", true);
                }

                $(document).on('click', function (e) {
                    // 查看明細
                    if ($(e.target).hasClass('checkDetail') && $(e.target).val() == i) {
                        $.ajax({
                            type: 'POST',
                            url: 'php/member_order_detail.php',
                            dataType: 'json',
                            data: {
                                orderId: data[i].order_id,
                            },
                            success: function (res) {
                                let contentHead = `
                                <table class="checkTable">
                                    <thead>
                                        <tr>
                                            <th>票券類型</th>
                                            <th>數量</th>
                                            <th>金額</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                `;
                                let contentBody = '';
                                let contentfoot = `</tbody></table>`;
                                for (let j = 0; j < res.length; j++) {
                                    contentBody += `
                                        <tr>
                                            <td>${res[j].ticket_role_name}</td>
                                            <td>${res[j].Purchase_amount}</td>
                                            <td>${res[j].price}</td>
                                        </tr>
                                        `
                                }
                                swal({
                                    title: "訂單",
                                    html: `
                                    ${contentHead + contentBody + contentfoot}
                                        `,
                                });
                            }
                        })
                    }
                    
                    // 查看QRCODE
                    if ($(e.target).hasClass('checkTicket') && $(e.target).val() == i) {
                        $.ajax({
                            type: 'POST',
                            url: 'php/member_order_detail.php',
                            dataType: 'json',
                            data: {
                                orderId: data[i].order_id,
                            },
                            success: function (res) {
                                let url = window.location.href;
                                let newUrl = url.replace('f_member.html', '')
                                if (res[0] != undefined) {
                                    swal({
                                        title: "入場憑證",
                                        html: `
                                            <img src="https://chart.googleapis.com/chart?cht=qr&chs=120x120&choe=UTF-8&chld=H|0&chl=${newUrl}${res[0].qrcode}">
                                            `,
                                    });
                                } else {
                                    // swal({
                                    //     title: "查無資料",
                                    //     type: "error"
                                    // });
                                    location.href = 'ticket.html';
                                }
                            }
                        })
                    }
                    // 取消訂單
                    if ($(e.target).hasClass('btnCancel') && $(e.target).val() == i) {
                        $.ajax({
                            type: 'POST',
                            url: 'php/member_cancel.php',
                            data: {
                                orderId: data[i].order_id,
                            },
                            success: function () {
                                swal({
                                    title: "取消成功",
                                    type: "success"
                                }).then(function () {
                                    $(e.target).css({
                                        "background": "#828282",
                                        "pointer-events": "none"
                                    });
                                    $(e.target).attr("disabled", true);
                                    $(e.target).closest("tr").children("td:nth-child(3)").text("已取消");
                                });
                            }
                        })
                    }
                })
            }
        },
    });

    $('#mbLogout').on('click', function() {
        swal({
            title: "登出",
            type: "success"
        }).then(function () {
            sessionStorage.clear();
            localStorage.clear();
            location.href = 'f_signin.html';
            vue_instance.member_status();
        });
    })

});