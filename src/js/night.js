
const vm = new Vue({
    el: '#main',
    data: {
        modal: false,
        // 選單資料
        area: [],
        // 剩餘床位
        left_bed: [],
        // 今日
        today: {
            year: 0,
            month: 0,
            date: 0,
            day: 0
        },
        // 當前月曆顯示
        canlendar: {
            year: 0,
            month: 0,
            date: 0,
            day: 0
        },
        // 目前彈窗編輯資料
        current_edit: "",
        // 額滿日期陣列
        full_date: [],
    },
    mounted() {
        // 取今天日期
        this.setToday();

        // 取彈窗區域基本資料
        axios.get("php/night_info.php")
            .then(res => {
                this.area = res.data;
            })
            .catch(err => {
                console.log(err);
            })

        // 取額滿日期
        axios.post("php/b_area_test.php",
            {
                canlendar_month: this.canlendar.month + 1,
            })
            .then(res => {
                this.full_date = res.data;                

                // 回傳的陣列內是 string型別的數字
                // 要把陣列內的值，轉為number型別
                this.full_date = this.full_date.map(Number);
            })
            .catch(err => {
                console.log(err);
            })
    },
    methods: {
        setToday() {
            const date = new Date()
            this.today.year = this.canlendar.year = date.getFullYear();
            this.today.month = this.canlendar.month = date.getMonth(); // 0~11
            this.today.date = this.canlendar.date = date.getDate();
            this.today.day = this.canlendar.day = date.getDay();
        },
        adjustYear(fix) {
            this.canlendar.year += fix;

            // 該月額滿日期
            axios.post("php/b_area_test.php",
                {
                    canlendar_month: this.canlendar.month + 1,
                })
                .then(res => {
                    this.full_date = res.data;

                    // 回傳的陣列內是 string型別的數字
                    // 要把陣列內的值，轉為number型別
                    this.full_date = this.full_date.map(Number);
                })
                .catch(err => {
                    console.log(err);
                })
        },
        adjustMonth(fix) {
            // this.canlendar.month += fix 範圍
            let month = this.canlendar.month + fix;

            // 當月份加超過 12月時,年份 +1 ,月份為 1月 
            if (month > 11) {
                this.adjustYear(1);
                this.canlendar.month = 0;
            } else if (month < 0) {
                // 當月份減小於1月時, 年份 -1,月份為 12月
                this.adjustYear(-1);
                this.canlendar.month = 11;
            } else {
                this.canlendar.month = month;
            }

            // 該月額滿日期
            axios.post("php/b_area_test.php",
                {
                    canlendar_month: this.canlendar.month + 1,
                })
                .then(res => {
                    this.full_date = res.data;

                    // 回傳的陣列內是 string型別的數字
                    // 要把陣列內的值，轉為number型別
                    this.full_date = this.full_date.map(Number);
                })
                .catch(err => {
                    console.log(err);
                })
        },
        // 彈窗剩餘床位
        pop(yy, mm, dd, e) {

            if (mm < 10 && dd < 10) {
                mm = '0' + mm;
                dd = '0' + dd;
            } else if (mm < 10) {
                mm = '0' + mm;
            } else if (dd < 10) {
                dd = '0' + dd;
            }

            let date = `${yy}-${mm}-${dd}`;

            // 取剩餘床位
            $.ajax({
                url: 'php/b_areaRest.php',
                type: 'POST',
                data: {
                    date: date,
                },
                dataType: 'json',
                success(res) {
                    vm.left_bed = res;

                    // 複寫成剩餘床位
                    vm.area.forEach((item, i) => {
                        item.bed_count = vm.left_bed[i];
                    })
                }
            })


            // axios.post("php/pre_b_areaRest.php", {
            //     date: "2022-03-01",
            // })
            //     .then(res => {
            //         alert('成功');
            //         console.log(res.data);
            //     })
            //     .catch(err => {

            //         console.log(err);
            //     });




            // 在含有子元素的element上監聽click事件時,容易點到子元素,導致 e.target拿到的內容每次都不一樣
            // 這時候要改用 e.currentTarget

            // e.target 是當前點擊的元素
            // e. currentTarget 是你綁定事件的元素 
            let i = e.currentTarget.getAttribute('data-index');
            let m = e.currentTarget.classList.contains('other') || e.currentTarget.classList.contains('full');
            // console.log(e.target);
            if (!m) {
                this.modal = !this.modal;

                this.current_edit = {
                    year: this.canlendarMonth[i].year,
                    month: this.canlendarMonth[i].month,
                    date: this.canlendarMonth[i].date,
                    day: this.canlendarMonth[i].day,
                }
            }

        },

    },
    computed: {

        // 要取 月曆上的第一天(也就是最左上角那天)
        canlendarFirstDay() {

            // mDate 該月份第一天
            let mDate = new Date(this.canlendar.year, this.canlendar.month, 1);
            const date = new Date(this.canlendar.year, this.canlendar.month, 1 - mDate.getDay());
            return {
                year: date.getFullYear(), // this.canlendar.year
                month: date.getMonth(), // this.canlendar.month
                date: date.getDate(), // 1
                day: date.getDay(), // 取星期幾

            }
        },
        // 取出42天日期的陣列
        canlendarMonth() {
            const datas = [];

            let date;
            for (let i = 0; i < 42; i++) {
                // data 月曆左上角的第一天日期 每次累加 塞到陣列裡
                date = new Date(this.canlendarFirstDay.year, this.canlendarFirstDay.month, this.canlendarFirstDay.date + i);

                datas.push({
                    year: date.getFullYear(),
                    month: date.getMonth(),
                    date: date.getDate(),
                    day: date.getDay(),
                });
            }

            return datas;


        }

    },

});




