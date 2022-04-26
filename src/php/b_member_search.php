<?php

// 連接資料庫
include('connection.php');
$member_number = $_POST["member_number"];

//sql
$sql = "SELECT * FROM member
        WHERE phone_number = '$member_number'";
// 執行sql語句
$statement = $pdo->query($sql);
// 將查詢到的資料抓出放到$data
$data = $statement->fetchAll();


echo json_encode($data);
