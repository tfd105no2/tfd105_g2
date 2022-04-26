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
            b_preview: null,
            b_image: null
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
                    <input id="imgName" type="file" @change="b_uploadImg" />
                    </li>
                    <li class="b_img">
                    <template v-if="b_preview">
                        <img :src="b_preview" />
                    </template>
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
            if (this.n_main_title != '' && this.n_main_content != '') {
                let style = this.n_sort;
                let status = this.on_off;
                let title = this.n_main_title;
                let content = this.n_main_content;
                let imgName = this.b_image.name;
                // console.log(imgName);
                $.ajax({
                    method: "POST",
                    url: "php/b_news_insert.php",
                    data: {
                        news_style: style, //分類
                        news_status: status, // 上下架
                        news_title: title, // 主標題
                        news_content: content, // 內文
                        news_image: imgName
                        //         new_img: this.new_img, // 所有圖片檔名
                        //         new_img_src: this.new_img_src, // 圖片base64

                    },
                    success: function (response) {
                        alert("新增成功");
                        window.location.reload();
                    },
                    error: function (exception) {
                        alert("發生錯誤: " + exception.status);
                    }
                })
            } else {
                alert('請完成所有欄位');
            }
        },
        b_uploadImg(event) {
            let input = event.target;
            if (input.files) {
                let b_reader = new FileReader();
                b_reader.onload = (e) => {
                    console.log(this);
                    this.b_preview = e.target.result;
                }
                this.b_image = input.files[0];
                b_reader.readAsDataURL(input.files[0]);
            }
        },

    }
});


var vm = new Vue({
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
        titles: ['文章編號', '上架日期', '文章分類', '標題', '狀態', '最後更新時間', ''],
        newss: [
            // {
            //     'news_id': '12345',
            //     'create_date': '2021/01/01 00:00',
            //     'news_class': 0,
            //     'news_title': '3/27園區整修,停業一天',
            //     'news_status': 0,
            //     'news_update': '2021/03/01 16:16',
            //     'news_content': '這就是內文',
            //     'news_image': '',

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
        nowpage: 1,
        current_edit: null,
        b_preview: null,
        b_image: null,
        newsTypeValue: null
    },
    mounted() {
        $.ajax({
            type: 'POST',
            url: 'php/b_news.php',
            dataType: 'json',
            success: function (data) {
                vm.pages = data[0];
                vm.newss = data[1];
            }
        });
    },

    methods: {
        edit(index) {

            this.current_edit = index;

            this.n_sort = this.newss[index].news_style;
            this.on_off = this.newss[index].News_status;
            this.n_main_title = this.newss[index].News_title;
            this.n_main_content = this.newss[index].News_document;

            this.news_image = this.newss[index].News_image;

        },
        b_previewImg(e) {
            // const file = $('#b_preview').files[0];
            let input = e.target;
            let file = input.files[0];
            let img = document.querySelector('#iimage');
            console.log(file.name);
            if (file) {
                img.src = URL.createObjectURL(file);
            }
            this.b_image = file.name;
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
            let n_index = this.$data.current_edit;
            // console.log(n_index);
            this.newss[n_index].News_status = this.on_off; //上下架
            this.newss[n_index].news_style = this.n_sort;  //分類
            this.newss[n_index].News_title = this.n_main_title; //標題
            this.newss[n_index].News_document = this.n_main_content; //內文
            this.newss[n_index].News_image = this.b_image; //圖片
            // console.log(this.newss[index].News_image);
            let aa = new Date();
            let year = aa.getFullYear();

            let month = aa.getMonth() + 1;
            if (month < 10) {
                month = '0' + month
            }

            let date = aa.getDate();
            if (date < 10) {
                date = '0' + date
            }

            let today = year + '-' + month + '-' + date;
            this.newss[n_index].News_update = today;


            this.current_edit = null;

            $.ajax({
                method: "POST",
                url: "php/b_news_update.php",
                data: {
                    news_id: this.newss[n_index].id, //id
                    news_style: this.newss[n_index].news_style, //分類
                    news_status: this.newss[n_index].News_status, // 上下架
                    news_title: this.newss[n_index].News_title, // 主標題
                    news_content: this.newss[n_index].News_document, // 內文
                    news_image: this.newss[n_index].News_image,      //圖片
                    news_update: this.newss[n_index].News_update, // 更新日期

                },
                success: function (response) {
                    alert("更新成功");
                    window.location.reload();
                },
                error: function (exception) {
                    alert("發生錯誤: " + exception.status);
                }
            })
        },
        n_close() {
            this.dbcheck = true;
        },

        new_add() {
            this.new_edit = true;
        },
        closennn() {
            // this.new_edit = false;
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
            console.log(gopage);
            if (isNaN(gopage)) return;
            this.nowpage = gopage;

            if (vm.newsTypeValue != null) {
                $.ajax({
                    method: "POST",
                    url: "php/b_newsType.php",
                    data: {
                        newsTypeValue: vm.newsTypeValue,
                        page: gopage,
                    },
                    dataType: "json",
                    success: function (response) {
                        vm.pages = response[0];
                        // console.log(vm.pages);
                        vm.newss = response[1];
                        // console.log(response);
                    },
                    error: function (exception) {
                        alert("發生錯誤: " + exception.status);
                    },
                });
            } else {
                $.ajax({
                    method: "POST",
                    url: "php/b_news.php",
                    data: {
                        page: gopage,
                    },
                    dataType: "json",
                    success: function (response) {
                        vm.pages = response[0];
                        // console.log(vm.pages);
                        vm.newss = response[1];
                        // console.log(response);
                    },
                    error: function (exception) {
                        alert("發生錯誤: " + exception.status);
                    },
                });
            }



        },
        newsType(event) {
            // console.log(event.target.value);
            // console.log('aa' + vm.newsTypeValue);

            vm.newsTypeValue = (+event.target.value) - 1;
            // console.log(newsTypeValue);
            $.ajax({
                method: "POST",
                url: "php/b_newsType.php",
                data: {
                    newsTypeValue: vm.newsTypeValue,
                },
                dataType: "json",
                success: function (response) {
                    vm.pages = response[0];
                    // console.log(vm.pages);
                    vm.newss = response[1];
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
                url: "php/b_news_search.php",
                data: {
                    news_number: vm.news_number
                },
                dataType: "json",
                success: function (res) {
                    vm.newss = res
                },

            });
        }
    },

})