<?php

// 連接資料庫
include('connection.php');
$email = $_POST['email'];
// sql
$sql = "SELECT a.order_id, a.createdate, a.order_status, a.total FROM order1 a
        join member c on a.member_id = c.id
        where c.email = '$email'
        order by createdate desc";

// 執行sql語句
$statement = $pdo->query($sql);
// 將查詢到的資料抓出放到$data
$data = $statement->fetchAll();
echo json_encode($data);
