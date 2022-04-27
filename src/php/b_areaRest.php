<?php

// 連接資料庫
include('connection.php');

$date = $_POST['date'];
// echo $date;
//sql 海底隧道
$sql = "select sum(ticket_bed) from ticket_detail a
        join area b on a.area_id = b.area_id
        where overnight_date = '$date'
        group by a.area_id having a.area_id = 91";
$sql2 = "SELECT bed_count FROM team2_db.area where area_id = 91";
// 執行sql語句 海底隧道
$statement = $pdo->query($sql);
$statement2 = $pdo->query($sql2);
// 將查詢到的資料抓出放到$data
$data = $statement->fetchAll(); //當日定位
$data2 = $statement2->fetchAll(); //床位總數量
$bed = 0;
if ($data) {
        $bed = $data[0][0];
} else {
        $bed = 0;
}
$bedCount = $data2[0][0];
$bedAmount1 =  $bedCount - $bed;
if ($bedAmount1 < 0) {
        $bedAmount1 = 0;
}

//sql 大洋池親近區
$sql3 = "select sum(ticket_bed) from ticket_detail a
        join area b on a.area_id = b.area_id
        where overnight_date = '$date'
        group by a.area_id having a.area_id = 92";
$sql4 = "SELECT bed_count FROM team2_db.area where area_id = 92";
// 執行sql語句 海底隧道
$statement3 = $pdo->query($sql3);
$statement4 = $pdo->query($sql4);
// 將查詢到的資料抓出放到$data
$data3 = $statement3->fetchAll(); //當日定位
$data4 = $statement4->fetchAll(); //床位總數量
$bed1;
if ($data3) {
        $bed1 = $data3[0][0];
} else {
        $bed1 = 0;
}
$bedCount1 = $data4[0][0];
$bedAmount2 =  $bedCount1 - $bed1;
if ($bedAmount2 < 0) {
        $bedAmount2 = 0;
}

//sql 小白鯨區
$sql5 = "select sum(ticket_bed) from ticket_detail a
        join area b on a.area_id = b.area_id
        where overnight_date = '$date'
        group by a.area_id having a.area_id = 93";
$sql6 = "SELECT bed_count FROM team2_db.area where area_id = 93";
// 執行sql語句 海底隧道
$statement5 = $pdo->query($sql5);
$statement6 = $pdo->query($sql6);
// 將查詢到的資料抓出放到$data
$data5 = $statement5->fetchAll(); //當日定位
$data6 = $statement6->fetchAll(); //床位總數量
$bed2;
if ($data5) {
        $bed2 = $data5[0][0];
} else {
        $bed2 = 0;
}
$bedCount2 = $data6[0][0];
$bedAmount3 =  $bedCount2 - $bed2;
if ($bedAmount3 < 0) {
        $bedAmount3 = 0;
}

//sql4 海藻森林
$sql7 = "select sum(ticket_bed) from ticket_detail a
        join area b on a.area_id = b.area_id
        where overnight_date = '$date'
        group by a.area_id having a.area_id = 94";
$sql8 = "SELECT bed_count FROM team2_db.area where area_id = 94";
// 執行sql語句 海底隧道
$statement7 = $pdo->query($sql7);
$statement8 = $pdo->query($sql8);
// 將查詢到的資料抓出放到$data
$data7 = $statement7->fetchAll(); //當日定位
$data8 = $statement8->fetchAll(); //床位總數量
$bed3;
if ($data7) {
        $bed3 = $data7[0][0];
} else {
        $bed3 = 0;
}
$bedCount3 = $data8[0][0];
$bedAmount4 =  $bedCount3 - $bed3;
if ($bedAmount4 < 0) {
        $bedAmount4 = 0;
}

//sql5 極地區
$sql9 = "select sum(ticket_bed) from ticket_detail a
        join area b on a.area_id = b.area_id
        where overnight_date = '$date'
        group by a.area_id having a.area_id = 95";
$sql10 = "SELECT bed_count FROM team2_db.area where area_id = 95";
// 執行sql語句 海底隧道
$statement9 = $pdo->query($sql9);
$statement10 = $pdo->query($sql10);
// 將查詢到的資料抓出放到$data
$data9 = $statement9->fetchAll(); //當日定位
$data10 = $statement10->fetchAll(); //床位總數量
$bed4;
if ($data9) {
        $bed4 = $data9[0][0];
} else {
        $bed4 = 0;
}
$bedCount4 = $data10[0][0];
$bedAmount5 =  $bedCount4 - $bed4;
if ($bedAmount5 < 0) {
        $bedAmount5 = 0;
}

//sql6 鯊魚區
$sql11 = "select sum(ticket_bed) from ticket_detail a
        join area b on a.area_id = b.area_id
        where overnight_date = '$date'
        group by a.area_id having a.area_id = 96";
$sql12 = "SELECT bed_count FROM team2_db.area where area_id = 96";
// 執行sql語句 海底隧道
$statement11 = $pdo->query($sql11);
$statement12 = $pdo->query($sql12);
// 將查詢到的資料抓出放到$data
$data11 = $statement11->fetchAll(); //當日定位
$data12 = $statement12->fetchAll(); //床位總數量
$bed5;
if ($data11) {
        $bed5 = $data11[0][0];
} else {
        $bed5 = 0;
}
$bedCount5 = $data12[0][0];
$bedAmount6 =  $bedCount5 - $bed5;
if ($bedAmount6 < 0) {
        $bedAmount6 = 0;
}

$arr = [$bedAmount1, $bedAmount2, $bedAmount3, $bedAmount4, $bedAmount5, $bedAmount6];
echo json_encode($arr);
