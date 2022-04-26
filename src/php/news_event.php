<?php

// 連接資料庫
include('connection.php');


$last = 0;
$amount = 6;
// sql
$sql = "select * from News_update where news_style = '1' AND News_status = '1' order by create_date desc limit $last,$amount ";

// 執行sql語句
$statement = $pdo->query($sql);
// 將查詢到的資料抓出放到$data
$data = $statement->fetchAll();
echo json_encode($data);
