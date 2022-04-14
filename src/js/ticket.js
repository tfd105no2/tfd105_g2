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
            // 要傳入 localstorage 的物件
            let obj = {
                'ticket_role_id': item.id,
                'type': item.type,
                'ticket_role_name': item.ticket_role_name,
                'price': item.price,
                'quantity': 1,
                'image': item.image,
            }

            // 先取出 localstorage ,判斷原本有無陣列
            let ticketsData = JSON.parse(localStorage.getItem("ticketsData"));
            if (ticketsData) {
                // 再繼續判斷 原本localstorage 裡是否已加入過該商品
                // 先用map取出ticketsData內的 id 陣列 ,再用 indexOf 查找是否包含該id
                // 有的話返回索引值, 沒有的話返回 -1 

                let index = ticketsData.map(function (x) {
                    return x.ticket_role_id;
                }).indexOf(item.id);

                if (index != -1) {
                    console.log(index);
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

        }

    },
    mounted() {

        // 地雷
        // axios.then裡面是回呼函式, 若用傳統函式寫法,this 是指向 window,導致沒辦法塞值到vue內
        // 改用 箭頭函式, this指向外層作用域的this, 故 this = Vue.
        axios.get('php/ticket.php')
            .then((res) => {
                console.log(this);
                this.ticketsData = res.data;
                console.log(this.ticketsData);
            })
            .catch((err) => {
                console.log(err);
            })

    },
});


