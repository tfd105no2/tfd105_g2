<?php
// 連接資料庫
include('connection.php');
// 開啟session
session_start();
$coupon = $_POST['coupom'];
$account = $_SESSION['memberID'];
// 如果有儲存折扣馬
if ($coupon) {
    $addCoupon = "UPDATE member SET coupon = '$coupon' WHERE email = '$account'";
    $add = $pdo->exec($addCoupon);
    echo $coupon;
}
