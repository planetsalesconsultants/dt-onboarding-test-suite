<?php
// put this config file into directory /var/config on your application server

// test tool configuration
define ('PAGENAME_INPUT', 'index.php');
define ('PAGENAME_RESULT', 'result.php');

define ('TEST_DEBUG', false);    // sets the following values for easier testing in Sandbox
define ('TEST_MERCHANTID', '**********');   // Datatrans merchantId
define ('TEST_APIPWD', '****************'); // Datatrans API password
define ('TEST_AMOUNT', '100');
define ('TEST_CURRENCY', 'EUR');
define ('TEST_REFNO', 'test-OB-1234');

// Datatrans configuration
define('DT_HOST', 'https://api.datatrans.com');

?>