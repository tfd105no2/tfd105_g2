<?php
// 連接資料庫
include('connection.php');
$ticket_number = $_POST["ticket_number"];

//sql
$sql = "select c.ticket_number_id, c.ticket_status, c.use_time, b.ticket_role_name 
        from order_detail a 
        join ticket_role b on a.ticket_role_id = b.id
        join ticket_number c on a.order_detail_id = c.order_detail_id
        where c.ticket_number_id = '$ticket_number'";
// 執行sql語句
$statement = $pdo->query($sql);
// 將查詢到的資料抓出放到$data
$data = $statement->fetchAll();


echo json_encode($data);
