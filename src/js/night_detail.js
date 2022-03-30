
// 元件
Vue.component('counter-component', {
    data() {
        return {
            countz: 0
        }
    },
    methods: {
        minus() {
            if (this.countz > 0) {
                this.countz -= 1;
            }
        },
        add() {
            this.countz += 1;
        }
    },
    props: ["person"],
    template: "#counterTemplate",
})

// 
new Vue({
    el: '#content-bottom',
    data: {
        // count: 3,
        bedType: [
            {
                type: '成人票',
                price: 3180,
            },
            {
                type: '兒童票',
                price: 1890,
            },
            {
                type: '幼童票',
                price: 0,
            },
            {
                type: '博愛票',
                price: 1890,
            },
        ],
    },
    methods: {
    },
});

// JS
let typeList = document.querySelector('.type-list');
let btnClose = document.querySelector('.button-close');
let modalAdd = document.querySelector('.modal-add');
let btnAdd = document.querySelector('.button');

// 打開modal
typeList.addEventListener('click', function (e) {
    if (e.target == btnAdd) {
        modalAdd.style.display = "block";
    }
});

// 關閉modal
btnClose.addEventListener('click', function (e) {
    // 避免冒泡事件 往上傳到父層 modalAdd
    e.stopPropagation();
    modalAdd.style.display = "none";
})

// 點擊空白處 關閉modal
modalAdd.addEventListener('click', function (e) {
    if (e.target == modalAdd) {
        modalAdd.style.display = "none";
    }

})


