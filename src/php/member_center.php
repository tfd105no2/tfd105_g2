<?php
session_start();
// 連接資料庫
include('connection.php');
$account = $_SESSION['memberID'];
//sql
$sql = "SELECT * FROM member WHERE email = '$account'";
// 執行sql語句
$statement = $pdo->query($sql);


// 將查詢到的資料抓出放到$data
$data = $statement->fetchAll();
echo json_encode($data);
// print_r($data);
