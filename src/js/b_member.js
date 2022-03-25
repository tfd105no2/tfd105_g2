new Vue({
    el: '#root',
    data: {
        member_number: '',
        mainbtn: [
            { name: "會員管理", url: "b_member.html" },
            { name: "訂單管理", url: "b_order.html" },
            { name: "消息管理", url: "b_news.html" },
            { name: "房間管理", url: "b_area.html" },
            { name: "訂票管理", url: "b_ticket.html" },

        ],
        titles: ['會員編號', '帳號', '姓名', '手機'],
        members: [
            {
                'member_id': '001',
                'account': 'Harukadou@gmail.com',
                'name': '嶠小賀',
                'phone': '0910123456'
            },
            {
                'member_id': '002',
                'account': 'Harukadou@gmail.com',
                'name': '芽芽',
                'phone': '0910123456'
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
            let edit_z = document.querySelector('.b-member_edit');
            edit_z.style.opacity = 0;
        },
        log_out() {
            // localStorage.setItem("n-login", "no");
            location.href = "back_login.html"
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