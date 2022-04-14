
//
new Vue({
    el: '#main',
    data: {
        modal: false,
        areaInfo: {
            name: "",
            image: "img/intro-pic-01.png",
        },
        bedType: [
            {
                id: 21,
                ticket_role_name: '成人票',
                price: 3180,
                quantity: 0,
            },
            {
                id: 22,
                ticket_role_name: '兒童票',
                price: 1890,
                quantity: 0,
            },
            {
                id: 23,
                ticket_role_name: '幼童票',
                price: 0,
                quantity: 0,
            },
            {
                id: 24,
                ticket_role_name: '博愛票',
                price: 1890,
                quantity: 0,
            },
        ],
    },
    methods: {
        addcart(item) {
            this.modal = !this.modal;

            let obj = {
                'area_name': this.areaInfo.name,
                'ticket_role_id': item.id,
                'ticket_role_name': item.ticket_role_name,
                'price': item.price,
                'quantity': item.quantity,
                // 'image': item.url,
            }

            let ticketsData = JSON.parse(localStorage.getItem("ticketsData"));
            if (ticketsData) {
                // 判斷購物車是否已經加過該商品
                // 用map取出 ticketsData內的id陣列
                // 再用 indexOf 取索引值,沒有該值會返回 -1, 有的話則返回索引值
                let index = ticketsData.map(function (b) { return b.ticket_role_id }).indexOf(item.id);
                if (index != -1) {
                    ticketsData[index].quantity += item.quantity;
                } else {
                    ticketsData.push(obj);
                }

            } else {
                ticketsData = [obj];
            }

            item.quantity = 0;
            // 回存 localstorage
            localStorage.setItem("ticketsData", JSON.stringify(ticketsData));


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
    mounted() {
        this.areaInfo.name = $('.ssr').text();

    }
});

