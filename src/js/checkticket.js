// 抓取資料
$.ajax({
    type: 'POST',
    url: 'php/checkticket.php',
    dataType: 'json',
    success: function (data) {
        for (let i = 0; i < data.length; i++) {
            if (data[i].ticket_status == '已使用') {
                $('#ckBody').append(`
                <tr>
                    <td class="useNum">${data[i].ticket_number_id}</td>
                    <td>${data[i].ticket_role_name}</td>
                    <td class="useStatus">${data[i].ticket_status}</td>
                    <td class="useDate" data-num="${i}">${data[i].use_time}</td>
                    <td><button class="useBtn" data-btn="${i}" disabled>使用</button></td>
                </tr>
            `);
            } else {
                $('#ckBody').append(`
                <tr>
                    <td class="useNum">${data[i].ticket_number_id}</td>
                    <td>${data[i].ticket_role_name}</td>
                    <td class="useStatus">${data[i].ticket_status}</td>
                    <td class="useDate" data-num="${i}"></td>
                    <td><button class="useBtn" data-btn="${i}">使用</button></td>
                </tr>
            `);
            }
        }
    },
});

// 點擊按鈕
$(document).on('click', function (e) {
    if ($(e.target).hasClass('useBtn')) {
        let useTime = new Date();
        let useYear = useTime.getFullYear();
        let useMont = useTime.getMonth();
        useMont += 1;
        let useDate = useTime.getDate();
        if (useMont < 10) {
            useMont = '0' + useMont;
        }
        if (useDate < 10) {
            useDate = '0' + useDate;
        }
        // 得到今天日期
        let resDay = useYear + '-' + useMont + '-' + useDate;
        // 將日期放進table
        $(this).find('td.useDate').eq($(e.target).data('btn')).text(resDay);
        // 改變使用狀態
        $(this).find('td.useStatus').eq($(e.target).data('btn')).text('已使用');
        // 改變按鈕狀態
        if ($(this).find('td.useStatus').eq($(e.target).data('btn')).text() == '已使用') {
            $(e.target).attr('disabled', 'disabled');
        }
        let ticketNum = $(this).find('td.useNum').eq($(e.target).data('btn')).text();
        let ticketSta = $(this).find('td.useStatus').eq($(e.target).data('btn')).text();
        let ticketDay = $(this).find('td.useDate').eq($(e.target).data('btn')).text();
        $.ajax({
            type: 'POST',
            url: 'php/checkticket_update.php',
            dataType: 'json',
            data: {
                ticketNum: ticketNum,
                ticketSta: ticketSta,
                ticketDay: ticketDay,
            },
            success: function (data) {
                console.log(data);
                alert('成功');
            },
        });
    }
})