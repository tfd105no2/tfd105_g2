<?php
// 連接資料庫
include('connection.php');
$order_number = $_POST["order_number"];

//sql
$sql = "SELECT * FROM order1 a
        join member c on a.member_id = c.id
        WHERE order_id = '$order_number'";
// 執行sql語句
$statement = $pdo->query($sql);
// 將查詢到的資料抓出放到$data
$data = $statement->fetchAll();


echo json_encode($data);
