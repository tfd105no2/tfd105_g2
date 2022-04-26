<?php

// 連接資料庫
include('connection.php');


$last = 1;
$amount = 2;
// sql
$sql = "select * from News_update order by id asc limit $last,$amount";

// 執行sql語句
$statement = $pdo->query($sql);
// 將查詢到的資料抓出放到$data
$data = $statement->fetchAll();
print_r($data);
