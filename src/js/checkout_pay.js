new Vue({
    el: '#root',
    data: {
        products: [],
        score: 100,
        payway: 'creditcard',
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
                })
                .catch(function (err) {
                    alert('失敗');
                })
        },
    },
})