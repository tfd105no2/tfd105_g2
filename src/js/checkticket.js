new Vue({
    el: "#checkTicket",
    data: {

    },
    methods: {

    },
    mounted() {
        $.ajax({
            type: 'POST',
            url: 'php/checkticket.php',
            dataType: 'json',
            data: {
                id: '',
            },
            success: function (data) {
                for (let i = 0; i < data.length; i++) {

                }
            },
        });
    },
    template: `
    <div class="ckContent">
        <table>
            <thead class="ckTable_head">
                <tr>
                    <th>票券編號</th>
                    <th>購買日期</th>
                    <th>票種</th>
                    <th>狀態</th>
                    <th>使用時間</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>123</td>
                    <td>123</td>
                    <td>123</td>
                    <td>123</td>
                    <td>123</td>
                </tr>
            </tbody>
        </table>
    </div>
    `,
});