<?php
    include("connection.php");

    // 從前端取值
    $search = htmlspecialchars($_POST["mail"]);

    $sql = "SELECT * FROM member WHERE email like '$search'";

    $statement = $pdo->query($sql);

    $data = $statement->fetchAll();

    $errorMsg = '查無此信箱';

    if(count($data) > 0) {
        echo json_encode($data);
    } else {
        echo json_encode($errorMsg);
    }
