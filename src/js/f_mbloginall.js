"use strict";
$(function () {

    let mbloginall_item = $('.mbloginall_item');
    let register_form = $('.register_form');
    let login_form = $('.login_form');

    // tab
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

    // 註冊
    $('#registerForm').on('submit', function (e) {
        e.preventDefault();
        let name_data = $('#mbSignName').val();
        let mail_data = $('#mbSignMail').val();
        let pwd_data = $('#mbSignPassword').val();
        let ckpwd_data = $('#mbCheckPassword').val();
        let phone_data = $('#mbSignpPhone').val();

        let reg_data = {
            'username': name_data,
            'email': mail_data,
            'password': pwd_data,
            'ckpwd': ckpwd_data,
            'phone': phone_data
        }

        let registerData = JSON.parse(sessionStorage.getItem('registerData'));

        if (registerData) {
            let compare = true;

            if (compare) {
                // sessionStorage.setItem('registerData', JSON.stringify(reg_data));

            }
        } else {
            // sessionStorage.setItem('registerData', JSON.stringify(reg_data));
            let getData = JSON.stringify(reg_data);
            $.ajax({
                type: "POST",
                url: "member_sign.php",
                data: getData,
                success: function (data) {
                    if (data != "") {
                        alert(data);
                    }
                },
                error: function () {
                    alert("錯誤");
                }
            });

        }
    })

    //密碼顯示隱藏
    var input = document.querySelector('#mbPassword')
    var imgs = document.getElementById('eyes');
    //判斷每次點選的效果
    var flag = 0;
    imgs.onclick = function () {
        if (flag == 0) {
            input.type = 'text';
            eyes.src = '../img/openeye.png'; //睜眼圖
            flag = 1;
        } else {
            input.type = 'password';
            eyes.src = '../img/closeeye.png'; //閉眼圖
            flag = 0;
        }
    }

    //忘記密碼彈窗
    let forgetPassword = document.querySelector('.forgetpw')
    let btnAdd = document.querySelector('.button');

})
