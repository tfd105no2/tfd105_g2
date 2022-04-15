
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

            // 用findIndex() 去找出符合函式多條件的資料索引值
            let index = ticketsData.findIndex(el => el.area_name == this.areaInfo.name && el.ticket_role_name == item.ticket_role_name);
            console.log(index);

            // 判斷 原本localstorage內是否存在該名稱資料
            if (ticketsData) {
                // 再判斷該陣列是否已加入過該商品
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
        console.log(this.areaInfo.name);

    }
});

