// var my_back = localStorage.getItem("n-login");
// if (my_back !== 'yes') {
//     location.href = "./n-login.html"
// }

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

            // function getFileName(o) {
            //     var pos = o.lastIndexOf("\\");
            //     return o.substring(pos + 1);
            // }
            // let form_data = new FormData();
            // for (let i = 0; i < $('.n-news_Pic').length; i++) {
            //     form_data.append("files[]", document.getElementsByClassName('n-news_Pic')[i].files[0]);
            // }

            // let pic1 = $('.n-news_Pic').eq(0).val();
            // let pic2 = $('.n-news_Pic').eq(1).val();
            // let pic3 = $('.n-news_Pic').eq(2).val();
            // let pic4 = $('.n-news_Pic').eq(3).val();
            // let pic5 = $('.n-news_Pic').eq(4).val();
            // pic1 = getFileName(pic1);
            // pic2 = getFileName(pic2);
            // pic3 = getFileName(pic3);
            // pic4 = getFileName(pic4);
            // pic5 = getFileName(pic5);

            // if (this.n_main_title != '' && this.n_sec_title != '' && pic1 != '' && pic2 != '' && pic3 != '' && pic4 != '' && pic5 != '') {
            //     // append
            //     form_data.append('news_class', this.n_sort);
            //     form_data.append('news_status', this.on_off);
            //     form_data.append('news_title1', this.n_main_title);
            //     form_data.append('news_title2', this.n_sec_title);
            //     form_data.append('news_content1', this.n_main_content);
            //     form_data.append('news_content2', this.n_sec_content);
            //     form_data.append('news_image_right', pic1);
            //     form_data.append('news_image_main', pic2);
            //     form_data.append('news_image1', pic3);
            //     form_data.append('news_image2', pic4);
            //     form_data.append('news_image3', pic5);

            // $.ajax({
            //     url: '../php/n-newsAdd.php',
            //     type: 'post',
            //     cache: false,
            //     data: form_data,
            //     processData: false,
            //     contentType: false,
            //     success: function (res) {
            //         alert(res);
            //         window.location.reload();
            //         Vue.$emit('nsave', this.n_sort, this.on_off, this.n_main_title, this.n_sec_title, this.n_main_content, this.n_sec_content);

            //     },
            //     error: function (exception) {
            //         alert("數據載入失敗: " + exception.status);
            //     }
            // })

            // } else {
            //     alert('請完成所有欄位');
            // }
        },

        // upload_img(e) {

        //     var files = e.target.files || e.dataTransfer.files;
        //     let file = files[0];

        //     e.target.nextElementSibling.innerText = file.name;

        //     let readFile = new FileReader();
        //     readFile.readAsDataURL(file);
        //     readFile.addEventListener("load", function () {

        //         e.target.nextElementSibling.nextElementSibling.querySelector('img').src = readFile.result;

        //         e.target.nextElementSibling.nextElementSibling.querySelector('p').style.opacity = 0;

        //     });
        // },
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
        n_sec_title: '',
        n_sort: 0,
        on_off: 0,
        n_main_content: '',
        n_sec_content: '',


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
            // {
            //     'news_id': '',
            //     'create_date': '',
            //     'news_class': '',
            //     'news_title1': '',
            //     'news_title2': '',
            //     'news_status': '',
            //     'news_update': '',
            //     'news_content1': '',
            //     'news_content2': '',
            //     'news_image_right': '',
            //     'news_image_main': '',
            //     'news_image1': '',
            //     'news_image2': '',
            //     'news_image3': ''
            // }
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

            this.new_img[0] = this.newss[index].news_image_right;
            this.new_img[1] = this.newss[index].news_image_main;
            this.new_img[2] = this.newss[index].news_image1;
            this.new_img[3] = this.newss[index].news_image2;
            this.new_img[4] = this.newss[index].news_image3;

            this.img_names[0]['src'] = '../images/news/' + this.newss[index].news_image_right;
            this.img_names[1]['src'] = '../images/news/' + this.newss[index].news_image_main;
            this.img_names[2]['src'] = '../images/news/' + this.newss[index].news_image1;
            this.img_names[3]['src'] = '../images/news/' + this.newss[index].news_image2;
            this.img_names[4]['src'] = '../images/news/' + this.newss[index].news_image3;

        },

        n_close() {
            this.dbcheck = true;
            let edit_z = document.querySelector('.b_news_edit');
            edit_z.style.opacity = 0;

            // 把預設值設回來
            // this.new_img_src = ['圖片', '圖片', '圖片', '圖片', '圖片'];

            // this.new_img[0] = '請選擇圖片上傳';
            // this.new_img[1] = '請選擇圖片上傳';
            // this.new_img[2] = '請選擇圖片上傳';
            // this.new_img[3] = '請選擇圖片上傳';
            // this.new_img[4] = '請選擇圖片上傳';
        },

        sss() {
            this.current_edit = null;
            this.dbcheck = false;
            let edit_z = document.querySelector('.b_news_edit');
            edit_z.style.opacity = 1;

            this.new_edit = false;
        },

        ccc() {
            this.dbcheck = false;
            let edit_z = document.querySelector('.b_news_edit');
            edit_z.style.opacity = 1;
        },

        n_save() {

            // let n_index = this.$data.current_edit;

            // this.newss[n_index].news_status = this.on_off;
            // this.newss[n_index].news_class = this.n_sort;
            // this.newss[n_index].news_title1 = this.n_main_title;
            // this.newss[n_index].news_title2 = this.n_sec_title;
            // this.newss[n_index].news_content1 = this.n_main_content;
            // this.newss[n_index].news_content2 = this.n_sec_content;

            // this.newss[n_index].news_image_right = this.new_img[0];
            // this.newss[n_index].news_image_main = this.new_img[1];
            // this.newss[n_index].news_image1 = this.new_img[2];
            // this.newss[n_index].news_image2 = this.new_img[3];
            // this.newss[n_index].news_image3 = this.new_img[4];


            // let aa = new Date();
            // let year = aa.getFullYear();

            // let month = aa.getMonth() + 1;
            // if (month < 10) {
            //     month = '0' + month
            // }

            // let date = aa.getDate();
            // if (date < 10) {
            //     date = '0' + date
            // }

            // let today = year + '-' + month + '-' + date;
            // this.newss[n_index].news_update = today;


            this.current_edit = null;

            // $.ajax({
            //     method: "POST",
            //     url: "../php/n-news_update.php",
            //     data: {
            //         news_id: this.newss[n_index].news_id, //id
            //         news_class: this.newss[n_index].news_class, //分類
            //         news_status: this.newss[n_index].news_status, // 上下架
            //         news_title1: this.newss[n_index].news_title1, // 主標題
            //         news_title2: this.newss[n_index].news_title2, //副標題
            //         news_content1: this.newss[n_index].news_content1, // 內文1
            //         news_content2: this.newss[n_index].news_content2, // 內文2
            //         news_image_right: this.newss[n_index].news_image_right, // 個別圖片檔名
            //         news_image_main: this.newss[n_index].news_image_main,
            //         news_image1: this.newss[n_index].news_image1,
            //         news_image2: this.newss[n_index].news_image2,
            //         news_image3: this.newss[n_index].news_image3,
            //         news_update: this.newss[n_index].news_update, // 更新日期

            //         new_img: this.new_img, // 所有圖片檔名
            //         new_img_src: this.new_img_src, // 圖片base64

            //     },
            //     dataType: "text",
            //     success: function (response) {
            //         alert("更新成功");
            //     },
            //     error: function (exception) {
            //         alert("發生錯誤: " + exception.status);
            //     }
            // });

            // 把預設值設回來
            // this.new_img_src = ['圖片', '圖片', '圖片', '圖片', '圖片'];

            // this.new_img[0] = '請選擇圖片上傳';
            // this.new_img[1] = '請選擇圖片上傳';
            // this.new_img[2] = '請選擇圖片上傳';
            // this.new_img[3] = '請選擇圖片上傳';
            // this.new_img[4] = '請選擇圖片上傳';

        },

        upload_img(e) {

            var files = e.target.files || e.dataTransfer.files;
            let file = files[0];

            this.new_img[e.target.id] = file.name; // 看是第幾個檔案，存進vueData
            e.target.nextElementSibling.innerText = file.name;


            let readFile = new FileReader();
            readFile.readAsDataURL(file);
            readFile.addEventListener("load", function () {

                e.target.closest('.n-news_group').querySelector('img').src = readFile.result;
                appVue.$data.new_img_src[e.target.id] = readFile.result; // 更換的圖檔base64存進vueData

                e.target.closest('.n-news_group').querySelector('img').nextElementSibling.style.opacity = 0;

            });
        },

        new_add() {
            this.new_edit = true;
            this.current_edit = "notnull";
        },
        closennn() {
            this.new_edit = false;

            this.dbcheck = true;
            let edit_z = document.querySelector('.n-news_edit');
            edit_z.style.opacity = 0;
        },
        savennn(n_sort, on_off, n_main_title, n_main_content) {
            this.current_edit = null;
            // this.new_edit = false;

            // console.log(f_sort);

            // let today = new Date()
            // let y_today = today.getFullYear()
            // let m_today = today.getMonth() + 1
            // if (m_today < 10) {
            //     m_today = '0' + m_today
            // }
            // let d_today = today.getDate()
            // if (d_today < 10) {
            //     d_today = '0' + d_today
            // }
            // let h_today = today.getHours()
            // if (h_today < 10) {
            //     h_today = '0' + h_today
            // }
            // let min_today = today.getMinutes()
            // if (min_today < 10) {
            //     min_today = '0' + min_today
            // }
            // let u_today = y_today + '/' + m_today + '/' + d_today
            // let last_today = `${y_today}/${m_today}/${d_today} ${h_today}:${min_today}`


            // let nnn =
            // {
            //     'news_id': '1234567890',
            //     'create_date': u_today,
            //     'news_class': parseInt(n_sort),
            //     'news_title1': n_main_title,
            //     'news_title2': n_sec_title,
            //     'news_status': parseInt(on_off),
            //     'news_update': last_today,
            //     'news_content1': n_main_content,
            //     'news_content2': n_sec_content,
            // }

            // console.log(nnn);

            // this.newss.unshift(nnn);
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
    // computed: {
    //     newssd: function() {
    //         var search = this.news_number;   
    //         if (search) {
    //             return this.newss.filter(function(product) {                   
    //                 return String (product.news_id).toLowerCase().indexOf(search) > -1                 
    //             })                
    //         }
    //         return this.newss;
    //     }
    // }  

})