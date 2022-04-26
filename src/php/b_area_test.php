<?php

// 連接資料庫
include('connection.php');

$datas = json_decode(file_get_contents("php://input"), true);


$sql = "select overnight_date,sum(ticket_bed) as sum from ticket_detail 
group by overnight_date having month(overnight_date) = :month";
$statement = $pdo->prepare($sql);
$statement->bindValue(":month", $datas["canlendar_month"]);
$statement->execute();

$data = $statement->fetchAll();


$arr = [];
foreach ($data as $key => $row) {
    // echo $row["sum"];    //欄位名稱
    // echo '<br>';
    if ($row["sum"] >= 180) {
        array_push($arr, $row["overnight_date"]);
    }
}
// print_r($arr);
$newArr = [];
for ($i = 0; $i < count($arr); $i++) {
    array_push($newArr, substr($arr[$i], 8, 2));
}
// print_r($newArr);
echo json_encode($newArr);
