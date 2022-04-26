<?php

// 連接資料庫
include('connection.php');

$ticketNum = htmlspecialchars($_POST["ticketNum"]);
$ticketSta = htmlspecialchars($_POST["ticketSta"]);
$ticketDay = htmlspecialchars($_POST["ticketDay"]);

// sql
$sql = "UPDATE ticket_number 
set ticket_status = '$ticketSta',
use_time = '$ticketDay' 
where ticket_number_id = '$ticketNum'";

$pdo->exec($sql);

echo "更新成功";

?>
