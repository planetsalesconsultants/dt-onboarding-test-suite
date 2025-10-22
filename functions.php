<?php

function authorizeTransaction($alias, $amount, $currency, $refno, $expiryMonth, $expiryYear, $autoSettle, $apiKey) {
    $url = DT_HOST . '/v1/transactions/authorize';
    $data = [
        "card" => [
            "alias" => $alias,
            "expiryMonth" => $expiryMonth,
            "expiryYear" => $expiryYear
        ],
        "autoSettle" => $autoSettle,
        "amount" => $amount,
        "currency" => $currency,
        "refno" => $refno
    ];
    [$response, $code] = sendRequest('authorize', $url, $data, $apiKey);
    $decoded = json_decode($response, true);
    return $decoded['transactionId'] ?? '';
}

function settleTransaction($transactionId, $amount, $currency, $refno, $apiKey) {
    $url = DT_HOST . '/v1/transactions/' . $transactionId . '/settle';
    $data = compact('amount', 'currency', 'refno');
    [$response, $headers, $code] = sendRequest('settle', $url, $data, $apiKey);
    return [$response, $headers, $code];
}

function cancelTransaction($transactionId, $apiKey) {
    $url = DT_HOST . '/v1/transactions/' . $transactionId . '/cancel';
    [$response, $headers, $code] = sendRequest('cancel', $url, [], $apiKey);
    return [$response, $headers, $code];
}

function creditTransaction($transactionId, $amount, $currency, $refno, $apiKey) {
    $url = DT_HOST . '/v1/transactions/' . $transactionId . '/credit';
    $data = compact('amount', 'currency', 'refno');
    [$response, $headers, $code] = sendRequest('credit', $url, $data, $apiKey);
    return [$response, $headers, $code];
}

function statusTransaction($transactionId, $apiKey) {
    $url = DT_HOST . '/v1/transactions/' . $transactionId;
    [$response, $headers, $code] = sendRequest('status', $url, [], $apiKey);  
    return [$response, $headers, $code];
}

function sendRequest($action, $url, $data, $apiKey) {
    $headers = [
        'Content-Type: application/json',
        "Authorization: Basic $apiKey"
    ];
    
    $post = ($action !== 'status');

    $ch = curl_init($url);
    if ($action == 'status') {
      curl_setopt_array($ch, [
          CURLOPT_RETURNTRANSFER => true,
          CURLOPT_HTTPGET => true,
          CURLOPT_HEADER => true,
          CURLOPT_HTTPHEADER => $headers
      ]);
    } else {
      curl_setopt_array($ch, [
          CURLOPT_RETURNTRANSFER => true,
          CURLOPT_POST => true,
          CURLOPT_HEADER => true,
          CURLOPT_HTTPHEADER => $headers,
          CURLOPT_POSTFIELDS => json_encode($data ?: new stdClass())
      ]);
    }

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $headerSize = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
    $error = curl_error($ch);
    curl_close($ch);

    $headerString = substr($response, 0, $headerSize);
    $body = substr($response, $headerSize);
    $headers = [];
    foreach (explode("\r\n", $headerString) as $line) {
        if (strpos($line, ':') !== false) {
            list($key, $value) = explode(': ', $line, 2);
            $headers[$key] = $value;
        }
    }
    
    return [$body, $headers, $httpCode];
}

?>