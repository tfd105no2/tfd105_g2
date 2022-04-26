const vm = new Vue({
    el: '#root',
    data: {
        dbcheck_off: false,
        dbcheck_on: false,
        b_area_current: 'b_area_current',
        flag: 0,
        b_area_origin: 'b_area_origin',
        mainbtn: [
            { name: "會員管理", url: "b_member.html" },
            { name: "訂單管理", url: "b_order.html" },
            { name: "消息管理", url: "b_news.html" },
            { name: "房間管理", url: "b_area.html" },
            { name: "訂票管理", url: "b_ticket.html" },

        ],
        area: [
            {
                id: 91,
                type: '海底隧道',
                num: 0,
                url: 'img/intro-pic-01.png',
            },
            {
                id: 92,
                type: '大洋池親近區',
                num: 10,
                url: 'img/intro-pic-01.png',
            },
            {
                id: 93,
                type: '小白鯨區',
                num: 8,
                url: 'img/intro-pic-01.png',
            },
            {
                id: 94,
                type: '海藻森林',
                num: 3,
                url: 'img/intro-pic-01.png',
            },
            {
                id: 95,
                type: '極地區',
                num: 8,
                url: 'img/intro-pic-01.png',
            },
            {
                id: 96,
                type: '鯊魚區',
                num: 5,
                url: 'img/intro-pic-01.png',
            },

        ],

        areaList: [],

        today: {
            year: 0,
            month: 0,
            date: 0,
            day: 0
        },
        calendar: {
            year: 0,
            month: 0,
            date: 0,
            day: 0
        },

        current_edit: null,
        current_area: '海底隧道',
        current_areaName: '',
        fullDays: [],
        check: null,
        btn: null
    },
    mounted() {
        this.setToday(),
            // nowMonth = (this.today.month) + 1,
            // console.log(nowMonth),
            $.ajax({
                type: 'POST',
                url: 'php/b_area_test.php',
                data: {
                    nowMonth: (this.today.month) + 1
                },
                dataType: 'json',
                success: function (data) {
                    // console.log(data);
                    vm.fullDays = data;
                    console.log(vm.fullDays);
                }
            })
    },
    methods: {
        edit(year, month, date) {
            if (month > 0 && month < 10) {
                month = '0' + month;
            };
            if (date > 0 && date < 10) {
                date = '0' + date;
            };

            this.current_edit = year + '-' + month + '-' + date;
            let choose_date = this.current_edit;
            console.log(this.current_edit);
            $.ajax({
                type: 'POST',
                url: 'php/b_areaRest.php',
                data: {
                    date: choose_date
                },
                dataType: 'json',
                success: function (data) {
                    console.log(data);
                    vm.area[0].num = data[0];
                    vm.area[1].num = data[1];
                    vm.area[2].num = data[2];
                    vm.area[3].num = data[3];
                    vm.area[4].num = data[4];
                    vm.area[5].num = data[5];
                }
            })
        },
        isFull(date) {
            // console.log(date);
            console.log(this.fullDays);
        },
        handlerBorder(i) {
            // console.log(i)
            this.flag = i;
            this.current_area = this.area[i].id;
            this.current_areaName = this.area[i].type;
            // console.log(this.current_area);
            $.ajax({
                type: 'POST',
                url: 'php/b_area_detail.php',
                data: {
                    date: this.current_edit,
                    area: this.current_area
                },
                dataType: 'json',
                success: function (data) {
                    vm.areaList = data;
                    // console.log(vm.areaList);
                }
            })
        },
        showDetail() {
            vm.check = true;
        },
        checkin: function (e) {
            let orderdetail_id = e.target.dataset.id;
            $(e.target).attr('id', 'dis');
            let status = $(e.target).closest('ul').children('li.status');
            // console.log($(e.target).closest('ul').children('li.status').text("已報到"));
            // console.log(btn);
            // console.log(e.target.dataset.id);
            $.ajax({
                type: 'POST',
                url: 'php/b_area_checkin.php',
                data: {
                    orderdetail_id: orderdetail_id,
                },
                success: function () {
                    $('#dis').attr('disabled', 'true');
                    $(e.target).closest('ul').children('li.status').text("已報到");
                }
            });
        },
        close_window() {
            vm.check = null;
        },
        f_close() {
            this.dbcheck_off = true;
        },
        f_open() {
            this.dbcheck_on = true;
        },
        f_out() {
            this.current_edit = null;
        },

        // 關閉區域
        sss() {
            $.ajax({
                type: 'POST',
                url: 'php/b_area_close.php',
                data: {
                    date: this.current_edit,
                    area: this.current_area
                },
                success: function (data) {
                    alert(data);
                }
            });
            this.current_edit = null;
            this.dbcheck_off = false;
            window.location.reload();
        },

        ccc() {
            // this.current_edit = null;
            this.dbcheck_off = false;
        },
        // 開啟區域
        osss() {
            $.ajax({
                type: 'POST',
                url: 'php/b_area_open.php',
                data: {
                    date: this.current_edit,
                    area: this.current_area
                },
                success: function (data) {
                    alert(data);
                }
            });
            this.current_edit = null;
            this.dbcheck_off = false;
            window.location.reload();

        },

        occc() {
            // this.current_edit = null;
            this.dbcheck_on = false;
        },
        log_out() {
            location.href = "back_login.html"
        },

        setToday() {
            const date = new Date()
            this.today.year = this.calendar.year = date.getFullYear()
            this.today.month = this.calendar.month = date.getMonth() // 0~11
            this.today.date = this.calendar.date = date.getDate()
            this.today.day = this.calendar.day = date.getDay()
        },
        adjustYear(fix) {
            this.calendar.year += fix
        },
        adjustMonth(fix) {
            // this.calendar.month += fix 範圍
            let month = this.calendar.month + fix
            if (month > 11) {
                this.adjustYear(1)
                this.calendar.month = 0
            } else if (month < 0) {
                this.adjustYear(-1)
                this.calendar.month = 11
            } else {
                this.calendar.month = month
            }

        }

    },
    computed: {
        // monthFirstDay(){
        //   const date = new Date(this.calendar.year,this.calendar.month,1)
        //   return {
        //     year:date.getFullYear(),// this.calendar.year
        //     month:date.getMonth(),// this.calendar.month
        //     date:date.getDate(),// 1
        //     day:date.getDay(),
        //   }
        // },
        calendarFirstDay() {
            const mDate = new Date(this.calendar.year, this.calendar.month, 1)
            const date = new Date(this.calendar.year, this.calendar.month, 1 - mDate.getDay())
            return {
                year: date.getFullYear(),
                month: date.getMonth(),
                date: date.getDate(),
                day: date.getDay(),
            }
        },
        calendarMonth() {
            const data = []
            let date
            for (let i = 0; i < 42; i++) {
                date = new Date(this.calendarFirstDay.year, this.calendarFirstDay.month, this.calendarFirstDay.date + i)
                data.push({
                    year: date.getFullYear(),
                    month: date.getMonth(),
                    date: date.getDate(),
                    day: date.getDay()
                })
            }
            return data
        }

    },
    components: {
        'double-check-off': {
            props: ['b_date', 'b_area'],
            template: ` 
            <div class="dbc" id='root'>
                <section></section>
                <p>日期:{{b_date}}</p>
                <p>區域:{{b_area}}</p>
                <p>確定要關閉該區嗎?</p>
    
                <div>
                    <button type="button" @click='cancel'>取消</button>
                    <button type="button" @click='sure'>確認</button>
                </div>
            </div>                
            `,
            methods: {
                sure() {
                    this.$emit('save')

                },
                cancel() {
                    this.$emit('cancel')
                }
            },
        },
        'double-check-on': {
            props: ['b_date', 'b_area'],
            template: ` 
            <div class="dbc" id='root'>
                <section></section>
                <p>日期:{{b_date}}</p>
                <p>區域:{{b_area}}</p>
                <p>確定要開啟該區嗎?</p>
    
                <div>
                    <button type="button" @click='cancel'>取消</button>
                    <button type="button" @click='sure'>確認</button>
                </div>
            </div>                
            `,
            methods: {
                sure() {
                    this.$emit('save')

                },
                cancel() {
                    this.$emit('cancel')
                }
            },
        }
    }
}
);

