Vue.use(VueMask.VueMaskPlugin);
new Vue({
    el: '#root',
    data: {
        products: [],
        score: 100,
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
            } else if (this.payway === '') {

                return

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
                location.href = "checkout_complet.html";
            }
        },


        post() {
            let order_id = Date.now().toString().slice(-6);
            axios.post("php/order.php",
                {
                    order_id: order_id,
                    qrcode: `checkticket.html?order_id=${order_id}`,
                    payway: this.payway,
                    order_status: '已完成',
                    payment_status: '已付款',
                    order_create: new Date(),
                    productList: this.products,
                    total_price: this.payable(),
                })
                .then(function (res) {
                    alert('成功');
                    localStorage.clear();
                })
                .catch(function (err) {
                    alert('失敗');
                })
        },
    },
})