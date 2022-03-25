Vue.component('double-check', {
    template:
        ` 
        <div class="dbc">
            <section></section>
            <p>尚未存檔，是否確認關閉</p>
            <div>
                <button type="button" @click='cancel'>取消</button>
                <button type="button" @click='sure'>確認</button>
            </div>
        </div>                
        `
    ,
    methods: {
        sure() {
            this.$emit('save')
        },
        cancel() {
            this.$emit('cancel')
        }
    },
});

var appVue = new Vue({
    el: '#root',
    data: {
        dbcheck: false,
        order_number: '',
        pay_list: ['未付款', '已付款', '付款失敗', '退款中', '已退款'],
        form_list: ['處理中', '已確認', '已完成', '已取消'],
        checkin_list: ['未報到', '已報到', '已過期'],

        mainbtn: [
            { name: "會員管理", url: "b_member.html" },
            { name: "訂單管理", url: "b_order.html" },
            { name: "消息管理", url: "b_news.html" },
            { name: "房間管理", url: "b_area.html" },
            { name: "訂票管理", url: "b_ticket.html" },
        ],
        titles: ['訂單編號', '會員帳號', '訂單類型', '付款狀態', '訂單狀態', '夜宿狀態', '訂購日期', '',],
        orders: [
            {
                'order_id': 'CD0SD01',
                'account': 'Harukadou@gmail.com',
                'order_type': '夜宿',
                'payment_status': 0,
                'order_status': 0,
                'checkin_status': 0,
                'order_date': '2021/01/01',
                'member_name': '大偉盧曼',
                'member_phone': '32242424',
                'payment': '線上付款',
                'discount_id': 'sea300',
                'discount_price': 300
            },
            {
                'order_id': 'CD0SD02',
                'account': 'Harukadou@gmail.com',
                'order_type': '夜宿',
                'payment_status': 0,
                'order_status': 0,
                'checkin_status': 0,
                'order_date': '2021/01/01',
                'member_name': '溫刀郎',
                'member_phone': '32242424',
                'payment': '線上付款',
                'discount_id': '',
                'discount_price': 0
            },

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
            [
                { 'ticket_name': '全票', 'checkin_date': '20220301', 'area': '海底隧道', 'quantity': '1', 'price': '1000' },
                { 'ticket_name': '全票', 'checkin_date': '20220301', 'area': '海底隧道', 'quantity': '1', 'price': '1000' },
                { 'ticket_name': '全票', 'checkin_date': '20220301', 'area': '海底隧道', 'quantity': '1', 'price': '1000' },
                { 'ticket_name': '全票', 'checkin_date': '20220301', 'area': '海底隧道', 'quantity': '1', 'price': '1000' },
                { 'ticket_name': '全票', 'checkin_date': '20220301', 'area': '海底隧道', 'quantity': '1', 'price': '1000' },
                { 'ticket_name': '全票', 'checkin_date': '20220301', 'area': '海底隧道', 'quantity': '1', 'price': '1000' },
                { 'ticket_name': '全票', 'checkin_date': '20220301', 'area': '海底隧道', 'quantity': '1', 'price': '1000' },
            ],
            [
                { 'ticket_name': '孩童票', 'checkin_date': '', 'area': '', 'quantity': '1', 'price': '1000' },

            ],

        ],
        nowpage: 1,
        select_number: '',
        total_cost: null,
        order_cost: null,
    },
    created: function () {
        this.showOdata(1);
    },
    methods: {
        edit(index) {
            this.current_edit = index;

            // 訂單編號
            this.select_number = this.orders[index].order_id;

            // 商品總金額
            let tot = this.order_list[index];

            for (let i = 0; i < tot.length; i++) {
                this.total_cost += (tot[i].price * 1)
            }

            // 訂單總金額                    
            this.order_cost = (this.total_cost * 1) - (this.orders[index].discount_price * 1);

            //狀態
            this.o_pay = this.orders[index].payment_status;
            this.o_form = this.orders[index].order_status;
            this.o_check = this.orders[index].checkin_status;

        },

        f_close() {
            this.dbcheck = true;
            let edit_z = document.querySelector('.b_order_edit');
            edit_z.style.opacity = 0;
        },

        sss() {
            this.current_edit = null;
            this.dbcheck = false;
            let edit_z = document.querySelector('.b_order_edit');
            edit_z.style.opacity = 1;

            this.total_cost = null;
        },

        ccc() {
            this.dbcheck = false;
            let edit_z = document.querySelector('.b_order_edit');
            edit_z.style.opacity = 1;
        },


        f_save() {

            let n_index = this.$data.current_edit;

            this.orders[n_index].payment_status = this.o_pay;
            this.orders[n_index].order_status = this.o_form;
            this.orders[n_index].checkin_status = this.o_check;


            this.current_edit = null;
            this.total_cost = null;

            // $.ajax({
            //     method: "POST",
            //     url: "../php/n-order_update.php",
            //     data: {
            //         order_list: this.orders[n_index].order_list, // 該會員帳號
            //         payment_status: this.orders[n_index].payment_status, //付款狀態
            //         order_status: this.orders[n_index].order_status, // 訂單狀態
            //         shipping_status: this.orders[n_index].shipping_status, //貨運狀態
            //     },
            //     dataType: "text",
            //     success: function (response) {
            //         alert("更新成功");
            //     },
            //     error: function (exception) {
            //         alert("發生錯誤: " + exception.status);
            //     }
            // });

        },
        log_out() {
            location.href = "back_login.html"
        },

        showOdata(gopage) {
            console.log(gopage);
            if (isNaN(gopage)) return;
            this.nowpage = gopage;

            // $.ajax({
            //     method: "POST",
            //     url: "../php/getOrderData.php",
            //     data: {
            //         page: gopage,
            //     },
            //     dataType: "json",
            //     success: function (response) {
            //         appVue.pages = response[0];
            //         appVue.orders = response[1];
            //         appVue.order_list = response[2];
            //     },
            //     error: function (exception) {
            //         alert("發生錯誤: " + exception.status);
            //     },
            // });
        },
        lookfor() {
            const self = this;

            // $.ajax({
            //     method: "POST",
            //     url: "../php/n-selecto.php",
            //     data: {
            //         search: self.order_number
            //     },
            //     dataType: "json",
            //     success: function (res) {
            //         self.orders = res
            //     },

            // });
        }
    },

})