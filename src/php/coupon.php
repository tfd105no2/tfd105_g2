<?php

include('connection.php');

// 開啟session
session_start();
$coupon = $_POST['coupom'];
$account = $_SESSION['memberID'];

echo $coupon;
echo $account;

$addCoupon = "UPDATE member SET coupon = '$coupon' WHERE email = '$account'";
$add = $pdo->exec($addCoupon);

// echo $_SESSION['fishgame_coupon'];
