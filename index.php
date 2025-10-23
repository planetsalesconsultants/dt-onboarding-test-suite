<?php
ini_set('session.cookie_lifetime', 86400);
session_start();
include "config.php";
include "functions.php"; 

// execute the POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
 
    function initTransaction() {

      // access form data
      $merchantid = $_POST['merchantid'];
      $password = $_POST['password'];
      $amount = $_POST['amount'];
      $currency = $_POST['currency'];
      $refno = $_POST['refno'];
      
      $apiKey = base64_encode($merchantid . ':' . $password);
                  
      // get the current path for the successUrl
      $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? "https://" : "http://";
      $host = $_SERVER['HTTP_HOST'];
      $path = rtrim(dirname($_SERVER['PHP_SELF']), '/\\') . '/';
      $baseUrl = $protocol . $host . $path;
      
      $url = DT_HOST . '/v1/transactions';
      $data = [
          "amount" => $amount,
          "currency" => $currency,
          "refno" => $refno,
          "autoSettle" => false,
          "redirect" => [
              "method" => "GET",
              "successUrl" => $baseUrl . PAGENAME_RESULT,
              "cancelUrl" => $baseUrl . PAGENAME_RESULT,
              "errorUrl" => $baseUrl . PAGENAME_RESULT
          ]          
      ];
      [$response, $headers, $code] = sendRequest('init', $url, $data, $apiKey);
      $decoded = json_decode($response, true);
      
      if ($code == '201') {
        $_SESSION['transactionId'] = $decoded['transactionId'];
        $_SESSION['apiKey'] = $apiKey;
        return json_encode(['redirect' => $headers['Location']]);
      } else {
        return json_encode([
        'error' => $decoded['error'] ?? ['message' => 'Unknown error']
        ]);
      }
    }
    echo initTransaction(); 
    exit;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Datatrans setup test page</title>
  <link rel="stylesheet" href="css/graphite.bundle.css">
  <link rel="stylesheet" href="css/custom.css">
  <script type="module" src="dist/core/core.esm.js"></script>
</head>
<body>
  <div style="display: flex; align-items: center;">
    <img id="logo" src="img/planet-p-icon-black.png"><h1>Datatrans Setup Test - Input Page</h1>
  </div>
  <p>This page allows you to test a new or changed Datatrans setup. Please fill in all the parameters and you will be redirected to the Datatrans payment page of that merchant. Depending on the setup, DCC and 3D Secure will be shown. On the results page, you'll see the status of the transactions and you can cancel the transaction if necessary. </p>
  <div id="testInput">
    <form id="testForm" method="POST" action="">
      <gr-input id="merchantid" name="merchantid" label="Merchant ID" type="text" placeholder="3000000000" <?php if (TEST_DEBUG) { echo "value=\"" . TEST_MERCHANTID . "\" "; } ?>></gr-input>
      <div id="error-merchantid" class="error"></div>

      <gr-input id="password" name="password" label="API Password" type="password" <?php if (TEST_DEBUG) { echo "value=\"" . TEST_APIPWD . "\" "; } ?>></gr-input>
      <div id="error-password" class="error"></div>

      <gr-input id="amount" name="amount" label="Amount" type="number" placeholder="1000" <?php if (TEST_DEBUG) { echo "value=\"" . TEST_AMOUNT . "\" "; } ?>></gr-input>
      <div id="error-amount" class="error"></div>

      <gr-input id="currency" name="currency" label="Currency" type="text" placeholder="EUR" <?php if (TEST_DEBUG) { echo "value=\"" . TEST_CURRENCY . "\" "; } ?>></gr-input>
      <div id="error-currency" class="error"></div>

      <gr-input id="refno" name="refno" label="Reference" type="text" placeholder="Planet-Test-123456" <?php if (TEST_DEBUG) { echo "value=\"" . TEST_REFNO . "\" "; } ?>></gr-input>
      <div id="error-refno" class="error"></div>

      <gr-button type="submit">Start test</gr-button>
    </form>
  </div>
  <div id="loadingLayer" style="display:none;">
    <div id="loading">
      <div>
        <p>Loading... Please wait.</p>
      </div>
    </div>
  </div>
  <div id="errorLayer" style="display:none;">
      <!-- Placeholder for error messages -->
  </div>
  <footer>
    <p>&copy; <?php echo date('Y'); ?> Planet. All rights reserved.</p>
  </footer>

  <script>

    const loading = document.getElementById('loadingLayer');
    const errorLayer = document.getElementById('errorLayer');

    document.getElementById('testForm').addEventListener('submit', function(e) {

	  // validation
    let valid = true;

    const merchantid = document.getElementById('merchantid').value.trim();
    const password = document.getElementById('password').value.trim();
    const amount = document.getElementById('amount').value.trim();
    const currency = document.getElementById('currency').value.trim();
    const refno = document.getElementById('refno').value.trim();

    const errors = {
      merchantid: '',
      password: '',
      amount: '',
      currency: '',
      refno: ''
    };

    if (!/^[0-9]{10}$/.test(merchantid)) {
      errors.merchantid = 'Merchant ID must be exactly 10 digits.';
      valid = false;
    }

    if (password.length !== 16) {
      errors.password = 'Password must be exactly 16 characters.';
      valid = false;
    }

    if (!/^[0-9]+$/.test(amount) || parseInt(amount) > 10000) {
      errors.amount = 'Amount must be numeric and not exceed 10000.';
      valid = false;
    }

    if (!/^[A-Za-z]{3}$/.test(currency)) {
      errors.currency = 'Currency must be 3 alphabetic characters.';
      valid = false;
    }

    if (!/^.{6,20}$/.test(refno)) {
      errors.refno = 'Reference must be between 6–20 characters long.';
      valid = false;
    }

    for (const field in errors) {
      document.getElementById('error-' + field).textContent = errors[field];
    }

    if (!valid) {
      e.preventDefault();
    } else {
      // form filled out completely
      e.preventDefault();
      loading.style.display = 'flex';
      fetch('', {
          method: 'POST',
          body: new FormData(testForm)
      })
      .then(response => response.json())
      .then(data => {
          console.log('Response data:', data);
          if (data.redirect) {
              window.location.href = data.redirect;
          } else if (data.error) {
            const errorLayer = document.getElementById('errorLayer');
            let errorMsg = '';
            if (data.error.code && data.error.message) {
                errorMsg = 'code: ' + data.error.code + '<br>' + 'message: ' + data.error.message;
            } else if (data.error.message) {
                errorMsg = 'message: ' + data.error.message;
            } else if (data.error.code) {
                errorMsg = 'code: ' + data.error.code;
            } else {
                errorMsg = 'An error occurred.';
            }
            errorLayer.innerHTML = errorMsg;
            errorLayer.style.display = 'block';
            loading.style.display = 'none';
          } else {
              alert('Unexpected response from server.');
              loading.style.display = 'none';
          }
      })
      .catch(error => {
          console.error('Error:', error);
          const errorLayer = document.getElementById('errorLayer');
          errorLayer.textContent = 'An unexpected error occurred.';
          errorLayer.style.display = 'block';
          loading.style.display = 'none';
      });
    }
  });
</script>
</body>
</html>
