<?php
/**
 * Test if we can reach the UniSMS API endpoint
 */

echo "Testing UniSMS API Endpoint...\n\n";

// Test 1: Can we resolve the domain?
echo "1. DNS Resolution Test:\n";
$ip = gethostbyname('api.unisms.com');
echo "   api.unisms.com resolves to: {$ip}\n\n";

// Test 2: Can we connect to port 443?
echo "2. Port 443 Connection Test:\n";
$fp = @fsockopen('api.unisms.com', 443, $errno, $errstr, 10);
if ($fp) {
    echo "   ✅ Can connect to api.unisms.com:443\n";
    fclose($fp);
} else {
    echo "   ❌ Cannot connect: {$errstr} ({$errno})\n";
}
echo "\n";

// Test 3: cURL with minimal SSL
echo "3. cURL Test (SSL disabled):\n";
$ch = curl_init('https://api.unisms.com/v1/sms/send');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
curl_setopt($ch, CURLOPT_TIMEOUT, 10);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer sk_e37d81e4-022c-4685-b578-367568043ec8',
    'Content-Type: application/json'
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
    'to' => '09707112132',
    'from' => 'HealthCenter',
    'message' => 'Test'
]));

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$error = curl_error($ch);
curl_close($ch);

if ($error) {
    echo "   ❌ cURL Error: {$error}\n";
} else {
    echo "   ✅ HTTP Code: {$httpCode}\n";
    echo "   Response: {$response}\n";
}
echo "\n";

// Test 4: Check PHP/OpenSSL info
echo "4. PHP & OpenSSL Info:\n";
echo "   PHP Version: " . phpversion() . "\n";
echo "   cURL Version: " . curl_version()['version'] . "\n";
echo "   OpenSSL Version: " . (defined('OPENSSL_VERSION_TEXT') ? OPENSSL_VERSION_TEXT : 'Not available') . "\n";
echo "   SSL Support: " . (in_array('https', stream_get_wrappers()) ? '✅ Yes' : '❌ No') . "\n";
