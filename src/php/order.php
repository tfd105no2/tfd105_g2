<?php
// 連接資料庫
include('connection.php');

$order = json_decode(file_get_contents("php://input"), true);
// 獲取數據
$member_id = $order["member_id"];
$order_id = $order["order_id"];
$payway = $order["payway"];
$order_create = $order["order_create"];
$productList = $order["productList"];
$total_price = $order["total_price"];
$order_status = $order["order_status"];
$payment_status = $order["payment_status"];
$coupon_value = $order["coupon_value"];
$order_type = substr($productList[0]['ticket_role_id'], 0, 1);
$qrcode = 'checkticket.html?order_id=' . $order["qrcode"];

// sql
$sql = "INSERT INTO order1(order_id, member_id, createdate, order_status,payment_status, coupon_value, payment_method, order_type, total, qrcode) 
        VALUES ('$order_id', '$member_id', now(), '$order_status', '$payment_status', '$coupon_value', '$payway', '$order_type', '$total_price', '$qrcode')";

// 執行sql
$pdo->exec($sql);

echo $qrcode;
