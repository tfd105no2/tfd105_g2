<?php

// 連接資料庫
include('connection.php');

$id = htmlspecialchars($_POST["id"]);

// sql
$sql = "SELECT a.ticket_number_id, a.ticket_status, a.use_time, c.ticket_role_name 
        FROM ticket_number a 
        join order_detail b on a.order_detail_id = b.order_detail_id
        join ticket_role c on b.ticket_role_id = c.id
        where order_id = '$id'";
// 執行sql語句
$statement = $pdo->query($sql);
// 將查詢到的資料抓出放到$data
$data = $statement->fetchAll();

echo json_encode($data);
