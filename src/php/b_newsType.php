<?php

// 連接資料庫
include('connection.php');

// 獲取類型
$newsvalue = $_POST['newsTypeValue'];

// sql
$sql = "SELECT * FROM News_update where news_style = '$newsvalue'";

// 執行sql語句
$statement = $pdo->query($sql);
// 將查詢到的資料抓出放到$data
$data = $statement->fetchAll();
$data_nums = count($data); //統計總比數 $total
$per = 8; //$pagesize
$pages =  ceil($data_nums / $per); //總頁數 $totalpage
if (!isset($_POST["page"])) { //假如$_GET["page"]未設置
    $page = 1; //則在此設定起始頁數
} else {
    $page = intval($_POST["page"]); //確認頁數只能夠是數值資料
};
$start = ($page - 1) * $per; //每一頁開始的資料序號
// sql
$sql = "SELECT * FROM News_update where news_style = '$newsvalue' limit $start,$per";
// 執行sql語句
$statement = $pdo->query($sql);
// 將查詢到的資料抓出放到$data
$data = $statement->fetchAll();
// print_r($data);


//分頁頁碼
$arr = array();
$prev = $page - 1;
$next = $page + 1;
$previous = [
    'page' => '<',
    'link'  => $prev != 0 ? $prev : 1,
];
$nextPage = [
    'page' => '>',
    'link'  => $next > $pages ? $next - 1 : $next,
];
array_push($arr, $previous);
for ($page = 1; $page <= $pages; $page++) {
    $pagelink = [
        'page' => $page,
        'link' => $page
    ];
    array_push($arr, $pagelink);
}
// echo ' <a href="index.php?page=' . $next . '"> Next </a> ';
array_push($arr, $nextPage);
echo json_encode([$arr, $data]);
