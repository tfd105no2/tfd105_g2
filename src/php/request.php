<?php
$sandBox = 'https://sandbox-api-pay.line.me';
$uri = '/v3/payments/request';
$channelId = '1657024613';
$channelSecret = '7d86d1705da08d44be5892bdf64fe500';
$Nonce = date('c') . uniqid('-');
$isSandbox = false;

$orderid = $_POST['order_id'];
$products = json_decode($_POST['productList']);
$amount = $_POST['total_price'];
$id = $_POST['order_create'];
// $payway = $_POST['payway'];


$array = array();
foreach ($products as $item) {
    $obj = [
        "id" => $item->ticket_role_id,
        'name' => $item->ticket_role_name,
        'quantity' => $item->quantity,
        'price' => $item->price,

    ];
    array_push($array, $obj);
}

$qyery = [
    'amount' => $amount, //付款金額
    'currency' => 'TWD',
    'orderId' => $orderid, //訂單編號 管理的唯一ID
    'packages' => [

        [

            'id' => $id, //  list ID
            'amount' => $amount, //商品總額
            // 'userFee' => -100,
            'products' => $array
        ],
    ],


    'redirectUrls' => [
        'confirmUrl' => 'https://tibamef2e.com/tfd105/g2/php/confirm.php',
        'cancelUrl' => 'https://test.astralweb.com/cancel.php',
    ],
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

echo $response;
// $data = json_decode($response);
// echo $data->info->paymentUrl->web;
// echo $data->info;



// header("Location: " . $data->info->paymentUrl->web);
