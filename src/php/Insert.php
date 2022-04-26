<?php

include('connection.php');

//---------------------------------------------------

//建立SQL
$sql = "INSERT INTO member(Name, PWD, CreateDate) VALUES ('王小明', 'abc123', NOW())";

//執行
$pdo->exec($sql);

echo "新增成功!";
