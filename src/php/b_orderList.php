<?php

// 連接資料庫
include('connection.php');
$orderId = $_POST['order_id'];
// sql
$sql = "SELECT b.ticket_role_name, a.Purchase_amount, b.price, d.overnight_date, e.names FROM order_detail a
        left join ticket_role b on a.ticket_role_id = b.id
        left join ticket_style c on a.ticket_style_id = c.id
        left join ticket_detail d on a.order_detail_id = d.order_detail_id
        left join area e on d.area_id = e.area_id
        where a.order_id = '$orderId'";
// $sql = " SELECT * FROM order_detail";
// 執行sql語句
$statement = $pdo->query($sql);
// 將查詢到的資料抓出放到$data
$data = $statement->fetchAll();
echo json_encode($data);
