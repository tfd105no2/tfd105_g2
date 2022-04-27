Vue.use(VueMask.VueMaskPlugin);
new Vue({
    el: '#root',
    data: {
        products: [],
        score: 0,
        payway: 'creditcard',
        creditcard: 'creditcard',
        linepay: 'linepay',
        current_edit: false,
        name: '',
        cardid: '',
        carddate: '',
        cardsafe: '',

    },
    mounted() {
        let tasks = JSON.parse(localStorage.getItem("ticketsData"));
        this.products = tasks;
        console.log(this.products);

        // 取折價金額
        this.score = sessionStorage.getItem('discount');
    },
    methods: {
        payable() {
            let sum = 0;
            this.products.forEach(function (item) {
                sum += item.price * item.quantity;
            });
            let num = sum - this.score;
            return num;
        },

        toggle() {
            if (this.payway === this.creditcard) {
                this.current_edit = true;

            } else {

                this.post();
            }
        },

        // edit(index) {
        //     this.current_edit = index;

        // },
        f_out() {
            this.current_edit = null;

        },
        confirmCard() {
            let val = /^[\u4E00-\u9FA5]+$/;
            let dateObj = this.carddate.split('/');
            let cardIdobj = this.cardid.length;
            this.cardid.innerHTML = cardIdobj;
            let cardSafeobj = this.cardsafe.length;
            this.cardsafe.innerHTML = cardSafeobj;

            if (val.test(this.name) == false) {
                alert('請輸入中文姓名');
                this.name = '';
                this.cardid = '';
                this.carddate = '';
                this.cardsafe = '';
            } else if (cardIdobj < 19) {
                alert('請輸入正確的信用卡號');
                this.name = '';
                this.cardid = '';
                this.carddate = '';
                this.cardsafe = '';
            } else if (dateObj[0] > 12 || dateObj[0] < 1 || dateObj[1] < 21 || dateObj[1] > 35) {
                alert('請輸入正確的有效日期');
                this.name = '';
                this.cardid = '';
                this.carddate = '';
                this.cardsafe = '';
            } else if (cardSafeobj != 3) {
                alert('請輸入正確安全碼');
                this.name = '';
                this.cardid = '';
                this.carddate = '';
                this.cardsafe = '';
            } else {

                // 關閉彈窗
                this.f_out();
                // 送出資料
                let order_id = Date.now().toString().slice(-6);
                let member_id = sessionStorage.getItem('member_id');
                let email = sessionStorage.getItem('account');
                axios.post("php/order.php", {
                        member_id: member_id,
                        order_id: order_id,
                        qrcode: order_id,
                        payway: this.payway,
                        order_status: 1,
                        payment_status: 1,
                        order_create: new Date(),
                        productList: this.products,
                        total_price: this.payable(),
                        coupon_value: 0,
                    })
                    .then(function (res) {
                        // alert('成功');
                        localStorage.clear();
                        // 同步讀取更新右上角購物車數量
                        vue_instance.setCart();
                        // 清除session
                        sessionStorage.removeItem('discount');
                        // 發qrcode至信箱
                        Email.send({
                            SecureToken: "9dbd2bf2-7775-4dbf-98b5-16602e43cbc0",
                            To: `${email}`,
                            From: "mm7217373@gmail.com",
                            Subject: "Kireiumi Park 入場憑證",
                            Body: `
                            <h2>Kireiumi Park 入場憑證</h2>
                            <img src="https://chart.googleapis.com/chart?cht=qr&chs=120x120&choe=UTF-8&chld=H|0&chl=https://tibamef2e.com/tfd105/g2/${res.data}">
                            `,
                        })

                    })
                    .catch(function (err) {
                        alert('失敗');
                    });
                axios.post("php/orderDetail.php", {
                        member_id: member_id,
                        order_id: order_id,
                        payway: this.payway,
                        order_create: new Date(),
                        productList: this.products,
                        total_price: this.payable(),
                        order_status: 1,
                        payment_status: 1,
                        coupon_value: 0,
                        order_type: 1
                    })
                    .then(function (res) {
                        // alert('成功');
                        // 轉址到成功頁面
                        location.href = "checkout_complet.html";
                    })
                    .catch(function (err) {
                        alert('失敗');
                    });

            }
        },


        post() {
            let order_id = Date.now().toString().slice(-6);
            let member_id = sessionStorage.getItem('member_id');
            axios.post("php/order.php", {
                    member_id: member_id,
                    order_id: order_id,
                    qrcode: order_id,
                    payway: this.payway,
                    order_status: 1,
                    payment_status: 1,
                    order_create: new Date(),
                    productList: this.products,
                    total_price: this.payable(),
                    coupon_value: 0,
                })
                .then(function (res) {
                    alert('成功');
                    localStorage.clear();
                    // 同步讀取更新右上角購物車數量
                    vue_instance.setCart();
                })
                .catch(function (err) {
                    alert('失敗');
                });
            axios.post("php/orderDetail.php", {
                    member_id: member_id,
                    order_id: order_id,
                    payway: this.payway,
                    order_create: new Date(),
                    productList: this.products,
                    total_price: this.payable(),
                    order_status: 1,
                    payment_status: 1,
                    coupon_value: 0,
                    order_type: 1
                })
                .then(function (res) {
                    alert('成功');
                })
                .catch(function (err) {
                    alert('失敗');
                });


            // line pay
            let params = new URLSearchParams();
            let products = this.products

            params.append("order_id", order_id);
            params.append("order_create", new Date);
            params.append("productList", JSON.stringify(products));
            params.append("total_price", this.payable());

            axios.post("php/request.php", params)
                .then(function (t) {
                    console.log(t);
                    window.location = t.data.info.paymentUrl.web
                })
                .catch(function (t) {
                    alert("失敗");
                });
        },
    },
})