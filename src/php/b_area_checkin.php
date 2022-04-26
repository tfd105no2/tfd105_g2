<?php
// 連接資料庫
include('connection.php');

// 獲取數據
$orderdetail_id = $_POST["orderdetail_id"];

// sql
$sql = "UPDATE order_detail SET overnight_status = '已報到' WHERE order_detail_id = '$orderdetail_id'";

//執行
$pdo->exec($sql);

echo "更新成功";
