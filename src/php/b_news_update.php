<?php
// 連接資料庫
include('connection.php');

// 獲取數據
$news_id = $_POST['news_id']; //用在where
$news_style = $_POST['news_style'];
$News_status = $_POST['news_status'];
$news_title = $_POST['news_title'];
$news_content = $_POST['news_content'];
$news_image = $_POST['news_image'];
$News_realimage = 'img/' . $news_image;
$News_update = $_POST['news_update'];

//sql
$sql = "UPDATE News_update SET news_style = '$news_style', 
                               News_status = '$News_status',
                               News_title = '$news_title',
                               News_document = '$news_content',
                               News_image = '$News_realimage',
                               News_update = '$News_update'
                                WHERE id = '$news_id'";

// 執行sql
$pdo->exec($sql);

echo $news_title;
