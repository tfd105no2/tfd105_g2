<?php
    include("connection.php");

    $search = htmlspecialchars($_POST["email"]);

    $sql = "SELECT * FROM member WHERE email = '$search'";

    $statement = $pdo->query($sql);

    $data = $statement->fetchAll();

    if(count($data) > 0) {
        echo json_encode($data);
    }