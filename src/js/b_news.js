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

Vue.component('news-add', {
    data() {
        return {  //組件的變數寫在這裡
            n_sort: 0,
            on_off: 0,
            n_main_title: '',
            n_main_content: '',
        };
    },

    template: `
       <div>
            <div class="b_news_edit">
                <p>新增消息</p>
                <div class="b_news_news_mid">
                    <ul>
                        <li>
                            <section>
                                文章分類:
                                <select name="status" id="" v-model="n_sort">
                                <option value="0">公告</option>
                                <option value="1">活動</option>
                                </select>
                            </section>

                            <section>
                                上下架:
                                <select name="status" id="" v-model="on_off">
                                <option value="0">下架</option>
                                <option value="1">上架</option>
                                </select>
                            </section>
                        </li>

                        <li>
                            <label for="">標題:</label>
                            <input type="text" v-model="n_main_title" />
                        </li>

                        <li>
                            <label for="">內文:</label>
                            <textarea name="" id="" v-model="n_main_content"></textarea>
                        </li>
                    </ul>
                </div>

                <ul class="b_news_img">
                    <li>
                        <label for="">圖片:</label>
                        <input type="file" />
                    </li>
                    <li class="b_img">
                        <img src="../img/b_n_img.png" alt="" />
                    </li>
                </ul>
                <div class="b_news_editbtn">
                    <button class="b_news_close" @click="n_close">關閉</button>
                    <button class="b_news_save" @click="n_save">儲存</button>
                </div>
            </div>    
           <div id="hide"></div> 
       </div>

    `,
    methods: {
        n_close() {
            this.$emit('nclose');
        },
        n_save() {
            this.$emit('nsave');
        },

    }
});


var appVue = new Vue({
    el: '#root',
    data: {
        dbcheck: false,
        new_edit: false,

        news_number: '',
        on_off_list: ['下架', '上架'],
        n_sort_list: ['公告', '活動'],
        n_main_title: '',
        n_sort: 0,
        on_off: 0,
        n_main_content: '',



        mainbtn: [
            { name: "會員管理", url: "b_member.html" },
            { name: "訂單管理", url: "b_order.html" },
            { name: "消息管理", url: "b_news.html" },
            { name: "房間管理", url: "b_area.html" },
            { name: "訂票管理", url: "b_ticket.html" },
        ],
        titles: ['文章編號', '上架日期', '文章分類', '標題', '狀態', '最後更新日期', ''],
        newss: [
            {
                'news_id': '12345',
                'create_date': '2021/01/01 00:00',
                'news_class': 0,
                'news_title': '3/27園區整修,停業一天',
                'news_status': 0,
                'news_update': '2021/03/01 16:16',
                'news_content': '這就是內文',
                'news_image': '',

            },
            {
                'news_id': '12345',
                'create_date': '2021/01/01 00:00',
                'news_class': 1,
                'news_title': '2/14情人玩親親享有小禮物',
                'news_status': 0,
                'news_update': '2021/03/01 16:16',
                'news_content': '親親親親親親',
                'news_image': '',

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
        nowpage: 1,
        current_edit: null,
    },
    created: function () {
        this.showNdata(1);
    },

    methods: {
        edit(index) {

            this.current_edit = index;

            this.n_sort = this.newss[index].news_class;
            this.on_off = this.newss[index].news_status;
            this.n_main_title = this.newss[index].news_title;
            this.n_main_content = this.newss[index].news_content;

            this.new_img[0] = this.newss[index].news_image;

        },



        sss() {
            this.current_edit = null;
            this.dbcheck = false;
            this.new_edit = false;
        },

        ccc() {
            this.dbcheck = false;
        },

        n_save() {
            this.current_edit = null;
        },
        n_close() {
            this.dbcheck = true;
        },

        new_add() {
            this.new_edit = true;
            this.current_edit = "notnull";
        },
        closennn() {
            this.new_edit = false;
            this.dbcheck = true;
        },
        savennn() {
            this.current_edit = null;
            this.new_edit = false;

        },
        log_out() {
            localStorage.setItem("n-login", "no");
            location.href = "back_login.html"
        },

        showNdata(gopage) {
            // console.log(gopage);
            if (isNaN(gopage)) return;
            this.nowpage = gopage;

            // $.ajax({
            //     method: "POST",
            //     url: "../php/getNewsData.php",
            //     data: {
            //         page: gopage,
            //     },
            //     dataType: "json",
            //     success: function (response) {
            //         appVue.pages = response[0];
            //         appVue.newss = response[1];
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
            //     url: "../php/n-selectn.php",
            //     data: {
            //         search: self.news_number
            //     },
            //     dataType: "json",
            //     success: function (res) {
            //         self.newss = res
            //     },

            // });
        }
    },

})