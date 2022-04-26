<?php
// 連接資料庫
include('connection.php');

$order = json_decode(file_get_contents("php://input"), true);
// 獲取數據

$order_id = $order["order_id"];
$productList = $order["productList"];
// print_r($productList);

$sqldd = "SELECT max(order_detail_id) FROM order_detail";
$statement3 = $pdo->query($sqldd);
$maxdd = $statement3->fetchAll();
// print_r($max);
$lastnumdd = $maxdd[0][0] + 1;
// echo $lastnumdd;



$odd = 0;
// print_r($productList);

$sqlmax = "SELECT max(ticket_number_id) FROM ticket_number";
$statement2 = $pdo->query($sqlmax);
$max = $statement2->fetchAll();
// print_r($max);
$lastnum = $max[0][0];
$sum = 0;
$length = $lastnum + $sum;
// echo $lastnum;


for ($i = 0; $i < count($productList); $i++) {
        $ticket_role_id = $productList[$i]['ticket_role_id'];
        $ticket_style_id = substr($productList[$i]['ticket_role_id'], 0, 1);
        $purchase_amount = $productList[$i]['quantity'];
        // $overnight_date = $productList[$i]['overnight_date'];
        // $area_id = $productList[$i]['area_id'];
      
        $odd  = $lastnumdd + $i;
        // sql
        $sql = "INSERT INTO order_detail(order_detail_id, order_id, ticket_role_id, ticket_style_id, purchase_amount, overnight_status) 
                VALUES ('$odd', '$order_id', '$ticket_role_id', '$ticket_style_id', '$purchase_amount', '未報到')";
        // 執行sql
        $pdo->exec($sql);
        // 票號
        for ($k = $lastnum + 1; $k < ($lastnum + $purchase_amount + 1); $k++) {
                $sqlnum = "INSERT INTO ticket_number(ticket_number_id, ticket_status, order_detail_id)
                                   VALUES ('$k', '未使用', '$odd')";
                // 執行sql
                $pdo->exec($sqlnum);
        };
        $sqlmax = "SELECT max(ticket_number_id) FROM ticket_number";
        $statement2 = $pdo->query($sqlmax);
        $max = $statement2->fetchAll();
        // print_r($max);
        $lastnum = $max[0][0];



        // 插入ticket_detail
        if ($ticket_style_id == 2) {
                $sqlnight = "INSERT INTO ticket_detail(order_detail_id, overnight_date, area_id, ticket_bed) 
                VALUES ('$odd', '$overnight_date', '$area_id', '$purchase_amount')";
                // 執行sql
                $pdo->exec($sqlnight);
        }
};
