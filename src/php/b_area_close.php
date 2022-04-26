<?php

include('connection.php');

//獲取數據
$date = $_POST['date'];
$area = $_POST['area'];
echo $date;
//建立SQL
$sql = "INSERT INTO ticket_detail(order_detail_id, overnight_date, area_id, ticket_bed) 
                            VALUES (1, '$date', '$area', 30)";

//執行
$pdo->exec($sql);

// echo "關閉成功!";
