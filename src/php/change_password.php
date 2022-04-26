<?php
// 連接資料庫
include('connection.php');

// 獲取數據
$email =  $_POST['email'];
$pwd = $_POST["oldPwd"];
$newPwd = $_POST["newPwd"];

$sql1 = "SELECT password FROM member WHERE email = '$email' AND password = '$pwd'";
$statment = $pdo->query($sql1);
$data = $statment->fetchAll();
echo json_encode($data);

if($data != '') {
    $sql2 = "UPDATE member SET password = '$newPwd' WHERE email = '$email' AND password = '$pwd'";
    $pdo->exec($sql2);
}
?>