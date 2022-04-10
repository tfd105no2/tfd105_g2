new Vue({
    el: '#root',
    data: {
        products: [
            // {
            //     id: 1,
            //     name: '全票',
            //     // date: '2022/03/22',
            //     // area: '大洋池親近區',
            //     img: 'img/ticket01.jpeg',
            //     unitPrice: 550,
            //     quantity: 1,
            // },
            // {
            //     id: 2,
            //     name: '夜宿體驗-全票',
            //     date: '2022/03/14',
            //     area: '大洋池親近區',
            //     img: 'img/ticket02.jpg',
            //     unitPrice: 3180,
            //     quantity: 1,
            // }
        ],
        score: 100,
    },
    created: function () {
        let tasks = JSON.parse(localStorage.getItem("ticketsData"))
        this.products = tasks;
        console.log(this.products);
    },
    methods: {
        minus: function (product) {
            if (product.quantity > 1) {
                product.quantity--;
            }
        },
        plus: function (product) {
            product.quantity++;
        },
        remove: function (id) {
            let index = this.products.map(x => x.id).indexOf(id);
            this.products.splice(index, 1);
            console.log(this.products);
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
        finallist: function () {
            localStorage.setItem('ticketsData', JSON.stringify(this.products))
        },
    },
}
);