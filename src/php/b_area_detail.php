<?php

// 連接資料庫
include('connection.php');
$date = $_POST['date'];
$area = $_POST['area'];
// sql
$sql = "SELECT a.order_detail_id, d.Name, e.ticket_role_name, b.Purchase_amount, b.overnight_status 
        from ticket_detail a 
        join order_detail b on a.order_detail_id = b.order_detail_id
        join order1 c on b.order_id = c.order_id
        join member d on c.member_id = d.id
        join ticket_role e on b.ticket_role_id = e.id
        where a.overnight_date = '$date'
        and a.area_id = '$area' ";
// $sql = " SELECT * FROM order_detail";
// 執行sql語句
$statement = $pdo->query($sql);
// 將查詢到的資料抓出放到$data
$data = $statement->fetchAll();
echo json_encode($data);
