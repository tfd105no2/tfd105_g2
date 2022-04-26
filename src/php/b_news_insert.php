<?php
// 連接資料庫
include('connection.php');

// 獲取數據
$news_style = $_POST['news_style'];
$news_status = $_POST['news_status'];
$news_title = $_POST['news_title'];
$news_content = $_POST['news_content'];
$news_image = $_POST['news_image'];
$News_realimage = 'img/' . $news_image;
//sql
$sql = "INSERT INTO News_update(create_date, news_style, News_document, News_title,News_status,News_image) 
               VALUES (now(), '$news_style', '$news_content', '$news_title','$news_status','$News_realimage')";
//執行sql
$pdo->exec($sql);
// echo $News_realimage;
echo '新增成功';
