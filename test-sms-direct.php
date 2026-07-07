<?php
/**
 * Direct SMS Test Script - Bypasses Laravel
 * Run with: php test-sms-direct.php
 */

require __DIR__.'/vendor/autoload.php';

use GuzzleHttp\Client;

echo "===========================================\n";
echo "   Direct SMS Test (No Laravel Cache)     \n";
echo "===========================================\n\n";

$apiKey = 'sk_e37d81e4-022c-4685-b578-367568043ec8';
$endpoint = 'https://api.unisms.com/v1/sms/send';
$phone = '09707112132';
$message = 'Direct test from PHP script';

echo "📤 Sending SMS...\n";
echo "   To: {$phone}\n";
echo "   Message: {$message}\n\n";

try {
    $client = new Client([
        'verify' => false,  // Disable SSL verification
        'timeout' => 30,
        'connect_timeout' => 10,
    ]);

    $response = $client->post($endpoint, [
        'headers' => [
            'Authorization' => 'Bearer ' . $apiKey,
            'Accept' => 'application/json',
            'Content-Type' => 'application/json',
        ],
        'json' => [
            'to' => $phone,
            'from' => 'HealthCenter',
            'message' => $message,
        ]
    ]);

    $statusCode = $response->getStatusCode();
    $body = $response->getBody()->getContents();

    echo "✅ SMS sent successfully!\n\n";
    echo "Response Status: {$statusCode}\n";
    echo "Response Body: {$body}\n\n";

    echo "===========================================\n";
    echo "✅ Test PASSED - Check your phone!\n";
    echo "===========================================\n";

} catch (\Exception $e) {
    echo "❌ SMS sending failed!\n\n";
    echo "Error: " . $e->getMessage() . "\n\n";
    echo "===========================================\n";
    echo "❌ Test FAILED\n";
    echo "===========================================\n";
    exit(1);
}
