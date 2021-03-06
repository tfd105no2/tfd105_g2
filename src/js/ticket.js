new Vue({
    el: '#main',
    data: {
        modal: false,
        ticketsData: [],


    },
    methods: {
        addcart(item) {
            // alert("已加入購物車");
            this.modal = !(this.modal);
            // 建立識別編號
            let identify_id = Date.now().toString().slice(-6);
            // 要傳入 localstorage 的物件
            let obj = {
                'identify': identify_id,
                'ticket_role_id': item.id,
                'ticket_role_name': item.ticket_role_name,
                'price': item.price,
                'quantity': 1,
                'image': item.image,
            }

            // 先取出 localstorage ,判斷原本有無陣列
            let ticket = localStorage.getItem("ticketsData");
            let ticketsData = JSON.parse(ticket);

            if (ticket) {
                // 再繼續判斷 原本localstorage 裡是否已加入過該商品
                // 先用map取出ticketsData內的 id 陣列 ,再用 indexOf 查找是否包含該id
                // 有的話返回索引值, 沒有的話返回 -1 

                let index = ticketsData.map(function (x) {
                    return x.ticket_role_id;
                }).indexOf(item.id);

                if (index != -1) {
                    ticketsData[index].quantity += 1;
                } else {
                    ticketsData.push(obj);
                }

            }
            else {
                ticketsData = [obj];
            }

            // 存回 localstorage
            localStorage.setItem("ticketsData", JSON.stringify(ticketsData));
            // 同步讀取更新右上角購物車數量
            vue_instance.setCart();
        }

    },
    mounted() {

        // 地雷
        // axios.then裡面是回呼函式, 若用傳統函式寫法,this 是指向 window,導致沒辦法塞值到vue內
        // 改用 箭頭函式, this指向外層作用域的this, 故 this = Vue.
        axios.get('php/ticket_role.php')
            .then((res) => {
                this.ticketsData = res.data;
            })
            .catch((err) => {
                console.log(err);
            })

    },
});


