new Vue({
    el: '#root',
    data: {
        products: [],
        score: 100,
    },
    mounted() {
        let tasks = JSON.parse(localStorage.getItem("ticketsData"));

        // 如果localstorage有值,就賦值products 
        // 沒有就不變動,依然為空陣列
        if (tasks) {
            this.products = tasks;
        }
        console.log(this.products);
    },
    methods: {
        minus: function (product) {
            if (product.quantity > 1) {
                product.quantity--;
                // 存回localstorage
                localStorage.setItem("ticketsData", JSON.stringify(this.products));
            }
        },
        plus: function (product) {
            product.quantity++;
            // 存回localstorage
            localStorage.setItem("ticketsData", JSON.stringify(this.products));
        },
        remove: function (c) {
            let index = this.products.map(x => x.identify).indexOf(c);
            console.log(index);
            this.products.splice(index, 1);
            // 存回localstorage
            localStorage.setItem("ticketsData", JSON.stringify(this.products));
            // 同步讀取更新右上角購物車數量
            vue_instance.setCart();
        },
        totalPrice: function () {
            let sum = 0;
            this.products.forEach(function (product) {
                sum += product.price * product.quantity;
            });
            return sum;
        },
        payable: function () {
            let pay = 0;
            let sum = 0;
            this.products.forEach(function (product) {
                sum += product.price * product.quantity;
            });
            pay = sum - this.score;
            return pay;
        },

    },
}
);