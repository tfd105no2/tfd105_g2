Vue.component("login", {
        data() {
            return {
                acc: '',
                pwd: '',
                pwdEye: 'open',
                userMail: '',
            }
        },
        template: `
    <form class="login_form">
        <div>
            <label for="acc">帳號</label><input type="text" id="acc" v-model="acc">        
        </div>        
        <div class="login_pwd">
            <label for="pwd">密碼</label><input type="password" id="pwd" v-model="pwd">
            <i class="fa-solid fa-eye" @click="pwdEye='open'" :class="openEye"></i>
            <i class="fa-solid fa-eye-slash" @click="pwdEye='close'" :class="closeEye"></i>
        </div>
        <div class="login_btn">
            <input type="submit" value="登入" @click="login">
        </div>
        <div class="forget_pwd">
            <a @click="forget">忘記密碼</a>
        </div>
        <p>或</p>
        <div class="login_other">
            <button>繼續使用 <i class="fa-brands fa-facebook"></i> 登入</button>
            <button>繼續使用 <i class="fa-brands fa-google"></i> 登入</button>
        </div>
        <div class="forget_box" id="forget_box">
            <span @click="forgetClose"><i class="fa-solid fa-xmark"></i></span>
            <p>忘記密碼</p>
            <label for="mail">電子信箱</label><input type="text" id="mail" v-model="userMail">
            <input type="button" value="送出" @click="sendMail">
        </div>
    </form>
    `,
        methods: {
            login(e) {
                e.preventDefault();
                if (this.acc != '' && this.pwd != '') {
                    location.href = 'f_member.html';
                    $.ajax({
                        type: 'POST',
                        url: "php/member_login.php",
                        data: {
                            acc: this.acc,
                            pwd: this.pwd,
                        },
                        success: function (data) {
                            if (data == '登入成功') {
                                swal({
                                    title: "登入成功",
                                    type: "success"
                                });
                            } else {
                                swal({
                                    title: "帳號或密碼錯誤",
                                    type: "error"
                                });
                            }
                        },
                        error: function (data) {
                            console.log(data)
                            swal({
                                title: "連線失敗",
                                type: "error"
                            });
                        }
                    })
                } else {
                    swal({
                        title: "請輸入帳號密碼",
                        type: "warning"
                    });
                }
            },
            forget(e) {
                e.preventDefault();
                $('#forget_box').show();
                $('.f_register').addClass('mask');
            },
            forgetClose() {
                $('#forget_box').hide();
                $('.f_register').removeClass('mask');
            },
            sendMail() {
                Email.send({
                    SecureToken: "9dbd2bf2-7775-4dbf-98b5-16602e43cbc0",
                    To: `${this.userMail}`,
                    From: "mm7217373@gmail.com",
                    Subject: "忘記密碼",
                    Body: "testtesttesttesttesttest"
                }).then(
                    message => alert(message)
                );
            }
        },
        computed: {
            openEye() {
                if (this.pwdEye == 'open') {
                    return 'js-eye';
                }
                $('#pwd').attr('type', 'text')
            },
            closeEye() {
                if (this.pwdEye == 'close') {
                    return 'js-eye';
                }
                $('#pwd').attr('type', 'password')
            },
        },
    }),
    Vue.component("register", {
        data() {
            return {
                username: "",
                email: "",
                password: "",
                ckpwd: "",
                phone: "",
                emailError: false,
                emailErrMsg: '',
                passwordError: false,
                passErrMsg: '',
                ckpwdError: false,
                ckpwdErrMsg: '',
                phoneError: false,
                phoneErrMsg: '',
            }
        },
        watch: {
            email: function () {
                let isMail = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
                if (!isMail.test(this.email)) {
                    this.emailError = true;
                    this.emailErrMsg = 'email格式錯誤';
                } else {
                    this.emailError = false;
                    this.emailErrMsg = '';
                }
            },
            password: function () {
                let isText = /^[a-zA-Z0-9]+$/;
                let include = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/;
                if (!isText.test(this.password)) {
                    this.passwordError = true;
                    this.passErrMsg = '密碼請勿包含特殊字元';
                } else if (this.password.length < 6) {
                    this.passwordError = true;
                    this.passErrMsg = '密碼請勿少於6個字';
                } else if (this.password.length > 15) {
                    this.passwordError = true;
                    this.passErrMsg = '密碼請勿超過15個字';
                } else if (!include.test(this.password)) {
                    this.passwordError = true;
                    this.passErrMsg = '密碼至少包括一個大小寫字母或數字';
                } else {
                    this.passwordError = false;
                    this.passErrMsg = '';
                }
            },
            ckpwd: function () {
                if (this.ckpwd != this.password) {
                    this.ckpwdError = true;
                    this.ckpwdErrMsg = '確認密碼不符';
                } else {
                    this.ckpwdError = false;
                    this.ckpwdErrMsg = '';
                }
            },
            phone: function () {
                let isPhone = /^09[0-9]{8}$/;
                if (!isPhone.test(this.phone)) {
                    this.phoneError = true;
                    this.phoneErrMsg = '手機格式錯誤';
                } else {
                    this.phoneError = false;
                    this.phoneErrMsg = '';
                }
            },
        },
        template: `
    <form class="register_form">
        <label for="username">姓名</label><input type="text" id="username" v-model="username">
        <br>
        <label for="email">註冊信箱</label><input type="text" id="email" v-model="email" :class="{textError:emailError}">
        <br>
        <label for="password">密碼</label><input type="text" id="password" v-model="password" :class="{textError:passwordError}">
        <br>
        <label for="ckpwd">確認密碼</label><input type="text" id="ckpwd" v-model="ckpwd" :class="{textError:ckpwdError}">
        <br>
        <label for="phone">手機號碼</label><input type="text" id="phone" v-model="phone" :class="{textError:phoneError}">
        <br>
        <input type="submit" value="註冊" @click="register">
    </form>
    `,
        methods: {
            register(e) {
                e.preventDefault();
                if (this.username != '' && this.email != '' && this.password != '' && this.ckpwd != '' && this.phone != '') {
                    if (!this.emailError && !this.passwordError && !this.ckpwdError && !this.phoneError && this.password == this.ckpwd) {
                        $.ajax({
                            type: "POST",
                            url: "php/member_sign.php",
                            data: {
                                username: this.username,
                                email: this.email,
                                password: this.password,
                                ckpwd: this.ckpwd,
                                phone: this.phone
                            },
                            success: function (data) {
                                if (data == '註冊成功') {
                                    swal({
                                        title: "註冊成功",
                                        type: "success"
                                    });
                                    // 轉址登入頁
                                } else {
                                    swal({
                                        title: "帳號已被註冊",
                                        type: "error"
                                    });
                                }
                            },
                            error: function (data) {
                                console.log(data)
                                swal({
                                    title: "連線失敗",
                                    type: "error"
                                });
                            }
                        })
                        // 額外判斷當確認密碼輸入完成，又重改密碼的時候
                    } else if (this.password != this.ckpwd) {
                        this.ckpwdError = true;
                        this.ckpwdErrMsg = '確認密碼不符';
                        swal({
                            title: `${this.ckpwdErrMsg}`,
                            type: "warning"
                        });
                    } else if (this.emailError) {
                        swal({
                            title: `${this.emailErrMsg}`,
                            type: "warning"
                        });
                    } else if (this.passwordError) {
                        swal({
                            title: `${this.passErrMsg}`,
                            type: "warning"
                        });
                    } else if (this.ckpwdError) {
                        swal({
                            title: `${this.ckpwdErrMsg}`,
                            type: "warning"
                        });
                    } else if (this.phoneError) {
                        swal({
                            title: `${this.phoneErrMsg}`,
                            type: "warning"
                        });
                    }
                } else {
                    swal({
                        title: "資料未填完整",
                        type: "warning"
                    });
                }
            },
        },
    }),
    new Vue({
        el: "#f_sign",
        data: {
            show: "login"
        },
        computed: {
            signin() {
                return "login" == this.show ? {
                    "js-m-active": !0
                } : {
                    "js-m-active": !1
                }
            },
            signup() {
                return "register" == this.show ? {
                    "js-m-active": !0
                } : {
                    "js-m-active": !1
                }
            }
        }
    });

$(document).on('click', (e) => {
    // 關閉forget_box
    if ($(e.target).hasClass('mask')) {
        $('#forget_box').hide();
        $('.f_register').removeClass('mask');
    }
})