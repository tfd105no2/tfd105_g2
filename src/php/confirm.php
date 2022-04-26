<?php
$sandBox = 'https://sandbox-api-pay.line.me';
$uri = '/v3/payments/' . $_GET['transactionId'] . '/confirm';
$channelId = '1657024613';
$channelSecret = '7d86d1705da08d44be5892bdf64fe500';
$Nonce = date('c') . uniqid('-');
$isSandbox = false;

$_GET['orderId'];

$amount = $_POST['total_price'];

$qyery = [
    'amount' => 500,
    'currency' => 'TWD'
];

$authMacText = $channelSecret . $uri . json_encode($qyery) . $Nonce;
$Authorization = base64_encode(hash_hmac('sha256', $authMacText, $channelSecret, true));

$curl = curl_init();

curl_setopt_array($curl, array(
    CURLOPT_URL => $sandBox . $uri,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => '',
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 0,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => 'POST',
    CURLOPT_POSTFIELDS => json_encode($qyery),
    CURLOPT_HTTPHEADER => array(
        'Content-Type: application/json',
        'X-LINE-ChannelId: ' . $channelId,
        'X-LINE-Authorization-Nonce: ' . $Nonce,
        'X-LINE-Authorization: ' . $Authorization
    ),
));

$response = curl_exec($curl);

curl_close($curl);


// echo $response;
header("Location: https://tibamef2e.com/tfd105/g2/checkout_complet.html");
