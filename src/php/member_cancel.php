<?php
// 連接資料庫
include('connection.php');

// 獲取數據
$order_id = $_POST["orderId"];
// echo $order_id;

// sql
$sql = "UPDATE order1 SET order_status = '0', payment_status = '0' WHERE order_id = '$order_id'";

//執行
$pdo->exec($sql);

echo "更新成功";
