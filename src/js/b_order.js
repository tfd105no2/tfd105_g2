var vm = new Vue({
    el: '#root',
    data: {
        dbcheck: false,
        order_number: '',
        pay_list: ['已退款', '已付款'],
        form_list: ['已取消', '已確認'],
        order_type: ['', '門票', '夜宿'],
        mainbtn: [
            { name: "會員管理", url: "b_member.html" },
            { name: "訂單管理", url: "b_order.html" },
            { name: "消息管理", url: "b_news.html" },
            { name: "區域管理", url: "b_area.html" },
            { name: "訂票管理", url: "b_ticket.html" },
        ],
        titles: ['訂單編號', '會員帳號', '訂單類型', '付款方式', '付款狀態', '訂單狀態', '訂購日期', '',],
        orders: [
            // {
            //     'order_id': 'CD0SD02',
            //     'account': 'Harukadou@gmail.com',
            //     'order_type': '夜宿',
            //     'payment_status': 0,
            //     'order_status': 0,
            //     'checkin_status': 0,
            //     'order_date': '2021/01/01',
            //     'member_name': '溫刀郎',
            //     'member_phone': '32242424',
            //     'payment': ordertype[pay],
            //     'discount_id': '',
            //     'discount_price': 0
            // },

        ],
        pages: [
            { page: "<", url: "#" },
            { page: "1", url: "#" },
            { page: "2", url: "#" },
            { page: "3", url: "#" },
            { page: "4", url: "#" },
            { page: "5", url: "#" },
            { page: "...", url: "#" },
            { page: "20", url: "#" },
            { page: ">", url: "#" },
        ],
        current_edit: null,
        order_title: ['票種', '夜宿日期', '區域', '數量', '金額'],
        order_list: [
            // [
            //     { 'ticket_name': '全票', 'checkin_date': '20220301', 'area': '海底隧道', 'quantity': '1', 'price': '1000' },
            //     { 'ticket_name': '全票', 'checkin_date': '20220301', 'area': '海底隧道', 'quantity': '1', 'price': '1000' },
            //     { 'ticket_name': '全票', 'checkin_date': '20220301', 'area': '海底隧道', 'quantity': '1', 'price': '1000' },
            //     { 'ticket_name': '全票', 'checkin_date': '20220301', 'area': '海底隧道', 'quantity': '1', 'price': '1000' },
            //     { 'ticket_name': '全票', 'checkin_date': '20220301', 'area': '海底隧道', 'quantity': '1', 'price': '1000' },
            //     { 'ticket_name': '全票', 'checkin_date': '20220301', 'area': '海底隧道', 'quantity': '1', 'price': '1000' },
            //     { 'ticket_name': '全票', 'checkin_date': '20220301', 'area': '海底隧道', 'quantity': '1', 'price': '1000' },
            // ],
            // [
            //     { 'name': '孩童票', 'checkin_date': '', 'area': '', 'quantity': '1', 'price': '1000' },

            // ],

        ],
        nowpage: 1,
        select_number: '',
        total_cost: null,
        order_cost: null,
        orderTypeValue: null
    },
    mounted() {
        $.ajax({
            type: 'POST',
            url: 'php/b_order.php',
            dataType: 'json',
            success: function (data) {
                vm.pages = data[0];
                vm.orders = data[1];
            }
        });

    },
    methods: {
        edit(index) {
            // $.getJSON("php/b_orderList.php", function (res) {
            //     vm.order_list = res;
            //     console.log(res);

            // });
            let order_id = this.orders[index].order_id;
            // console.log(order_id);
            $.ajax({
                type: 'POST',
                url: 'php/b_orderList.php',
                data: {
                    order_id: order_id
                },
                dataType: 'json',
                success: function (data) {
                    vm.order_list = data;
                    console.log(vm.order_list);
                    // 商品總金額
                    let tot = vm.order_list;
                    console.log(vm.order_list);
                    for (let i = 0; i < tot.length; i++) {
                        // console.log(i);
                        vm.total_cost += (tot[i].price * tot[i].Purchase_amount);
                    }

                    // 訂單總金額                    
                    vm.order_cost = (vm.total_cost * 1) - (vm.orders[index].coupon_value * 1);

                }
            });

            this.current_edit = index;
            // 訂單編號
            this.select_number = this.orders[index].order_id;


            this.o_pay = this.orders[index].payment_status;
            this.o_form = this.orders[index].order_status;

        },

        f_close() {
            this.current_edit = null;
            vm.order_cost = 0;
            vm.total_cost = null;
            console.log(vm.order_cost);
        },
        log_out() {
            location.href = "back_login.html"
        },

        showOdata(gopage) {
            console.log(gopage);
            if (isNaN(gopage)) return;
            this.nowpage = gopage;

            if (orderTypeValue != null) {
                $.ajax({
                    method: "POST",
                    url: "php/b_orderType.php",
                    data: {
                        orderTypeValue: orderTypeValue,
                        page: gopage,
                    },
                    dataType: "json",
                    success: function (response) {
                        vm.pages = response[0];
                        // console.log(vm.pages);
                        vm.orders = response[1];
                        // console.log(response);
                    },
                    error: function (exception) {
                        alert("發生錯誤: " + exception.status);
                    },
                });
            } else {
                $.ajax({
                    method: "POST",
                    url: "php/b_order.php",
                    data: {
                        page: gopage,
                    },
                    dataType: "json",
                    success: function (response) {
                        vm.pages = response[0];
                        // console.log(vm.pages);
                        vm.orders = response[1];
                        // console.log(response);
                    },
                    error: function (exception) {
                        alert("發生錯誤: " + exception.status);
                    },
                });
            }

        },
        orderType(event) {
            // console.log(event.target.value);
            vm.orderTypeValue = event.target.value;
            $.ajax({
                method: "POST",
                url: "php/b_orderType.php",
                data: {
                    orderTypeValue: vm.orderTypeValue,
                },
                dataType: "json",
                success: function (response) {
                    vm.pages = response[0];
                    // console.log(vm.pages);
                    vm.orders = response[1];
                    // console.log(response);
                },
                error: function (exception) {
                    alert("發生錯誤: " + exception.status);
                },
            });
        },
        lookfor() {
            $.ajax({
                method: "POST",
                url: "php/b_order_search.php",
                data: {
                    order_number: vm.order_number
                },
                dataType: "json",
                success: function (res) {
                    vm.orders = res
                },

            });
        }
    },

})