<?php

// 連接資料庫
include('connection.php');
$orderId = htmlspecialchars($_POST['orderId']);

// sql
$sql = "SELECT a.order_id, name, b.ticket_role_name, a.Purchase_amount, b.price, o.qrcode
FROM order_detail a
join ticket_role b on a.ticket_role_id = b.id
join ticket_style c on a.ticket_style_id = c.id
join order1 o on a.order_id = o.order_id
where a.order_id = '$orderId'";

// 執行sql語句
$statement = $pdo->query($sql);
// 將查詢到的資料抓出放到$data
$data = $statement->fetchAll();
echo json_encode($data);
