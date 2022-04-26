<?php
// 連接資料庫
include('connection.php');
// session
session_start();

$ticketId = $_SESSION['ticket_id'];
// sql
$sql = "SELECT * FROM ticket_role where id = '$ticketId' ";
// 執行sql語句
$statement = $pdo->query($sql);
// 將查詢到的資料抓出放到$data
$data = $statement->fetchAll();
echo  json_encode($data);
