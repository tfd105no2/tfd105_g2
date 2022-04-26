<?php
// 連接資料庫
include('connection.php');
// session
session_start();
$_SESSION['ticket_id'] = $_POST['ticket_id'];
$ticketId = $_SESSION['ticket_id'];
// sql
