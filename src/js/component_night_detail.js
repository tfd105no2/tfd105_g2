
// 元件
Vue.component('counter-component', {
    props: ["person"],
    template: "#counterTemplate",
})



// 
new Vue({
    el: '#main',
    data: {
        modal: false,
        checkArea: [{
            area: '海底隧道',
            num: 12,
            url: 'img/intro-pic-01.png',
        }],
        bedType: [
            {
                type: '成人票',
                price: 3180,
                num: 2,
            },
            {
                type: '兒童票',
                price: 1890,
                num: 2,
            },
            {
                type: '幼童票',
                price: 0,
                num: 2,
            },
            {
                type: '博愛票',
                price: 1890,
                num: 2,
            },
        ],
    },
    methods: {
        pop() {
            this.modal = !this.modal;
        },
        minus(item) {
            if(item.num > 1){
                item.num--;
            }
        },
        plus(item){
            item.num++;
        }
    },
});

