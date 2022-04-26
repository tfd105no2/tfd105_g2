<?php
// 連接資料庫
include('connection.php');
$news_number = $_POST["news_number"];

//sql
$sql = "SELECT * FROM News_update where id = '$news_number'";
// 執行sql語句
$statement = $pdo->query($sql);
// 將查詢到的資料抓出放到$data
$data = $statement->fetchAll();


echo json_encode($data);
