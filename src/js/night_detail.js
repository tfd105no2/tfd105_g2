
//
new Vue({
    el: '#main',
    data: {
        modal: false,
        areaInfo: {
            name: "",
            image: "",
            overnight_date: "",
        },
        bedType: [],

    },
    methods: {
        addcart(item) {
            this.modal = !this.modal;
            // 建立識別編號
            let identify_id = Date.now().toString().slice(-6);
            let obj = {
                'identify': identify_id,
                'area_name': this.areaInfo.name,
                'ticket_role_id': item.id,
                'ticket_role_name': item.ticket_role_name,
                'price': item.price,
                'quantity': item.quantity,
                'image': this.areaInfo.image,
                'overnight_date': this.areaInfo.overnight_date,
            }

            let ticket = localStorage.getItem("ticketsData");
            let ticketsData = JSON.parse(ticket);

            // 用findIndex() 去找出符合函式多條件的資料索引值
            let index = ticketsData.findIndex(el => el.area_name == this.areaInfo.name && el.ticket_role_name == item.ticket_role_name);
            console.log(index);

            // 判斷 原本localstorage內是否存在該名稱資料
            if (ticket) {
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
            // 同步讀取更新右上角購物車數量
            vue_instance.setCart();

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

        // 取區域票類型
        axios.get('php/night_role.php')
            .then(res => {
                this.bedType = res.data;

            })

        // 取目前區域名稱
        this.areaInfo.name = $('.ssr').text();
        console.log(this.areaInfo.name);
        // 去目前區域圖路徑
        this.areaInfo.image = $('.title_img').attr("src");
        console.log(this.areaInfo.image);

        // 取目前夜宿日期
        let date = $('.overnight_date').text().split("/");
        if (date[1] < 10 && date[2] < 10) {
            date[1] = '0' + date[1];
            date[2] = '0' + date[2];
        } else if (date[1] < 10 && date[2] > 10) {
            date[1] = '0' + date[1];
        } else if (date[1] > 10 && date[2] < 10) {
            date[2] = '0' + date[2];
        };
        console.log(date);
        this.areaInfo.overnight_date = date.join("-");
        console.log(this.areaInfo.overnight_date);
    }
});

