<?php

// 連接資料庫
include('connection.php');

$username = htmlspecialchars($_POST["username"]);
$email = htmlspecialchars($_POST["email"]);
$password = htmlspecialchars($_POST["password"]);
$phone = htmlspecialchars($_POST["phone"]);
$sql = "INSERT INTO member(Name, email, password, phone_number) VALUES ('$username', '$email', '$password', '$phone')";

//查詢資料庫是否有存在該使用者
$exist = "SELECT * FROM member WHERE email = '$email'";
$statement = $pdo->query($exist);
$data = $statement->fetchAll();
if (count($data) > 0) {
    //如果存在該使用者
    echo "該賬號已被註冊";
} else {
    //插入資料庫
    //執行
    $pdo->exec($sql);
    echo "註冊成功";
}
