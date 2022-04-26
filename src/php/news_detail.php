<?php

// 連接資料庫
include('connection.php');

$id = $_POST["id"];
// sql
$sql = "select * from News_update where id = '$id'";

// 執行sql語句
$statement = $pdo->query($sql);
// 將查詢到的資料抓出放到$data
$data = $statement->fetchAll();
echo json_encode($data);

?>