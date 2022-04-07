Vue.component("login", {
        data() {
            return {
                acc: "",
                pwd: ""
            }
        },
        template: `
    <form class="login_form">
        <label for="acc">帳號</label><input type="text" id="acc" v-model="acc">
        <br>
        <label for="pwd">密碼</label><input type="text" id="pwd" v-model="pwd">
        <br>
        <input type="submit" value="登入" @click="login">
        <div>
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
            <label for="mail">電子信箱</label><input type="text" id="mail">
            <input type="button" value="送出">
        </div>
    </form>
    `,
        methods: {
            login(e) {
                e.preventDefault();
                $.ajax({
                    type: 'POST',
                    url: "php/member_login.php",
                    data: {
                        acc: this.acc,
                        pwd: this.pwd,
                    }
                })
            },
            forget(e) {
                e.preventDefault();
                $('#forget_box').show();
                $('.f_register').addClass('mask');
            },
            forgetClose() {
                $('#forget_box').hide();
                $('.f_register').removeClass('mask');
            }
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
            }
        },
        watch: {
            email: function (e) {
                let isMail = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
                if (!isMail.test(this.email)) {
                    this.emailError = true;
                    this.emailErrMsg = 'email格式錯誤';                    
                } else {
                    this.emailError = false;
                }
            },
            password: function () {
                let isText = /^[a-zA-Z0-9]+$/;
                let include = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/;
                if (!isText.test(this.password)) {
                    this.passwordError = true;
                    this.passErrMsg = '請勿包含特殊字元';
                } else if (this.password.length < 6) {
                    this.passwordError = true;
                    this.passErrMsg = '請勿少於6個字';
                } else if (this.password.length > 15) {
                    this.passwordError = true;
                    this.passErrMsg = '請勿超過15個字';
                } else if (!include.test(this.password)) {
                    this.passwordError = true;
                    this.passErrMsg = '至少包括一個大小寫字母或數字';
                } else {
                    this.passwordError = false;
                }
            },
            ckpwd: function () {
                if(this.ckpwd != this.password) {
                    this.ckpwdError = true;
                    this.ckpwdErrMsg = '確認密碼不符';
                } else {
                    this.ckpwdError = false;
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
        <label for="phone">手機號碼</label><input type="text" id="phone" v-model="phone">
        <br>
        <input type="submit" value="註冊" @click="register">
    </form>
    `,
        methods: {
            register(e) {
                e.preventDefault();
                let isText = /^[a-zA-Z0-9]+$/;
                let include = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/;
                let isMail = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
                if (this.username != '' && this.email != '' && this.password != '' && this.ckpwd != '' && this.phone != '') {
                    if (!this.emailError && !this.passwordError && !this.ckpwdError) {
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
                                    alert('註冊成功')

                                } else {
                                    alert('該賬號已被註冊')
                                }
                            },
                            error: function (data) {
                                console.log(data)
                                alert('連線失敗')
                            }
                        })
                    } else if (!isMail.test(this.email)) {
                        alert('email格式錯誤');
                    } else if (!isText.test(this.password)) {
                        alert('密碼請勿包含特殊字元');
                    } else if (this.password.length < 6) {
                        alert('密碼請勿少於6個字');
                    } else if (this.password.length > 15) {
                        alert('密碼請勿超過15個字');
                    } else if (!include.test(this.password)) {
                        alert('密碼至少包括一個大小寫字母或數字');
                    } else if (this.ckpwd != this.password) {
                        alert('確認密碼與密碼不符');
                    }
                } else {
                    alert('資料未填完整');
                }
            },
        },
    }),
    new Vue({
        el: "#app",
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
    if($(e.target).hasClass('mask')) {
        $('#forget_box').hide();
        $('.f_register').removeClass('mask');
    }
})