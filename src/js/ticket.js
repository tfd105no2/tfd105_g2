new Vue({
    el: '#main',
    data: {
        modal: false,
        ticketsData: [
            {
                id: 1,
                type: '門票',
                status: '全票',
                price: 550,
                quantity: 1,
                url: 'img/tic_01.jpg'
            },
            {
                id: 2,
                type: '門票',
                status: '學生票',
                price: 400,
                quantity: 1,
                url: 'img/tic_02.jpg'
            },
            {
                id: 3,
                type: '門票',
                status: '孩童票',
                price: 250,
                quantity: 1,
                url: 'img/tic_03.jpg'
            },
            {
                id: 4,
                type: '門票',
                status: '博愛票',
                price: 250,
                quantity: 1,
                url: 'img/tic_04.jpg'
            },
        ],
    },
    methods: {
        addcart(item) {
            // alert("已加入購物車");
            this.modal = !(this.modal);
            // 要傳入 localstorage 的物件
            let obj = {
                'id': item.id,
                'type': item.type,
                'status': item.status,
                'price': item.price,
                'quantity': 1,
                'img': item.url,
            }

            // 先取出 localstorage ,判斷原本有無
            let ticketsData = JSON.parse(localStorage.getItem("ticketsData"));
            if (ticketsData) {
                ticketsData.push(obj);
            } else {
                ticketsData = [obj];
            }

            // 存回 localstorage
            localStorage.setItem("ticketsData", JSON.stringify(ticketsData));

        }

    },
});


