<?php

// 連接資料庫
include('connection.php');

$mbAccount = htmlspecialchars($_POST["acc"]);
$mbPassword = htmlspecialchars($_POST["pwd"]);

$sql = "SELECT * FROM member WHERE email = '$mbAccount' AND password = '$mbPassword'";
// 執行sql語句
$statement = $pdo->query($sql);
// 將查詢到的資料抓出放到$data
$data = $statement->fetchAll();

// 如果$data裡有資料,表示登入成功
if (count($data) > 0) {
    session_start();
    $_SESSION['memberID'] = $mbAccount;
    $_SESSION['username'] = $data[0]['Name'];
    $_SESSION['phone'] = $data[0]['phone_number'];
    echo json_encode($data);
} else {
    echo '登入失敗';
};
?>