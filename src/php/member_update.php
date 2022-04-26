<?php
// 連接資料庫
include('connection.php');

// 獲取數據
$account = $_POST["mail"];
$newName = $_POST["name"];
$newPhone = $_POST["phone"];

// sql
$sql = "UPDATE member SET Name = '$newName', phone_number = '$newPhone' WHERE email = '$account'";

//執行
$pdo->exec($sql);

echo "更新成功";
