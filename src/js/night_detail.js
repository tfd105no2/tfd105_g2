
//
new Vue({
    el: '#maindd',
    data: {
        modal: false,
        checkData: [
            // {
            //     id: 21,
            //     area: "u;3隧道",
            //     bed_num: 20,
            //     img: "img/intro-pic-01.png",
            // }
        ],
        bedType: [
            {
                id: 20,
                type: '夜宿票',
                status: '成人票',
                price: 3180,
                quantity: 0,
            },
            {
                id: 20,
                type: '夜宿票',
                status: '兒童票',
                price: 1890,
                quantity: 0,
            },
            {
                id: 20,
                type: '夜宿票',
                status: '幼童票',
                price: 0,
                quantity: 0,
            },
            {
                id: 20,
                type: '夜宿票',
                status: '博愛票',
                price: 1890,
                quantity: 0,
            },
        ],
    },
    methods: {
        addcart(item) {
            this.modal = !this.modal;

            let obj = {
                'id': item.id,
                'type': item.type,
                'status': item.status,
                'price': item.price,
                'quantity': item.quantity,
                'img': item.url,
            }
        },
        minus(item) {
            if (item.quantity > 0) {
                item.quantity--;
            }
        },
        plus(item) {
            item.quantity++;
        }
    },
    created() {
        let checkData = JSON.parse(localStorage.getItem("checkData"));
        this.checkData = checkData;
        console.log(this.checkData);

    }
});

