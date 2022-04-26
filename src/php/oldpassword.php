<?php
// 連接資料庫
include('connection.php');
session_start();
$account =  $_SESSION['memberID'];
// 獲取數據
$oldPassword = $_POST["oldPassword"];

//sql
$sql = "SELECT * FROM member WHERE email = '$account' AND password = '$oldPassword'";
// 執行sql語句
$statement = $pdo->query($sql);
// 將查詢到的資料抓出放到$data
$data = $statement->fetchAll();

if (count($data) > 0) {
} else {
    echo '密碼錯誤';
}
