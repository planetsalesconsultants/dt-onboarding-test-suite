<?php
ini_set('session.cookie_lifetime', 86400);
session_start();
include "/var/config/config.php";
include "functions.php";

$transactionId = $_SESSION['transactionId'];
$apiKey = $_SESSION['apiKey'];

if ($transactionId) {

  [$response, $headers, $code] = statusTransaction($transactionId, $apiKey);
  if ($code == '200') {
    $decoded = json_decode($response, true); 
    $status = $decoded['status'];
    $currency = $decoded['currency'];
    $amount = $decoded['detail']['authorize']['amount'];
    $maskedCard = $decoded['card']['masked'];
    $expiryMonth = $decoded['card']['expiryMonth'];
    $expiryYear = $decoded['card']['expiryYear'];
    $expiryDate = $expiryMonth . '/' . $expiryYear;
    $brand = $decoded['card']['info']['brand'];
  } else {
    $error = "Error retrieving status.";
  }
}
else {
  $error = "There is an error. No session found.";
}


// execute the POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

  function doCancel() {
    $transactionId = $_SESSION['transactionId'];
    $apiKey = $_SESSION['apiKey'];
    [$response, $headers, $code] = cancelTransaction($transactionId, $apiKey);
    $decoded = json_decode($response, true);

    if ($code == '204') {
      return json_encode(['status' => 'canceled']);
    } else {
      return json_encode([
      'error' => $decoded['error'] ?? ['error' => 'Unknown error']
      ]);
    }
  }

  echo doCancel();
  exit;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Datatrans Onboarding Test Suite - Result</title>
  <link rel="stylesheet" href="css/graphite.bundle.css">
  <script type="module" src="dist/core/core.esm.js"></script>
  <link rel="stylesheet" href="css/custom.css">
</head>
<body>
  <div style="display: flex; align-items: center;">
    <img id="logo" src="img/planet-p-icon-black.png"><h1>Datatrans Onboarding Test Suite - Result</h1>
  </div>
  <div id="result">
    <div class="table">
      <div class="row">
        <div class="label">Transaction ID</div>
        <div class="value"><?php echo $transactionId; ?></div>
      </div>
      <div class="row">
        <div class="label">Status</div>
        <div class="value"><?php echo $status; ?></div>
      </div>
      <div class="row">
        <div class="label">Amount</div>
        <div class="value"><?php echo $amount; ?></div>
      </div>
      <div class="row">
        <div class="label">Currency</div>
        <div class="value"><?php echo $currency; ?></div>
      </div>
      <div class="row">
        <div class="label">Brand</div>
        <div class="value"><?php echo $brand; ?></div>
      </div>
      <div class="row">
        <div class="label">Masked Card</div>
        <div class="value"><?php echo $maskedCard; ?></div>
      </div>
    <div class="row">
        <div class="label">Expiry Date</div>
        <div class="value"><?php echo $expiryDate; ?></div>
      </div>
    </div>
  </div>
  <div id="cancelDiv">
    <form id="cancelForm" method="post" action="">
      <gr-button id="cancelButton" type="submit" variant="danger">Cancel transaction</gr-button>
    </form>
  </div>
  <div>
    <form method="get" action="<?php echo PAGENAME_INPUT; ?>">
      <gr-button type="submit" variant="secondary">New Test</gr-button>
    </form>
  </div>
  <div id="loadingLayer" style="display:none;">
    <div id="loading">
      <div>
        <p>Loading... Please wait.</p>
      </div>
    </div>
  </div>  <div id="errorLayer" style="display:none;">
      <!-- Placeholder for error messages -->
  </div>
  <footer>
    <p>&copy; <?php echo date('Y'); ?> Planet. All rights reserved.</p>
  </footer>

<script>
  let status = '';
  let error = '';

  status = '<?php echo $status; ?>';
  if (status === 'authorized') {
    document.getElementById('cancelButton').disabled = false;
  } else {
    document.getElementById('cancelButton').disabled = true;
    document.getElementById('cancelButton').setAttribute('variant', '');
  }

  error = '<?php echo $error; ?>';
  let errorlayer = document.getElementById('errorLayer');
  if (error != '') {
    errorLayer.innerHTML = errorMsg;
    errorLayer.style.display = 'block';
  } else {
    errorlayer.style.display = 'none;'
  }
</script>

<script>
  const loading = document.getElementById('loadingLayer');
  
  document.getElementById('cancelForm').addEventListener('submit', function(e) {
    // validation
    let valid = true;
    if (valid) {
      e.preventDefault();
      loading.style.display = 'flex';
      fetch('', {
        method: 'POST',
        body: new FormData(cancelForm)
      })
      .then(response => response.json())
      .then(data => {
        console.log('Response data:', data);
        if (data.status && data.status == 'canceled') {
          // successfully canceled --> load page again
          window.location.href = "<?php echo PAGENAME_RESULT; ?>";
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
