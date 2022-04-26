<?php
// 連接資料庫
include('connection.php');

// sql
$sql = "SELECT * FROM area";
// 執行sql語句
$statement = $pdo->query($sql);
// 取回查詢到的資料,是二維陣列,放到 $data;
$data = $statement->fetchAll();
echo json_encode($data);