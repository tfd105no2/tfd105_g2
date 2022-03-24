// Vue.component('double-check', {
//     template:
//         ` 
//         <div class="dbc">
//             <section></section>
//             <p>尚未存檔，是否確認關閉</p>
//             <div>
//                 <button type="button" @click='cancel'>取消</button>
//                 <button type="button" @click='sure'>確認</button>
//             </div>
//         </div>                
//         `
//     ,
//     methods: {
//         sure() {
//             this.$emit('save')
//         },
//         cancel() {
//             this.$emit('cancel')
//         }
//     },
// });
new Vue({
    el: '#root',
    data: {
        dbcheck: false,
        member_number: '',
        m_status: 0,
        mainbtn: [
            { name: "會員管理", url: "b_member.html" },
            { name: "訂單管理", url: "b_order.html" },
            { name: "消息管理", url: "b_news.html" },
            { name: "房間管理", url: "b_area.html" },
            { name: "訂票管理", url: "b_ticket.html" },

        ],
        member_number: '',
        titles: ['票券編號', '購買日期', '票種', '狀態', '使用時間'],
        tickets: [
            {
                'ticket_id': 'XD203301',
                'buy_date': '2022/01/01',
                'ticket_type': '全票',
                'ticket_status': '已使用',
                'use_date': '2022/03/01 09:00:00'
            },
            {
                'ticket_id': 'XD203301',
                'buy_date': '2022/01/01',
                'ticket_type': '學生票',
                'ticket_status': '未使用',
                'use_date': '2022/03/01 09:00:00'
            },
        ],
        pages: [
            { page: "<", link: "x" },
            { page: "1", link: "1" },
            { page: "2", link: "2" },
            { page: "3", link: "3" },
            { page: "4", link: "4" },
            { page: "5", link: "5" },
            { page: "...", link: "x" },
            { page: "20", link: "20" },
            { page: ">", link: "2" },
        ],
        nowpage: 1,
        current_edit: null,
    },
    created: function () {
        this.showMdata(1);
    },
    methods: {
        edit(index) {
            this.current_edit = index;
        },


        f_close() {
            this.current_edit = null;
            let edit_z = document.querySelector('.n-member_edit');
            edit_z.style.opacity = 0;
        },

        // sss() {

        //     this.dbcheck = false;
        //     let edit_z = document.querySelector('.n-member_edit');
        //     edit_z.style.opacity = 1;

        // },

        ccc() {
            this.current_edit = null;
            this.dbcheck = false;
            let edit_z = document.querySelector('.n-member_edit');
            edit_z.style.opacity = 1;
        },


        f_save() {

            let n_index = this.$data.current_edit;

            this.current_edit = null;

            // $.ajax({
            //     method: "POST",
            //     url: "../php/n-member_update.php",
            //     data: {
            //         account: this.members[n_index].account, // 哪筆會員
            //         member_status: this.members[n_index].member_status, // 更新的會員狀態
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
            localStorage.setItem("n-login", "no");
            location.href = "./n-login.html"
        },

        showMdata(gopage) {
            console.log(gopage);
            if (isNaN(gopage)) return;
            this.nowpage = gopage;

            // $.ajax({
            //     method: "POST",
            //     url: "../php/getMemberData.php",
            //     data: {
            //         page: gopage,
            //     },
            //     dataType: "json",
            //     success: function (response) {
            //         appVue.pages = response[0];
            //         appVue.members = response[1];
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
            //     url: "../php/n-selectm.php",
            //     data: {
            //         search: self.member_number
            //     },
            //     dataType: "json",
            //     success: function (res) {
            //         self.members = res
            //     },

            // });
        }

    },
}
);