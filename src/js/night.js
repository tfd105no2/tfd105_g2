
// Vue
new Vue({
    el: '#night-wrapper',
    data: {
        // modal area
        area: [],
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

        current_edit: false,
    },
    created: function () {
        this.showMdata(1);
    },
    mounted() {
        this.setToday()
    },
    methods: {
        edit(index) {
            // this.current_edit = index;
            this.current_edit = 'aa';
        },
        f_out() {
            this.current_edit = null;
            // edit_z.style.opacity = 0;
        },
        showMdata(gopage) {
            console.log(gopage);
            if (isNaN(gopage)) return;
            this.nowpage = gopage;
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

        },
        // 點擊要取當天 月日
        checkDate(e) {
            console.log(e.target);
            console.log(this.calendar.month + 1);
            console.log(e.target.getAttribute("data-date"));
            this.current_edit = !this.current_edit
        },

    },
    computed: {
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
    mounted() {
        axios.get("php/night.php")
            .then(res => {
                // console.log(res.data);
                this.area = res.data;
                console.log(this.area);
            })
            .catch(err => {
                console.log(err);
            })
    }

});

// JS

