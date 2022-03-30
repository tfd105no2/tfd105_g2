    new Vue({
        el: '#main',
    data: {
        tickets: [
    {
        type: '全票',
    price: 550,
    url: 'img/tic_01.jpg'
            },
    {
        type: '學生票',
    price: 400,
    url: 'img/tic_02.jpg'
            },
    {
        type: '孩童票',
    price: 250,
    url: 'img/tic_03.jpg'
            },
    {
        type: '博愛票',
    price: 250,
    url: 'img/tic_04.jpg'
            },
    ],
    },
    methods: {

    },
});


    // JS modal
    let ticketType = document.querySelector('.ticket-type')
    let btnAdd = document.querySelector('.button');
    let btnClose = document.querySelector('.button-close');
    let modalAdd = document.querySelector('.modal-add');

    // 打開modal
    ticketType.addEventListener('click', function (e) {
        modalAdd.style.display = "block";
});

    // 關閉modal
    btnClose.addEventListener('click', function (e) {
        // 避免冒泡事件 往上傳到父層 modalAdd
        e.stopPropagation();
    modalAdd.style.display = "none";
})

    // 點擊空白處 關閉modal
    modalAdd.addEventListener('click', function (e) {
        modalAdd.style.display = "none";
})
