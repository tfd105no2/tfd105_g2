<?php

include('connection.php');

//獲取數據
$date = $_POST['date'];
$area = $_POST['area'];
echo $date;
//建立SQL
$sql = "UPDATE ticket_detail SET ticket_bed = 0 
        WHERE overnight_date = '$date' and area_id = '$area'";

//執行
$pdo->exec($sql);

echo "開啟成功!";
